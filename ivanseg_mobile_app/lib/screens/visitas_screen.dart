import 'package:flutter/material.dart';
import '../services/visita_service.dart';
import '../models/visita_model.dart';
import 'crear_visita_screen.dart';

class VisitasScreen extends StatefulWidget {
  const VisitasScreen({super.key});

  @override
  State<VisitasScreen> createState() => _VisitasScreenState();
}

class _VisitasScreenState extends State<VisitasScreen> {
  final VisitaService visitaService = VisitaService();
  List<Visita> visitas = [];

  @override
  void initState() {
    super.initState();
    cargarVisitas();
  }

  void cargarVisitas() {
    visitas = visitaService.obtenerVisitas();
    setState(() {});
  }

  void irCrear() async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const CrearVisitaScreen()),
    );

    cargarVisitas();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Ivanseg-Extintores"),
      ),
      body: ListView.builder(
        itemCount: visitas.length,
        itemBuilder: (context, index) {
          final v = visitas[index];

          return ListTile(
            title: Text(v.cliente),
            subtitle: Text(v.visitaOfflineId),
            trailing: Icon(
              v.sincronizado ? Icons.cloud_done : Icons.cloud_off,
              color: v.sincronizado ? Colors.green : Colors.red,
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: irCrear,
        child: const Icon(Icons.add),
      ),
    );
  }
}