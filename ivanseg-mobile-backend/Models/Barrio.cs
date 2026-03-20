using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ivanseg_mobile_backend.Models
{
    public class Barrio
    {
        [Key]
        [Column("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [Column("parroquia_id")]
        public string ParroquiaId { get; set; } = string.Empty;

        public Parroquia? Parroquia { get; set; }
        public ICollection<Visita> Visitas { get; set; } = new List<Visita>();
    }
}
