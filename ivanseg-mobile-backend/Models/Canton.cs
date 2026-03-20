namespace ivanseg_mobile_backend.Models
{
    public class Canton
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Nombre { get; set; } = string.Empty;

        public string ProvinciaId { get; set; } = string.Empty;

        public Provincia? Provincia { get; set; }

        public ICollection<Parroquia> Parroquias { get; set; } = new List<Parroquia>();
    }
}
