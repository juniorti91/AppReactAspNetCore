import { useEffect, useState } from 'react';
import './App.css';
import { Button, Modal } from 'react-bootstrap';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/Atividades';

function App() {

  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  
  const handleAtividadeModal = () => 
      setShowAtividadeModal(!showAtividadeModal);

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
      setAtividade(atividade[0]);
      handleAtividadeModal(); // Abrindo o modal
  }

  return (
    <>  
        <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
            <h1 className='m-0 p-0'> 
                Atividade {atividade.id !== 0 ? atividade.id : ''}
            </h1>

            <Button variant="outline-secondary" onClick={handleAtividadeModal}>
                <i className='fas fa-plus me-2'></i>
                    Nova Atividade
            </Button> 
        </div>

        <AtividadeLista 
            atividades={atividades}
            deletarAtividade={deletarAtividade}
            pegarAtividade={pegarAtividade}
        />

        <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
            <Modal.Header closeButton>
                <Modal.Title> Atividade {atividade.id !== 0 ? atividade.id : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AtividadeForm 
                    addAtividade={addAtividade} 
                    cancelarAtividade={cancelarAtividade}
                    atualizarAtividade={atualizarAtividade}
                    ativSelecionada={atividade}
                    atividades={atividades} 
                />
            </Modal.Body>
        </Modal>

    </>
  );
}

export default App;
