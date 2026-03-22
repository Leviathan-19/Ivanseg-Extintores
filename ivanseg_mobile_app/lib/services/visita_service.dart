import 'package:hive/hive.dart';
import 'package:uuid/uuid.dart';
import '../models/visita_model.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import '../utils/connectivity_service.dart';
import 'sync_service.dart';
import 'dispositivo_service.dart';
class VisitaService {
  final Box box = Hive.box('visitas');
  Future<bool> hayInternet() async {
    return await ConnectivityService().hayInternet();
  }

  Future<void> enviarAlBackend(Visita visita) async {
    final baseUrl = dotenv.env['API_URL'];
    final url = Uri.parse('$baseUrl/api/visitas');

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(visita.toJson()),
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      throw Exception("Error al enviar al backend");
    }
  }

  Future<void> guardarVisitaCompleta({
  required String cliente,
  String? razonSocial,
  String? telefono,
  String? correo,
  String? estadoVisita,
  String? proximaVisita,
  String? provincia,
  String? canton,
  String? parroquia,
  String? barrio,
  String? barrioId,
  String? callePrincipal,
  String? calleSecundaria,
  String? numeracion,
}) async {
  final uuid = const Uuid().v4();
  final dispositivoService = DispositivoService();
  final dispositivoId = await dispositivoService.obtenerDispositivoId();

  final visita = Visita(
    visitaOfflineId: uuid,
    cliente: cliente,
    razonSocial: razonSocial,
    telefono: telefono,
    correo: correo,
    estadoVisita: estadoVisita,
    proximaVisita: proximaVisita,
    provincia: provincia,
    canton: canton,
    parroquia: parroquia,
    barrio: barrio,
    barrioId: barrioId,
    callePrincipal: callePrincipal,
    calleSecundaria: calleSecundaria,
    numeracion: numeracion,
    dispositivoId: dispositivoId,  // ✅ Agregar dispositivoId
    sincronizado: false,
  );

  if (await hayInternet()) {
    try {
      await enviarAlBackend(visita);
      visita.sincronizado = true;
    } catch (e) {
      print('Error al enviar al backend: $e');
      visita.sincronizado = false;
    }
  }

  await box.add(visita.toJson());
}

  Future<void> sincronizarVisitasPendientes() async {
    final syncService = SyncService();
    await syncService.sincronizarVisitas();
  }

  Future<List<Visita>> obtenerVisitas() async {
    print(dotenv.env['API_URL']);
    if (await hayInternet()) {
      try {
        final baseUrl = dotenv.env['API_URL'];
        final url = Uri.parse('$baseUrl/api/visitas');

        final response = await http.get(url);

        if (response.statusCode == 200) {
          List data = jsonDecode(response.body);

          List<Visita> visitasApi = data
              .map((e) => Visita.fromJson(e))
              .toList();

          // guardar en Hive (cache)
          await box.clear();
          for (var v in visitasApi) {
            await box.add(v.toJson());
          }

          return visitasApi;
        } else {
          return _obtenerDesdeHive();
        }
      } catch (e) {
        return _obtenerDesdeHive();
      }
    } else {
      return _obtenerDesdeHive();
    }
  }

  List<Visita> _obtenerDesdeHive() {
    return box.values
        .map((e) => Visita.fromJson(Map<String, dynamic>.from(e)))
        .toList();
  }
}
