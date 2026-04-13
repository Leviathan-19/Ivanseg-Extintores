import 'package:hive/hive.dart';
import '../models/visita_model.dart';
import 'visita_service.dart';
import '../utils/connectivity_service.dart';

class SyncService {
  final Box box = Hive.box('visitas');
  final VisitaService visitaService = VisitaService();

  Future<bool> hayInternet() async {
    return await ConnectivityService().hayInternet();
  }

  Future<void> sincronizarVisitas() async {
    if (!await hayInternet()) return;

    for (int i = 0; i < box.length; i++) {
      var data = box.getAt(i);

      Visita visita = Visita.fromJson(Map<String, dynamic>.from(data));

      if (!visita.sincronizado) {
        try {
          await visitaService.enviarAlBackend(visita);

          visita.sincronizado = true;
          await box.putAt(i, visita.toJson());

          print("✅ Visita sincronizada: ${visita.visitaOfflineId}");
        } catch (e) {
          print("❌ Error al sincronizar: ${visita.visitaOfflineId}");
        }
      }
    }
  }
}
