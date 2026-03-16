namespace ivanseg_mobile_backend.DTOs
{
    public class ActualizarVisitaDTO
    {
        public string? NombreCliente { get; set; }

        public string RazonSocial { get; set; } = string.Empty;

        public string? Telefono { get; set; }

        public string? Correo { get; set; }

        public DateOnly ProximaVisita { get; set; }

        public string EstadoVisita { get; set; } = "pendiente";
    }
}