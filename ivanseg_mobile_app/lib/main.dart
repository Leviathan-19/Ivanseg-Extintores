import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'screens/visitas_screen.dart';
import 'services/ubicacion_service.dart';
import 'utils/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: ".env");
  await Hive.initFlutter();
  await Hive.openBox('visitas');
  await Hive.openBox('settings');
  
  // Cargar ubicaciones UNA SOLA VEZ al iniciar la app
  final ubicacionService = UbicacionService();
  await ubicacionService.cargarUbicaciones();
  print("✅ Ubicaciones cargadas: ${ubicacionService.provincias.length} provincias");

  runApp(MyApp(ubicacionService: ubicacionService));
}

class MyApp extends StatelessWidget {
  final UbicacionService ubicacionService;
  
  const MyApp({super.key, required this.ubicacionService});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ivanseg App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: VisitasScreen(ubicacionService: ubicacionService),
    );
  }
}