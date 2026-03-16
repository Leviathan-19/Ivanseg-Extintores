using ivanseg_mobile_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProvinciasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProvinciasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerProvincias()
        {
            var provincias = await _context.Provincias
                .OrderBy(p => p.Nombre)
                .ToListAsync();

            return Ok(provincias);
        }
    }
}