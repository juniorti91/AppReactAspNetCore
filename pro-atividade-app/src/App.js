import './App.css';

function App() {
  const atividade = [
    {
      "id": 1,
      "descricao": "Primeira Atividade"
    }
  ]


  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>{atividade[0].id} {atividade[0].descricao}</li>
          <li onClick={() => console.log('JSX')}>Segunda Atividade</li>
          <li>Terceira Atividade</li>
          <li>Quarta Atividade</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
