import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/ubicacion_model.dart';

class UbicacionService {
  List<Provincia> _provincias = [];

  Future<void> cargarUbicaciones() async {
    try {
      final String jsonString = await rootBundle.loadString('assets/data/ubicaciones.json');
      final Map<String, dynamic> jsonData = json.decode(jsonString);
      
      _provincias = (jsonData['provincias'] as List)
          .map((p) => Provincia.fromJson(p))
          .toList();
          
      print("✅ Ubicaciones cargadas: ${_provincias.length} provincias");
      print("📊 Total de barrios: ${_contarBarrios()}");
    } catch (e) {
      print("❌ Error cargando ubicaciones: $e");
      throw Exception("No se pudieron cargar las ubicaciones");
    }
  }

  int _contarBarrios() {
    int total = 0;
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        for (var parroquia in canton.parroquias) {
          total += parroquia.barrios.length;
        }
      }
    }
    return total;
  }

  List<Provincia> get provincias => _provincias;

  // Obtener cantones de una provincia
  List<Canton> getCantones(String provinciaId) {
    final provincia = _provincias.firstWhere((p) => p.id == provinciaId);
    return provincia.cantones;
  }

  // Obtener parroquias de un cantón
  List<Parroquia> getParroquias(String cantonId) {
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        if (canton.id == cantonId) {
          return canton.parroquias;
        }
      }
    }
    return [];
  }

  // Obtener barrios de una parroquia
  List<Barrio> getBarrios(String parroquiaId) {
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        for (var parroquia in canton.parroquias) {
          if (parroquia.id == parroquiaId) {
            return parroquia.barrios;
          }
        }
      }
    }
    return [];
  }

  // Obtener barrio por ID
  Barrio? getBarrioById(String barrioId) {
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        for (var parroquia in canton.parroquias) {
          for (var barrio in parroquia.barrios) {
            if (barrio.id == barrioId) {
              return barrio;
            }
          }
        }
      }
    }
    return null;
  }
  
  // Obtener provincia por ID
  Provincia? getProvinciaById(String provinciaId) {
    try {
      return _provincias.firstWhere((p) => p.id == provinciaId);
    } catch (e) {
      return null;
    }
  }
  
  // Obtener cantón por ID
  Canton? getCantonById(String cantonId) {
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        if (canton.id == cantonId) {
          return canton;
        }
      }
    }
    return null;
  }
  
  // Obtener parroquia por ID
  Parroquia? getParroquiaById(String parroquiaId) {
    for (var provincia in _provincias) {
      for (var canton in provincia.cantones) {
        for (var parroquia in canton.parroquias) {
          if (parroquia.id == parroquiaId) {
            return parroquia;
          }
        }
      }
    }
    return null;
  }
}