import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/Atividades';

function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});

  const pegaTodasAtividades = async () => {
        const response = await api.get('atividade');
        return response.data;
  }

  useEffect(() => {
      const getAtividades = async () => {
          const todasAtividade = await pegaTodasAtividades();
          if (todasAtividade) {
            setAtividades(todasAtividade);
          } 
      };
      getAtividades();
  }, [])

  const addAtividade = async (ativ) => {
      const response = await api.post('atividade', ativ);
      setAtividades([...atividades, response.data]); // Spred operator utilizado para criar um novo array dentro de um array
  }

  function cancelarAtividade() {
      setAtividade({id: 0});
  }

  const atualizarAtividade = async (ativ) => {
      const response = await api.put(`atividade/${ativ.id}`, ativ);
      const { id } = response.data;
      
      setAtividades(atividades.map(item => item.id === id ? response.data : item));
      setAtividade({id: 0});
  }

  const deletarAtividade = async (id) => {
      if (await api.delete(`atividade/${id}`)) {
          const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
          setAtividades([...atividadesFiltradas]);
      }      
  }

  function pegarAtividade(id){
      const atividade = atividades.filter(atividade => atividade.id === id ); 
      setAtividade(atividade[0])
  }

  return (
    <>
        <AtividadeForm 
            addAtividade={addAtividade} 
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
            atividades={atividades} 
        />

        <AtividadeLista 
            atividades={atividades}
            deletarAtividade={deletarAtividade}
            pegarAtividade={pegarAtividade}
        />
    </>
  );
}

export default App;
