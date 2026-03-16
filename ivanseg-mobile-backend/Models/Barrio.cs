namespace ivanseg_mobile_backend.Models
{
    public class Barrio
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Nombre { get; set; } = string.Empty;

        public string ParroquiaId { get; set; } = string.Empty;

        // Relaciones
        public Parroquia? Parroquia { get; set; }

        public ICollection<Visita>? Visitas { get; set; }
    }
}