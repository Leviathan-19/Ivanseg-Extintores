using ivanseg_mobile_backend.Data;
using ivanseg_mobile_backend.DTOs;
using ivanseg_mobile_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VisitasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/visitas
        [HttpGet]
        public async Task<IActionResult> ObtenerVisitas()
        {
            var visitas = await _context.Visitas
                .Include(v => v.Barrio)
                .ThenInclude(b => b.Parroquia)
                .ThenInclude(p => p.Canton)
                .ThenInclude(c => c.Provincia)
                .ToListAsync();

            return Ok(visitas);
        }

        // GET: api/visitas/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerVisita(string id)
        {
            var visita = await _context.Visitas
                .Include(v => v.Barrio)
                .ThenInclude(b => b.Parroquia)
                .ThenInclude(p => p.Canton)
                .ThenInclude(c => c.Provincia)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (visita == null)
                return NotFound();

            return Ok(visita);
        }

        // POST: api/visitas
        [HttpPost]
        public async Task<IActionResult> CrearVisita([FromBody] CrearVisitaDTO dto)
        {
            var visita = new Visita
            {
                Id = Guid.NewGuid().ToString(),
                NombreCliente = dto.NombreCliente,
                RazonSocial = dto.RazonSocial,
                Telefono = dto.Telefono,
                Correo = dto.Correo,
                ProximaVisita = dto.ProximaVisita,
                BarrioId = dto.BarrioId,
                CallePrincipal = dto.CallePrincipal,
                CalleSecundaria = dto.CalleSecundaria,
                Latitud = dto.Latitud,
                Longitud = dto.Longitud,
                Numeracion = dto.Numeracion
            };

            _context.Visitas.Add(visita);

            await _context.SaveChangesAsync();

            return Ok(visita);
        }

        // PUT: api/visitas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarVisita(string id, ActualizarVisitaDTO dto)
        {
            var visita = await _context.Visitas.FindAsync(id);

            if (visita == null)
                return NotFound();

            visita.NombreCliente = dto.NombreCliente;
            visita.RazonSocial = dto.RazonSocial;
            visita.Telefono = dto.Telefono;
            visita.Correo = dto.Correo;
            visita.ProximaVisita = dto.ProximaVisita;
            visita.EstadoVisita = dto.EstadoVisita;

            await _context.SaveChangesAsync();

            return Ok(visita);
        }
    }
}