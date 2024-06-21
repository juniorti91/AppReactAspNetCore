using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> get() 
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade get(int id) 
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }

        [HttpPost]
        public IEnumerable<Atividade> post(Atividade atividade) 
        {  
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0) {
                return _context.Atividades;
            }

            return _context.Atividades.Append<Atividade>(atividade);
        }

        [HttpPut("{id}")]
        public Atividade put(int id, Atividade atividade) 
        {
            atividade.Id = atividade.Id + 1;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string delete(int id) 
        {
            return "Meu primeiro método delete";
        }
    }
}