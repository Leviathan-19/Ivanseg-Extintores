import 'package:hive/hive.dart';
import 'package:uuid/uuid.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'dart:io';
class DispositivoService {
  static const String _dispositivoIdKey = 'dispositivo_id';
  final Box _box = Hive.box('settings');

  Future<String> obtenerDispositivoId() async {
    String? dispositivoId = _box.get(_dispositivoIdKey);
    
    if (dispositivoId != null) {
      return dispositivoId;
    }
    
    dispositivoId = await _generarDispositivoId();
    await _box.put(_dispositivoIdKey, dispositivoId);
    
    return dispositivoId;
  }

  Future<String> _generarDispositivoId() async {
    try {
      final deviceInfo = DeviceInfoPlugin();
      
      if (Platform.isAndroid) {
        final androidInfo = await deviceInfo.androidInfo;
        return 'android_${androidInfo.id}_${const Uuid().v4()}';
      } else if (Platform.isIOS) {
        final iosInfo = await deviceInfo.iosInfo;
        return 'ios_${iosInfo.identifierForVendor}_${const Uuid().v4()}';
      }
    } catch (e) {
      print("Error obteniendo ID de dispositivo: $e");
    }
    return 'device_${const Uuid().v4()}';
  }
    String generarVisitaOfflineId() {
    return 'offline_${const Uuid().v4()}';
  }
}