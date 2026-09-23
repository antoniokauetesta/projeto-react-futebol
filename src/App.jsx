import { useState } from "react";
import "./App.css";

const jogadoresFutebol = [
  { id: 1, nome: "Vinícius Júnior", time: "Real Madrid", posicao: "Atacante", votos: 0 },
  { id: 2, nome: "Erling Haaland", time: "Manchester City", posicao: "Centroavante", votos: 0 },
  { id: 3, nome: "Lional Messi", time: "Inter Miami", posicao: "Meia atacante", votos: 0 },
  { id: 4, nome: "Kylian Mbappé", time: "Real Madrid", posicao: "Atacante", votos: 0 }
];

function App() {
  const [jogadores, setJogadores] = useState(jogadoresFutebol);

  function votar(id) {
    setJogadores((jogadoresAtuais) =>
      jogadoresAtuais.map((jogador) =>
        jogador.id === id ? { ...jogador, votos: jogador.votos + 1 } : jogador
      )
    );
  }

  const totalVotos = jogadores.reduce((soma, jogador) => soma + jogador.votos, 0);
  const maiorVoto = Math.max(...jogadores.map((jogador) => jogador.votos));
  const lider = jogadores.find(
    (jogador) => jogador.votos === maiorVoto && jogador.votos > 0
  );

  return (
    <div className="app-shell">
      <header className="cabecalho">
        <p className="eyebrow">Liga dos Craques</p>
        <h1>Quem merece ser o destaque da temporada?</h1>
        <p className="subtitulo">
          Vote no jogador que mais impressiona com talento, ritmo e presença em campo.
        </p>
      </header>

      <div className="painel-estatisticas">
        <div className="estatistica">
          <span className="label">Total de votos</span>
          <strong>{totalVotos}</strong>
        </div>
        <div className="estatistica">
          <span className="label">Líder atual</span>
          <strong>{lider ? lider.nome : "Sem votos"}</strong>
        </div>
      </div>

      <ul className="lista-jogadores">
        {jogadores.map((jogador) => {
          const estaEmLideranca = jogador.votos === maiorVoto && jogador.votos > 0;

          return (
            <li
              key={jogador.id}
              className={`jogador-item ${estaEmLideranca ? "lider" : ""}`}
            >
              <div className="jogador-header">
                <span className="time-badge">{jogador.time}</span>
                {estaEmLideranca && <span className="status-lider">Líder</span>}
              </div>

              <div className="jogador-main">
                <div className="jogador-info">
                  <span className="numero-jogador">#{jogador.id}</span>
                  <h2>{jogador.nome}</h2>
                  <p>{jogador.posicao}</p>
                </div>

                <div className="jogador-votos">
                  <span className="valor-votos">{jogador.votos}</span>
                  <small>votos</small>
                </div>
              </div>

              <button className="botao-votar" onClick={() => votar(jogador.id)}>
                Votar agora
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;