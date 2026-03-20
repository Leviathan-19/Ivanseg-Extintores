namespace ivanseg_mobile_backend.DTOs
{
    public class VisitaResponseDTO
    {
        public string Id { get; set; } = string.Empty;
        public string? NombreCliente { get; set; }
        public string RazonSocial { get; set; } = string.Empty;
        public string? Telefono { get; set; }
        public string? Correo { get; set; }
        public string EstadoVisita { get; set; } = "pendiente";
        public DateOnly ProximaVisita { get; set; }
        public DateTime FechaVisita { get; set; }
        public string Provincia { get; set; } = string.Empty;
        public string Canton { get; set; } = string.Empty;
        public string Parroquia { get; set; } = string.Empty;
        public string Barrio { get; set; } = string.Empty;
        public string CallePrincipal { get; set; } = string.Empty;
        public string? CalleSecundaria { get; set; }
        public double? Latitud { get; set; }
        public double? Longitud { get; set; }
        public string? Numeracion { get; set; }
        public string? FotoUrl { get; set; }
        public string? DispositivoId { get; set; }
        public string? VisitaOfflineId { get; set; }
    }
}
