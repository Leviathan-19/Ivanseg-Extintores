import 'package:flutter/material.dart';
import '../services/visita_service.dart';
import '../services/ubicacion_service.dart';
import '../models/ubicacion_model.dart';
import '../utils/app_theme.dart';

class CrearVisitaScreen extends StatefulWidget {
  const CrearVisitaScreen({super.key});

  @override
  State<CrearVisitaScreen> createState() => _CrearVisitaScreenState();
}

class _CrearVisitaScreenState extends State<CrearVisitaScreen> {
  final _formKey = GlobalKey<FormState>();

  // Controladores de texto
  final _clienteController = TextEditingController();
  final _razonSocialController = TextEditingController();
  final _telefonoController = TextEditingController();
  final _correoController = TextEditingController();
  final _estadoVisitaController = TextEditingController();
  final _proximaVisitaController = TextEditingController();
  final _callePrincipalController = TextEditingController();
  final _calleSecundariaController = TextEditingController();
  final _numeracionController = TextEditingController();

  // Variables para ubicación
  Provincia? _selectedProvincia;
  Canton? _selectedCanton;
  Parroquia? _selectedParroquia;
  Barrio? _selectedBarrio;

  // Listas para los dropdowns
  List<Provincia> _provincias = [];
  List<Canton> _cantones = [];
  List<Parroquia> _parroquias = [];
  List<Barrio> _barrios = [];

  final VisitaService _visitaService = VisitaService();
  final UbicacionService _ubicacionService = UbicacionService();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _cargarProvincias();
  }

  void _cargarProvincias() {
    setState(() {
      _provincias = _ubicacionService.provincias;
    });
  }

  void _onProvinciaChanged(Provincia? provincia) {
    setState(() {
      _selectedProvincia = provincia;
      _selectedCanton = null;
      _selectedParroquia = null;
      _selectedBarrio = null;

      _cantones = provincia != null
          ? _ubicacionService.getCantones(provincia.id)
          : [];
      _parroquias = [];
      _barrios = [];
    });
  }

  void _onCantonChanged(Canton? canton) {
    setState(() {
      _selectedCanton = canton;
      _selectedParroquia = null;
      _selectedBarrio = null;

      _parroquias = canton != null
          ? _ubicacionService.getParroquias(canton.id)
          : [];
      _barrios = [];
    });
  }

  void _onParroquiaChanged(Parroquia? parroquia) {
    setState(() {
      _selectedParroquia = parroquia;
      _selectedBarrio = null;

      _barrios = parroquia != null
          ? _ubicacionService.getBarrios(parroquia.id)
          : [];
    });
  }

  void _onBarrioChanged(Barrio? barrio) {
    setState(() {
      _selectedBarrio = barrio;
    });
  }

  Future<void> _guardar() async {
    if (!_formKey.currentState!.validate()) return;

    // Validar que se haya seleccionado un barrio
    if (_selectedBarrio == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('⚠️ Por favor seleccione un barrio'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      // Obtener los nombres de la jerarquía seleccionada
      final provinciaNombre = _selectedProvincia?.nombre ?? '';
      final cantonNombre = _selectedCanton?.nombre ?? '';
      final parroquiaNombre = _selectedParroquia?.nombre ?? '';
      final barrioNombre = _selectedBarrio?.nombre ?? '';
      final barrioId = _selectedBarrio?.id ?? '';

      await _visitaService.guardarVisitaCompleta(
        cliente: _clienteController.text,
        razonSocial: _razonSocialController.text,
        telefono: _telefonoController.text,
        correo: _correoController.text,
        estadoVisita: _estadoVisitaController.text,
        proximaVisita: _proximaVisitaController.text,
        provincia: provinciaNombre,
        canton: cantonNombre,
        parroquia: parroquiaNombre,
        barrio: barrioNombre,
        barrioId: barrioId, // ✅ Enviamos el ID del barrio al backend
        callePrincipal: _callePrincipalController.text,
        calleSecundaria: _calleSecundariaController.text,
        numeracion: _numeracionController.text,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✅ Visita guardada exitosamente'),
            backgroundColor: Colors.green,
            duration: Duration(seconds: 2),
          ),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('❌ Error al guardar: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _clienteController.dispose();
    _razonSocialController.dispose();
    _telefonoController.dispose();
    _correoController.dispose();
    _estadoVisitaController.dispose();
    _proximaVisitaController.dispose();
    _callePrincipalController.dispose();
    _calleSecundariaController.dispose();
    _numeracionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Nueva Visita'), elevation: 0),
      body: _isLoading
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Guardando visita...'),
                ],
              ),
            )
          : Form(
              key: _formKey,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Sección: Información del Cliente
                    _buildSectionTitle('Información del Cliente', Icons.person),
                    const SizedBox(height: 16),
                    _buildTextField(
                      controller: _clienteController,
                      label: 'Nombre del Cliente *',
                      icon: Icons.business,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Este campo es requerido';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    _buildTextField(
                      controller: _razonSocialController,
                      label: 'Razón Social',
                      icon: Icons.business_center,
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: _buildTextField(
                            controller: _telefonoController,
                            label: 'Teléfono',
                            icon: Icons.phone,
                            keyboardType: TextInputType.phone,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildTextField(
                            controller: _correoController,
                            label: 'Correo Electrónico',
                            icon: Icons.email,
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value != null && value.isNotEmpty) {
                                if (!value.contains('@')) {
                                  return 'Correo inválido';
                                }
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Sección: Detalles de la Visita
                    _buildSectionTitle(
                      'Detalles de la Visita',
                      Icons.assignment,
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: _buildTextField(
                            controller: _estadoVisitaController,
                            label: 'Estado de Visita',
                            icon: Icons.timeline,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildTextField(
                            controller: _proximaVisitaController,
                            label: 'Próxima Visita',
                            icon: Icons.calendar_today,
                            keyboardType: TextInputType.datetime,
                            hintText: 'YYYY-MM-DD',
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Sección: Ubicación (Comboboxes anidados)
                    _buildSectionTitle('Ubicación', Icons.location_on),
                    const SizedBox(height: 16),

                    // Combobox: Provincia
                    _buildDropdownField<Provincia>(
                      value: _selectedProvincia,
                      items: _provincias,
                      label: 'Provincia',
                      icon: Icons.map,
                      onChanged: _onProvinciaChanged,
                      displayName: (provincia) => provincia.nombre,
                    ),

                    const SizedBox(height: 16),

                    // Combobox: Cantón (solo si hay provincias seleccionadas)
                    if (_selectedProvincia != null)
                      _buildDropdownField<Canton>(
                        value: _selectedCanton,
                        items: _cantones,
                        label: 'Cantón',
                        icon: Icons.map,
                        onChanged: _onCantonChanged,
                        displayName: (canton) => canton.nombre,
                      ),

                    if (_selectedProvincia != null) const SizedBox(height: 16),

                    // Combobox: Parroquia (solo si hay cantón seleccionado)
                    if (_selectedCanton != null)
                      _buildDropdownField<Parroquia>(
                        value: _selectedParroquia,
                        items: _parroquias,
                        label: 'Parroquia',
                        icon: Icons.map,
                        onChanged: _onParroquiaChanged,
                        displayName: (parroquia) => parroquia.nombre,
                      ),

                    if (_selectedCanton != null) const SizedBox(height: 16),

                    // Combobox: Barrio (solo si hay parroquia seleccionada)
                    if (_selectedParroquia != null)
                      _buildDropdownField<Barrio>(
                        value: _selectedBarrio,
                        items: _barrios,
                        label: 'Barrio *',
                        icon: Icons.streetview,
                        onChanged: _onBarrioChanged,
                        displayName: (barrio) => barrio.nombre,
                      ),

                    if (_selectedParroquia != null) const SizedBox(height: 16),

                    // Sección: Dirección
                    _buildSectionTitle('Dirección', Icons.home),
                    const SizedBox(height: 16),
                    _buildTextField(
                      controller: _callePrincipalController,
                      label: 'Calle Principal',
                      icon: Icons.streetview,
                    ),
                    const SizedBox(height: 16),
                    _buildTextField(
                      controller: _calleSecundariaController,
                      label: 'Calle Secundaria',
                      icon: Icons.streetview,
                    ),
                    const SizedBox(height: 16),
                    _buildTextField(
                      controller: _numeracionController,
                      label: 'Numeración',
                      icon: Icons.numbers,
                      keyboardType: TextInputType.number,
                    ),

                    const SizedBox(height: 32),

                    // Botón Guardar
                    ElevatedButton(
                      onPressed: _guardar,
                      child: const Text('Guardar Visita'),
                    ),

                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildSectionTitle(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, color: AppTheme.primaryColor, size: 24),
        const SizedBox(width: 8),
        Text(title, style: Theme.of(context).textTheme.titleLarge),
      ],
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    String? Function(String?)? validator,
    String? hintText,
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        hintText: hintText,
        prefixIcon: Icon(icon, color: AppTheme.primaryColor),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      keyboardType: keyboardType,
      validator: validator,
    );
  }

  Widget _buildDropdownField<T>({
    required T? value,
    required List<T> items,
    required String label,
    required IconData icon,
    required void Function(T?) onChanged,
    required String Function(T) displayName,
  }) {
    return DropdownButtonFormField<T>(
      value: value,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: AppTheme.primaryColor),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      items: items.map((item) {
        return DropdownMenuItem(value: item, child: Text(displayName(item)));
      }).toList(),
      onChanged: onChanged,
      isExpanded: true,
      validator: (value) {
        if (label.contains('*') && value == null) {
          return 'Este campo es requerido';
        }
        return null;
      },
    );
  }
}
