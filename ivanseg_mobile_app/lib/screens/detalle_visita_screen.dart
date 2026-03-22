import 'package:flutter/material.dart';
import '../models/visita_model.dart';
import '../utils/app_theme.dart';

class DetalleVisitaScreen extends StatelessWidget {
  final Visita visita;

  const DetalleVisitaScreen({super.key, required this.visita});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle de Visita'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInfoCard(
              'Información del Cliente',
              Icons.person,
              [
                _buildInfoRow('Nombre', visita.cliente),
                if (visita.razonSocial != null && visita.razonSocial!.isNotEmpty)
                  _buildInfoRow('Razón Social', visita.razonSocial!),
                if (visita.telefono != null && visita.telefono!.isNotEmpty)
                  _buildInfoRow('Teléfono', visita.telefono!),
                if (visita.correo != null && visita.correo!.isNotEmpty)
                  _buildInfoRow('Correo', visita.correo!),
              ],
            ),
            const SizedBox(height: 16),
            _buildInfoCard(
              'Detalles de la Visita',
              Icons.assignment,
              [
                if (visita.estadoVisita != null && visita.estadoVisita!.isNotEmpty)
                  _buildInfoRow('Estado', visita.estadoVisita!),
                if (visita.proximaVisita != null && visita.proximaVisita!.isNotEmpty)
                  _buildInfoRow('Próxima Visita', visita.proximaVisita!),
                _buildInfoRow('ID Offline', visita.visitaOfflineId),
                _buildInfoRow('Sincronizado', 
                  visita.sincronizado ? 'Sí' : 'No',
                  color: visita.sincronizado ? Colors.green : Colors.orange,
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildInfoCard(
              'Ubicación',
              Icons.location_on,
              [
                if (visita.provincia != null && visita.provincia!.isNotEmpty)
                  _buildInfoRow('Provincia', visita.provincia!),
                if (visita.canton != null && visita.canton!.isNotEmpty)
                  _buildInfoRow('Cantón', visita.canton!),
                if (visita.parroquia != null && visita.parroquia!.isNotEmpty)
                  _buildInfoRow('Parroquia', visita.parroquia!),
                if (visita.barrio != null && visita.barrio!.isNotEmpty)
                  _buildInfoRow('Barrio', visita.barrio!),
                if (visita.callePrincipal != null && visita.callePrincipal!.isNotEmpty)
                  _buildInfoRow('Calle Principal', visita.callePrincipal!),
                if (visita.calleSecundaria != null && visita.calleSecundaria!.isNotEmpty)
                  _buildInfoRow('Calle Secundaria', visita.calleSecundaria!),
                if (visita.numeracion != null && visita.numeracion!.isNotEmpty)
                  _buildInfoRow('Numeración', visita.numeracion!),
                if (visita.latitud != null && visita.longitud != null)
                  _buildInfoRow(
                    'Coordenadas',
                    '${visita.latitud!.toStringAsFixed(6)}, ${visita.longitud!.toStringAsFixed(6)}',
                  ),
              ],
            ),
            const SizedBox(height: 16),
            if (visita.fotoUrl != null && visita.fotoUrl!.isNotEmpty)
              _buildInfoCard(
                'Foto',
                Icons.photo,
                [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.network(
                      visita.fotoUrl!,
                      height: 200,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          height: 200,
                          color: Colors.grey[200],
                          child: const Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.broken_image, size: 48),
                                SizedBox(height: 8),
                                Text('No se pudo cargar la imagen'),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoCard(String title, IconData icon, List<Widget> children) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: AppTheme.primaryColor, size: 24),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const Divider(height: 24),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value, {Color? color}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                color: color ?? Colors.black87,
                fontWeight: color != null ? FontWeight.w500 : FontWeight.normal,
              ),
            ),
          ),
        ],
      ),
    );
  }
}