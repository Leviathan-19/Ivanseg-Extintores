using ivanseg_mobile_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CantonesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CantonesController(AppDbContext context)
        {
            _context = context;
        }

        // api/cantones?provinciaId=xxx
        [HttpGet]
        public async Task<IActionResult> ObtenerCantones(string provinciaId)
        {
            var cantones = await _context.Cantones
                .Where(c => c.ProvinciaId == provinciaId)
                .OrderBy(c => c.Nombre)
                .ToListAsync();

            return Ok(cantones);
        }
    }
}