namespace ivanseg_mobile_backend.Models
{
    public class Visita
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string? NombreCliente { get; set; }

        public string RazonSocial { get; set; } = string.Empty;

        public string? Telefono { get; set; }

        public string? Correo { get; set; }

        public string? EstadoVisita { get; set; } = "pendiente";

        public DateOnly ProximaVisita { get; set; }

        public DateTime FechaVisita { get; set; } = DateTime.UtcNow;

        public string BarrioId { get; set; } = string.Empty;

        public string CallePrincipal { get; set; } = string.Empty;

        public string? CalleSecundaria { get; set; }

        public double? Latitud { get; set; }

        public double? Longitud { get; set; }

        public string? Numeracion { get; set; }

        public string? FotoUrl { get; set; }

        // Relación
        public Barrio? Barrio { get; set; }
    }
}