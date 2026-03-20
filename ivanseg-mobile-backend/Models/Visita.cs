using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ivanseg_mobile_backend.Models
{
    public class Visita
    {
        [Key]
        [Column("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Column("nombre_cliente")]
        public string? NombreCliente { get; set; }

        [Column("razon_social")]
        public string RazonSocial { get; set; } = string.Empty;

        [Column("telefono")]
        public string? Telefono { get; set; }

        [Column("correo")]
        public string? Correo { get; set; }

        [Column("estado_visita")]
        public string? EstadoVisita { get; set; } = "pendiente";

        [Column("proxima_visita")]
        public DateOnly ProximaVisita { get; set; }

        [Column("fecha_visita")]
        public DateTime FechaVisita { get; set; } = DateTime.UtcNow;

        [Column("barrio_id")]
        public string BarrioId { get; set; } = string.Empty;

        [Column("calle_principal")]
        public string CallePrincipal { get; set; } = string.Empty;

        [Column("calle_secundaria")]
        public string? CalleSecundaria { get; set; }

        [Column("latitud")]
        public double? Latitud { get; set; }

        [Column("longitud")]
        public double? Longitud { get; set; }

        [Column("numeracion")]
        public string? Numeracion { get; set; }

        [Column("foto_url")]
        public string? FotoUrl { get; set; }

        public Barrio? Barrio { get; set; }

        [Column("dispositivo_id")]
        public string? DispositivoId { get; set; } //identificador de dispositivo movil

        [Column("visita_offline_id")]
        public string? VisitaOfflineId { get; set; } // id generado con flutter
    }
}
