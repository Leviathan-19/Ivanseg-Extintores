import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'screens/visitas_screen.dart';
import 'utils/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: ".env");
  print(dotenv.env['API_URL']);
  await Hive.initFlutter();
  await Hive.openBox('visitas');

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ivanseg App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const VisitasScreen(),
    );
  }
}