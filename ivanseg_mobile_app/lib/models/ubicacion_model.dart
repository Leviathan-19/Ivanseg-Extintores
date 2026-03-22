class Provincia {
  final String id;
  final String nombre;
  final List<Canton> cantones;

  Provincia({
    required this.id,
    required this.nombre,
    required this.cantones,
  });

  factory Provincia.fromJson(Map<String, dynamic> json) {
    return Provincia(
      id: json['id'],
      nombre: json['nombre'],
      cantones: (json['cantones'] as List)
          .map((cantonJson) => Canton.fromJson(cantonJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'cantones': cantones.map((canton) => canton.toJson()).toList(),
    };
  }
}

class Canton {
  final String id;
  final String nombre;
  final List<Parroquia> parroquias;

  Canton({
    required this.id,
    required this.nombre,
    required this.parroquias,
  });

  factory Canton.fromJson(Map<String, dynamic> json) {
    return Canton(
      id: json['id'],
      nombre: json['nombre'],
      parroquias: (json['parroquias'] as List)
          .map((parroquiaJson) => Parroquia.fromJson(parroquiaJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'parroquias': parroquias.map((parroquia) => parroquia.toJson()).toList(),
    };
  }
}

class Parroquia {
  final String id;
  final String nombre;
  final List<Barrio> barrios;

  Parroquia({
    required this.id,
    required this.nombre,
    required this.barrios,
  });

  factory Parroquia.fromJson(Map<String, dynamic> json) {
    return Parroquia(
      id: json['id'],
      nombre: json['nombre'],
      barrios: (json['barrios'] as List)
          .map((barrioJson) => Barrio.fromJson(barrioJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'barrios': barrios.map((barrio) => barrio.toJson()).toList(),
    };
  }
}

class Barrio {
  final String id;
  final String nombre;

  Barrio({
    required this.id,
    required this.nombre,
  });

  factory Barrio.fromJson(Map<String, dynamic> json) {
    return Barrio(
      id: json['id'],
      nombre: json['nombre'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
    };
  }

  @override
  String toString() => nombre;
}