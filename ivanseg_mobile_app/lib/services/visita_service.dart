import 'package:hive/hive.dart';
import 'package:uuid/uuid.dart';
import '../models/visita_model.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class VisitaService {
  final Box box = Hive.box('visitas');
  Future<bool> hayInternet() async {
    var result = await Connectivity().checkConnectivity();
    return result != ConnectivityResult.none;
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

  Future<void> guardarVisita(String cliente) async {
    final uuid = Uuid().v4();

    Visita visita = Visita(visitaOfflineId: uuid, cliente: cliente);

    if (await hayInternet()) {
      try {
        await enviarAlBackend(visita);
        visita.sincronizado = true;
      } catch (e) {
        visita.sincronizado = false;
      }
    }
    await box.add(visita.toJson());
  }

  List<Visita> obtenerVisitas() {
    return box.values
        .map((e) => Visita.fromJson(Map<String, dynamic>.from(e)))
        .toList();
  }
}
