import { useState } from 'react'

export default function AtividadeForm(props) {

    const [atividade, setAtividade] = useState({})

    const inputTextHandler = (e) => {
        const {name, value} = e.target;

        setAtividade({...atividade, [name]: value});
    }

    return (
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Id</label>
                <input name='id' id='id' onChange={inputTextHandler} type='text' className="form-control" value={Math.max.apply(Math, props.atividades.map(item => item.id)) + 1}/>
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
                <button className='btn btn-outline-secondary' onClick={props.addAtividade}> + Atividade </button>
            </div>
        </form>
  )
}
