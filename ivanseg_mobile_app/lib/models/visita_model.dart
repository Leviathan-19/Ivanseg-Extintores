class Visita {
  String? id;
  String visitaOfflineId;
  String cliente;
  String? razonSocial;
  String? telefono;
  String? correo;
  String? estadoVisita;
  String? proximaVisita;
  String? provincia;
  String? canton;
  String? parroquia;
  String? barrio;
  String? barrioId;  // ✅ Agregar este campo
  String? callePrincipal;
  String? calleSecundaria;
  double? latitud;
  double? longitud;
  String? numeracion;
  String? fotoUrl;
  String? dispositivoId;
  bool sincronizado;

  Visita({
    this.id,
    required this.visitaOfflineId,
    required this.cliente,
    this.razonSocial,
    this.telefono,
    this.correo,
    this.estadoVisita,
    this.proximaVisita,
    this.provincia,
    this.canton,
    this.parroquia,
    this.barrio,
    this.barrioId,  // ✅ Agregar al constructor
    this.callePrincipal,
    this.calleSecundaria,
    this.latitud,
    this.longitud,
    this.numeracion,
    this.fotoUrl,
    this.dispositivoId,
    this.sincronizado = false,
  });

  factory Visita.fromJson(Map<String, dynamic> json) {
    return Visita(
      id: json["id"]?.toString(),
      visitaOfflineId: json["visitaOfflineId"] ?? json["id"]?.toString() ?? "",
      cliente: json["nombreCliente"] ?? "",
      razonSocial: json["razonSocial"],
      telefono: json["telefono"],
      correo: json["correo"],
      estadoVisita: json["estadoVisita"],
      proximaVisita: json["proximaVisita"],
      provincia: json["provincia"],
      canton: json["canton"],
      parroquia: json["parroquia"],
      barrio: json["barrio"],
      barrioId: json["barrioId"],  // ✅ Agregar al fromJson
      callePrincipal: json["callePrincipal"],
      calleSecundaria: json["calleSecundaria"],
      numeracion: json["numeracion"],
      fotoUrl: json["fotoUrl"],
      dispositivoId: json["dispositivoId"],
      latitud: json["latitud"] != null ? (json["latitud"] as num).toDouble() : null,
      longitud: json["longitud"] != null ? (json["longitud"] as num).toDouble() : null,
      sincronizado: true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "nombreCliente": cliente,
      "razonSocial": razonSocial ?? "",
      "telefono": telefono ?? "",
      "correo": correo ?? "",
      "estadoVisita": estadoVisita ?? "",
      "proximaVisita": proximaVisita ?? "",
      "provincia": provincia ?? "",
      "canton": canton ?? "",
      "parroquia": parroquia ?? "",
      "barrio": barrio ?? "",
      "barrioId": barrioId ?? "",  // ✅ Agregar al toJson
      "callePrincipal": callePrincipal ?? "",
      "calleSecundaria": calleSecundaria ?? "",
      "numeracion": numeracion ?? "",
      "fotoUrl": fotoUrl ?? "",
      "dispositivoId": dispositivoId ?? "",
      "latitud": latitud,
      "longitud": longitud,
      "visitaOfflineId": visitaOfflineId,
    };
  }
}