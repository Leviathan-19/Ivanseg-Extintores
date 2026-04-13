import 'package:flutter/material.dart';
import '../services/visita_service.dart';
import '../models/visita_model.dart';
import '../utils/app_theme.dart';
import 'crear_visita_screen.dart';
import 'detalle_visita_screen.dart';
import '../services/ubicacion_service.dart';

class VisitasScreen extends StatefulWidget {
  final UbicacionService ubicacionService;

  const VisitasScreen({
    super.key,
    required this.ubicacionService,
  });

  @override
  State<VisitasScreen> createState() => _VisitasScreenState();
}

class _VisitasScreenState extends State<VisitasScreen> {
  final VisitaService _visitaService = VisitaService();
  List<Visita> _visitas = [];
  bool _isLoading = true;
  bool _isSyncing = false;

  @override
  void initState() {
    super.initState();
    _cargarVisitas();
  }

  Future<void> _cargarVisitas() async {
    setState(() => _isLoading = true);
    try {
      _visitas = await _visitaService.obtenerVisitas();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al cargar visitas: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _sincronizar() async {
    setState(() => _isSyncing = true);
    try {
      await _visitaService.sincronizarVisitasPendientes();
      await _cargarVisitas();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✅ Datos sincronizados correctamente'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al sincronizar: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isSyncing = false);
    }
  }

  Future<void> _irCrear() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const CrearVisitaScreen()),
    );
    if (result == true) {
      await _cargarVisitas();
    }
  }

  void _irDetalle(Visita visita) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => DetalleVisitaScreen(visita: visita)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ivanseg Extintores'),
        actions: [
          IconButton(
            icon: _isSyncing
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Icon(Icons.sync),
            onPressed: _isSyncing ? null : _sincronizar,
            tooltip: 'Sincronizar',
          ),
        ],
      ),
      body: _isLoading
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Cargando visitas...'),
                ],
              ),
            )
          : _visitas.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 80, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    'No hay visitas registradas',
                    style: TextStyle(fontSize: 18, color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Presiona el botón + para crear una nueva visita',
                    style: TextStyle(fontSize: 14, color: Colors.grey[500]),
                  ),
                ],
              ),
            )
          : RefreshIndicator(
              onRefresh: _cargarVisitas,
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(vertical: 8),
                itemCount: _visitas.length,
                itemBuilder: (context, index) {
                  final visita = _visitas[index];
                  return _buildVisitaCard(visita);
                },
              ),
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _irCrear,
        icon: const Icon(Icons.add),
        label: const Text('Nueva Visita'),
        backgroundColor: AppTheme.primaryColor,
      ),
    );
  }

  Widget _buildVisitaCard(Visita visita) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: InkWell(
        onTap: () => _irDetalle(visita),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: AppTheme.primaryColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(
                      Icons.business,
                      color: AppTheme.primaryColor,
                      size: 28,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          visita.cliente,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        if (visita.razonSocial != null &&
                            visita.razonSocial!.isNotEmpty)
                          Text(
                            visita.razonSocial!,
                            style: const TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: visita.sincronizado
                          ? Colors.green.withOpacity(0.1)
                          : Colors.orange.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          visita.sincronizado
                              ? Icons.cloud_done
                              : Icons.cloud_off,
                          size: 16,
                          color: visita.sincronizado
                              ? Colors.green
                              : Colors.orange,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          visita.sincronizado ? 'Sincronizado' : 'Pendiente',
                          style: TextStyle(
                            fontSize: 12,
                            color: visita.sincronizado
                                ? Colors.green
                                : Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              if (visita.telefono != null && visita.telefono!.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      const Icon(Icons.phone, size: 16, color: Colors.grey),
                      const SizedBox(width: 8),
                      Text(
                        visita.telefono!,
                        style: const TextStyle(fontSize: 14),
                      ),
                    ],
                  ),
                ),
              if (visita.correo != null && visita.correo!.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      const Icon(Icons.email, size: 16, color: Colors.grey),
                      const SizedBox(width: 8),
                      Text(
                        visita.correo!,
                        style: const TextStyle(fontSize: 14),
                      ),
                    ],
                  ),
                ),
              if (visita.provincia != null && visita.provincia!.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        size: 16,
                        color: Colors.grey,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          '${visita.provincia}, ${visita.canton ?? ''}',
                          style: const TextStyle(fontSize: 14),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
              if (visita.estadoVisita != null &&
                  visita.estadoVisita!.isNotEmpty)
                Container(
                  margin: const EdgeInsets.only(top: 8),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    visita.estadoVisita!,
                    style: TextStyle(
                      fontSize: 12,
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
