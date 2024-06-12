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
                  <li key={ativ.id} className='list-group-item'>{ativ.id} - {ativ.descricao}</li>
              ))}
        </div>
    </>
  );
}

export default App;
