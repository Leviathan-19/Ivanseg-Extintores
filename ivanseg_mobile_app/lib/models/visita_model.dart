class Visita {
  String? id; // backend
  String visitaOfflineId;
  String cliente;
  bool sincronizado;

  Visita({
    this.id,
    required this.visitaOfflineId,
    required this.cliente,
    this.sincronizado = false,
  });

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "visitaOfflineId": visitaOfflineId,
      "cliente": cliente,
      "sincronizado": sincronizado,
    };
  }

  factory Visita.fromJson(Map<String, dynamic> json) {
    return Visita(
      id: json["id"],
      visitaOfflineId: json["visitaOfflineId"],
      cliente: json["cliente"],
      sincronizado: json["sincronizado"] ?? false,
    );
  }
}