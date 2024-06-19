using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public Atividade get() {
            return new Atividade();
        }

        [HttpGet("{id}")]
        public string get(int id) {
            return $"Meu primeiro método get com parametro {id}";
        }

        [HttpPost]
        public Atividade post(Atividade atividade) {
            
            atividade.Id = 1;
            return atividade;
        }

        [HttpPut("{id}")]
        public Atividade put(int id, Atividade atividade) {

            atividade.Id = atividade.Id + 1;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string delete(int id) {
            return "Meu primeiro método delete";
        }
    }
}