import { useState } from 'react';
import './App.css';

let initialState = [
    {
      id: 1,
      descricao: 'Primeira Atividade'
    },
    {
      id: 2,
      descricao: 'Segunda Atividade'
    }
];

function App() {

  const [atividades, setAtividades] = useState(initialState)

  function AddAtividade(e) {
      e.preventDefault(); // Evita que a página fique atualizando

      const atividade = {
          id: document.getElementById('id').value,
          descricao: document.getElementById('descricao').value
      };

      setAtividades([...atividades, {...atividade}]); // Spred operator utilizado para criar um novo array dentro de um array
  }


  return (
    <>
        <form className="row g-3">
            <div className="col-md-6">
                <label for='id' className="form-label">Id</label>
                <input id='id' type='text' className="form-control" />
            </div>
            <div className="col-md-6">
                <label for='descricao' className="form-label">Descrição</label>
                <input id='descricao' type='text' className="form-control" />
            </div>
            <hr />
            <div className='col-12'>
                <button className='btn btn-outline-secondary' onClick={AddAtividade}> + Atividade </button>
            </div>
        </form>

        <div className='mt-3'>
              {atividades.map((ativ) => (                  
                  <div key={ativ.id} className="card mb-2 shadow-sm">                    
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                          <h5 className="card-title"><span class="badge bg-secondary me-1">{ativ.id}</span>- título</h5>
                          <h6> Prioridade:<span className='ms-1 text-black'><i class="me-1 fa-regular fa-face-frown"></i>Alta</span></h6>
                      </div>
                      <p className="card-text">{ativ.descricao}</p>
                    </div>
                  </div>
              ))}
        </div>
    </>
  );
}

export default App;
