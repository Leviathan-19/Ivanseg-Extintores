using ivanseg_mobile_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BarriosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BarriosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerBarrios(string parroquiaId)
        {
            var barrios = await _context.Barrios
                .Where(b => b.ParroquiaId == parroquiaId)
                .OrderBy(b => b.Nombre)
                .ToListAsync();

            return Ok(barrios);
        }
    }
}