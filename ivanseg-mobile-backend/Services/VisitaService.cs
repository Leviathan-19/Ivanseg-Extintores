using ivanseg_mobile_backend.Data;
using ivanseg_mobile_backend.DTOs;
using ivanseg_mobile_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Services
{
    public class VisitaService
    {
        private readonly AppDbContext _context;

        public VisitaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Visita>> ObtenerVisitas()
        {
            return await _context.Visitas.Include(v => v.Barrio).ToListAsync();
        }

        public async Task<Visita?> ObtenerVisitaPorId(string id)
        {
            return await _context
                .Visitas.Include(v => v.Barrio)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Visita> CrearVisita(CrearVisitaDTO dto)
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
            };

            _context.Visitas.Add(visita);

            await _context.SaveChangesAsync();

            return visita;
        }
    }
}
