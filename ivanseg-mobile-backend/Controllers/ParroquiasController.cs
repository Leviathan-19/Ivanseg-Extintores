using ivanseg_mobile_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParroquiasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ParroquiasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerParroquias(string cantonId)
        {
            var parroquias = await _context.Parroquias
                .Where(p => p.CantonId == cantonId)
                .OrderBy(p => p.Nombre)
                .ToListAsync();

            return Ok(parroquias);
        }
    }
}