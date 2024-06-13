import { useState } from 'react';
import './App.css';

let initialState = [
    {
      id: 1,
      prioridade: '1',
      titulo: 'titulo 01',
      descricao: 'Primeira Atividade'
    },
    {
      id: 2,
      prioridade: '1',
      titulo: 'tutilo 02',
      descricao: 'Segunda Atividade'
    }
];

function App() {

  const [atividades, setAtividades] = useState(initialState)

  function AddAtividade(e) {
      e.preventDefault(); // Evita que a página fique atualizando

      const atividade = {
          id: document.getElementById('id').value,
          prioridade: document.getElementById('prioridade').value,
          titulo: document.getElementById('titulo').value,
          descricao: document.getElementById('descricao').value
      };

      setAtividades([...atividades, {...atividade}]); // Spred operator utilizado para criar um novo array dentro de um array
  }

  function prioridadeLabel(param) {
      switch (param) {
          case '1':
              return 'Baixa';
          case '2':
              return 'Normal';
          case '3':
              return 'Alta';
          default:
              return 'Não definido';
      }
  }

  function prioridadeStyle(param, icone) {
      switch (param) {
        case '1':
            return icone ? 'smile' : 'success';
        case '2':
            return icone ? 'meh' : 'dark';
        case '3':
            return icone ? 'frown' : 'warning';
        default:
            return 'Não definido';
      }
  }


  return (
    <>
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Id</label>
                <input id='id' type='text' className="form-control" readOnly value={Math.max.apply(Math, atividades.map(item => item.id)) + 1} />
            </div>
            <div className="col-md-6">
                <label className="form-label">Prioridade</label>
                <select id="prioridade" className="form-select">
                    <option defaultValue='0'>Selecione ...</option>
                    <option value='1'>Baixa</option>
                    <option value='2'>Normal</option>
                    <option value='3'>Alta</option>
                </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Descrição</label>
                <input id='descricao' type='text' className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">Título</label>
                <input id='titulo' type='text' className="form-control" />
            </div>
            <hr />
            <div className='col-12'>
                <button className='btn btn-outline-secondary' onClick={AddAtividade}> + Atividade </button>
            </div>
        </form>

        <div className='mt-3'>
              {atividades.map((ativ) => (                  
                  <div key={ativ.id} className={"card mb-2 shadow-sm border-" + prioridadeStyle(ativ.prioridade)}> 
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                          <h5 className="card-title"><span className="badge bg-secondary me-1">{ativ.id}</span>- {ativ.titulo}</h5>
                          <h6> Prioridade:<span className={'ms-1 text-' + prioridadeStyle(ativ.prioridade)}><i className={"me-1 fa-regular fa-face-" + prioridadeStyle(ativ.prioridade, true)}></i>{prioridadeLabel(ativ.prioridade)}</span></h6>
                      </div>

                      <p className="card-text">{ativ.descricao}</p>

                      <div className="dfle justify-content-end pt-2 m-0 border-top">
                          <button className="btn btn-sm btn-outline-primary me-2"><i className='fas fa-pen me-2'/>Editar</button>
                          <button className="btn btn-sm btn-outline-danger"><i className='fas fa-trash me-2'/>Deletar</button>
                      </div>
                    </div>
                  </div>
              ))}
        </div>
    </>
  );
}

export default App;
