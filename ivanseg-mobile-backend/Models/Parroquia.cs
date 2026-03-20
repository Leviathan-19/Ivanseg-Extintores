namespace ivanseg_mobile_backend.Models
{
    public class Parroquia
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Nombre { get; set; } = string.Empty;

        public string CantonId { get; set; } = string.Empty;

        public Canton? Canton { get; set; }

        public ICollection<Barrio> Barrios { get; set; } = new List<Barrio>();
    }
}
