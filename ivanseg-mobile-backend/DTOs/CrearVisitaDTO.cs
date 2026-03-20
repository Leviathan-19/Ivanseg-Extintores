namespace ivanseg_mobile_backend.DTOs
{
    public class CrearVisitaDTO
    {
        public string? NombreCliente { get; set; }
        public string RazonSocial { get; set; } = string.Empty;
        public string? Telefono { get; set; }
        public string? Correo { get; set; }
        public DateOnly ProximaVisita { get; set; }
        public string BarrioId { get; set; } = string.Empty;
        public string CallePrincipal { get; set; } = string.Empty;
        public string? CalleSecundaria { get; set; }
        public double? Latitud { get; set; }
        public double? Longitud { get; set; }
        public string? Numeracion { get; set; }
        public string? FotoUrl { get; set; }
    }
}
