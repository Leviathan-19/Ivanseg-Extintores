import 'package:flutter/material.dart';
import '../services/visita_service.dart';

class CrearVisitaScreen extends StatefulWidget {
  const CrearVisitaScreen({super.key});

  @override
  State<CrearVisitaScreen> createState() => _CrearVisitaScreenState();
}

class _CrearVisitaScreenState extends State<CrearVisitaScreen> {
  final TextEditingController clienteController = TextEditingController();
  final VisitaService visitaService = VisitaService();

  void guardar() async {
    String cliente = clienteController.text;

    if (cliente.isEmpty) return;

    await visitaService.guardarVisita(cliente);
    print(cliente);
    clienteController.clear();

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Visita guardada")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Crear Visita")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: clienteController,
              decoration: const InputDecoration(
                labelText: "Cliente",
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: guardar,
              child: const Text("Guardar"),
            ),
          ],
        ),
      ),
    );
  }
}