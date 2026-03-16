using ivanseg_mobile_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UbicacionesController : ControllerBase
    {
        private readonly UbicacionService _service;

        public UbicacionesController(UbicacionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerUbicaciones()
        {
            var ubicaciones = await _service.ObtenerUbicaciones();

            return Ok(ubicaciones);
        }
    }
}