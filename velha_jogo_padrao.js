const tabuleiro = document.getElementById("tabuleiro");
const celulas = document.querySelectorAll(".celula");
const vezTexto = document.getElementById("vez-texto");

window.addEventListener("DOMContentLoaded", () => {
  tabuleiro.classList.add("animar-cair");
});

document.body.classList.add("modo-jogo");

const musicaFundo = new Audio("Banco de Soms/fundo_padrao.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 0.5;
musicaFundo.play();

let musicaAtiva = true;

const jogadorInicial = localStorage.getItem("jogadorInicial") || "X";
let turnoX = jogadorInicial === "X"; // quem começa de verdade

function criarElementoVoador() {
  const fundo = document.getElementById("fundo-animado");
  const simbolo = turnoX ? "✖" : "〇";

  const elemento = document.createElement("div");
  elemento.classList.add("elemento-voador");
  elemento.textContent = simbolo;

  // Posição inicial aleatória horizontalmente, e bottom perto de zero (no fundo)
  const left = Math.random() * window.innerWidth; 
  elemento.style.left = `${left}px`;
  elemento.style.bottom = `0px`; // começa exatamente no fundo

  fundo.appendChild(elemento);

  setTimeout(() => {
    fundo.removeChild(elemento);
  }, 2500); // tempo da animação
}

// Criar novos elementos voadores a cada 130ms (ajuste se quiser mais ou menos)
setInterval(criarElementoVoador, 130);


atualizarFundo(); // aplica a cor certa e mostra o texto de turno

// Cria a matriz do estado
let estado = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function atualizarFundo() {
  if (turnoX) {
    document.body.classList.remove("turno-o");
    document.body.classList.add("turno-x");
    vezTexto.textContent = "Jogador ✖ agora!";
  } else {
    document.body.classList.remove("turno-x");
    document.body.classList.add("turno-o");
    vezTexto.textContent = "Jogador 〇 agora!";
  }
}

function verificarVitoria(simbolo) {
  // Linhas
  for (let i = 0; i < 3; i++) {
    if (estado[i].every(celula => celula === simbolo)) return true;
  }

  // Colunas
  for (let j = 0; j < 3; j++) {
    if (estado[0][j] === simbolo && estado[1][j] === simbolo && estado[2][j] === simbolo) {
      return true;
    }
  }

  // Diagonais
  if (
    (estado[0][0] === simbolo && estado[1][1] === simbolo && estado[2][2] === simbolo) ||
    (estado[0][2] === simbolo && estado[1][1] === simbolo && estado[2][0] === simbolo)
  ) {
    return true;
  }

  return false;
}

celulas.forEach((celula, index) => {
  celula.addEventListener("click", () => {
    const linha = Math.floor(index / 3);
    const coluna = index % 3;

    if (estado[linha][coluna] === "") {
      const simbolo = turnoX ? "✖" : "〇";
      estado[linha][coluna] = simbolo;
      celula.textContent = simbolo;

      if (verificarVitoria(simbolo)) {
        vezTexto.textContent = `Jogador ${simbolo} venceu!`;
        vezTexto.classList.add("vitoria"); // aplica estilo animado

        // Toca o som de vitória
        const musicaVitoria = document.getElementById("audio-vitoria");

        // Reduz o volume da música de fundo suavemente
        const fadeOut = setInterval(() => {
          if (musicaFundo.volume > 0.0005) {
            musicaFundo.volume -= 0.0001;
          } else {
            musicaFundo.volume = 0.0005;
            clearInterval(fadeOut);
          }
        }, 50);

        // Toca a música de vitória
        musicaVitoria.currentTime = 0;
        musicaVitoria.volume = 0.2;
        musicaVitoria.play();

        // Quando a música de vitória terminar, volta o volume ao normal
        musicaVitoria.onended = () => {
          if (!musicaAtiva) return;
          
          const fadeIn = setInterval(() => {
            if (musicaFundo.volume < 0.5) {
              musicaFundo.volume += 0.01;
            } else {
              musicaFundo.volume = 0.5;
              clearInterval(fadeIn);
            }
          }, 50);
        };


        celulas.forEach(c => c.style.pointerEvents = "none");

      setTimeout(() => {
          vezTexto.style.animation = "pulsarTexto 2.1s ease-in-out infinite";
        }, 850); // espera o tempo da rotação
        return;
      }

      // Verifica empate
      const empate = estado.flat().every(c => c !== "");
      if (empate) {
        vezTexto.textContent = "Empate!";
        document.body.classList.remove("turno-x", "turno-o");
        document.body.classList.add("empate");
        return;
      }

      turnoX = !turnoX;
      atualizarFundo();
    }
  });
});

atualizarFundo();

function mudarTurno(novoTurno) {
  const body = document.body;
  body.classList.remove('turno-x', 'turno-o');
  body.classList.add(novoTurno);
}
