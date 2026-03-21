import 'package:hive/hive.dart';

class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();

  factory DatabaseService() {
    return _instance;
  }
  DatabaseService._internal();
  Box get visitasBox => Hive.box('visitas');
  Future<void> guardar(dynamic data) async {
    await visitasBox.add(data);
  }
  List getAll() {
    return visitasBox.values.toList();
  }
  Future<void> actualizar(int index, dynamic data) async {
    await visitasBox.putAt(index, data);
  }
}