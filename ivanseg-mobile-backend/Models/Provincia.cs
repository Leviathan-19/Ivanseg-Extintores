namespace ivanseg_mobile_backend.Models
{
    public class Provincia
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Nombre { get; set; } = string.Empty;

        public ICollection<Canton> Cantones { get; set; } = new List<Canton>();
    }
}
