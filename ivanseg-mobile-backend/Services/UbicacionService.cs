using ivanseg_mobile_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Services
{
    public class UbicacionService
    {
        private readonly AppDbContext _context;

        public UbicacionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> ObtenerUbicaciones()
        {
            var provincias = await _context
                .Provincias.Include(p => p.Cantones)
                .ThenInclude(c => c.Parroquias)
                .ThenInclude(p => p.Barrios)
                .ToListAsync();

            return provincias;
        }
    }
}
