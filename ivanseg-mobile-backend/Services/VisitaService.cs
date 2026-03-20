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

        public async Task<List<VisitaResponseDTO>> ObtenerVisitas()
        {
            var visitas = await _context
                .Visitas.Include(v => v.Barrio)
                .ThenInclude(b => b!.Parroquia)
                .ThenInclude(p => p!.Canton)
                .ThenInclude(c => c!.Provincia)
                .ToListAsync();

            return visitas
                .Select(v => new VisitaResponseDTO
                {
                    Id = v.Id,
                    NombreCliente = v.NombreCliente,
                    RazonSocial = v.RazonSocial,
                    Telefono = v.Telefono,
                    Correo = v.Correo,
                    EstadoVisita = v.EstadoVisita!,
                    ProximaVisita = v.ProximaVisita,
                    FechaVisita = v.FechaVisita,

                    Barrio = v.Barrio?.Nombre ?? "",
                    Parroquia = v.Barrio?.Parroquia?.Nombre ?? "",
                    Canton = v.Barrio?.Parroquia?.Canton?.Nombre ?? "",
                    Provincia = v.Barrio?.Parroquia?.Canton?.Provincia?.Nombre ?? "",

                    CallePrincipal = v.CallePrincipal,
                    CalleSecundaria = v.CalleSecundaria,
                    Latitud = v.Latitud,
                    Longitud = v.Longitud,
                })
                .ToList();
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
                Numeracion = dto.Numeracion,
                FotoUrl = dto.FotoUrl,
            };

            _context.Visitas.Add(visita);

            await _context.SaveChangesAsync();

            return visita;
        }
    }
}
