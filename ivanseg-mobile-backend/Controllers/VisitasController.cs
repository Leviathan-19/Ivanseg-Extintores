using ivanseg_mobile_backend.Data;
using ivanseg_mobile_backend.DTOs;
using ivanseg_mobile_backend.Models;
using ivanseg_mobile_backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitasController : ControllerBase
    {
        private readonly VisitaService _service;

        public VisitasController(VisitaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerVisitas()
        {
            var visitas = await _service.ObtenerVisitas();
            return Ok(visitas);
        }

        [HttpPost]
        public async Task<IActionResult> CrearVisita([FromBody] CrearVisitaDTO dto)
        {
            var visita = await _service.CrearVisita(dto);
            return Ok(visita);
        }
    }
}
