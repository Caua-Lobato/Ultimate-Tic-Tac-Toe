const tabuleiro = document.getElementById("tabuleiro");
const celulas = document.querySelectorAll(".celula");
const vezTexto = document.getElementById("vez-texto");
const btnReiniciar = document.getElementById("btn-reiniciar");
const painelMoeda = document.getElementById("painel-moeda");
const animacaoMoeda = document.getElementById("animacao-moeda");
const musicaVitoria = document.getElementById("audio-vitoria");

window.addEventListener("DOMContentLoaded", () => {
  tabuleiro.classList.add("animar-cair");
});

document.body.classList.add("modo-jogo");

const musicaFundo = new Audio("Banco de Soms/fundo_padrao.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 0.5;
musicaFundo.play();

let musicaAtiva = true;

let vezAtual = localStorage.getItem("jogadorInicial") || "X";
let turnoX = vezAtual === "X"; // quem começa de verdade

function criarElementoVoador() {
  const fundo = document.getElementById("fundo-animado");
  const simbolo = turnoX ? "✖" : "〇";

  const elemento = document.createElement("div");
  elemento.classList.add("elemento-voador");
  elemento.textContent = simbolo;

  const left = Math.random() * window.innerWidth; 
  elemento.style.left = `${left}px`;
  elemento.style.bottom = `0px`;

  fundo.appendChild(elemento);

  setTimeout(() => {
    fundo.removeChild(elemento);
  }, 2500);
}

setInterval(criarElementoVoador, 130);

atualizarFundo();

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
  for (let i = 0; i < 3; i++) {
    if (estado[i].every(celula => celula === simbolo)) return true;
  }

  for (let j = 0; j < 3; j++) {
    if (estado[0][j] === simbolo && estado[1][j] === simbolo && estado[2][j] === simbolo) {
      return true;
    }
  }

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
        vezTexto.classList.add("vitoria");

        const fadeOut = setInterval(() => {
          if (musicaFundo.volume > 0.0005) {
            musicaFundo.volume -= 0.0001;
          } else {
            musicaFundo.volume = 0.0005;
            clearInterval(fadeOut);
          }
        }, 50);

        musicaVitoria.currentTime = 0;
        musicaVitoria.volume = 0.2;
        musicaVitoria.play();

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
        }, 850);
        return;
      }

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

function mudarTurno(novoTurno) {
  const body = document.body;
  body.classList.remove('turno-x', 'turno-o');
  body.classList.add(novoTurno);
}

function reiniciarComSorteio() {
  const jogadorSorteado = Math.random() < 0.5 ? "X" : "O";
  localStorage.setItem("jogadorInicial", jogadorSorteado);
  vezTexto.textContent = "";
  painelMoeda.classList.remove("oculto");

  animacaoMoeda.src = jogadorSorteado === "X"
    ? "Banco de Imagens/X-moeda.gif"
    : "Banco de Imagens/circulo-moeda.gif";

  animacaoMoeda.style.width = "330px";
  animacaoMoeda.style.height = "auto";

  setTimeout(() => {
    vezTexto.textContent = `Jogador ${jogadorSorteado === "X" ? "✖" : "〇"} começa!`;

    setTimeout(() => {
      painelMoeda.classList.add("oculto");
      reiniciarJogo(jogadorSorteado);
    }, 1000);
  }, 2000);
}

function reiniciarJogo(jogadorInicial) {
  estado = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  celulas.forEach(celula => {
    celula.textContent = "";
    celula.style.pointerEvents = "auto";
    celula.classList.remove("vencedor");
  });

  document.body.classList.remove("turno-x", "turno-o", "empate");
  vezTexto.classList.remove("vitoria");
  vezTexto.style.animation = "none";

  vezAtual = jogadorInicial;
  turnoX = jogadorInicial === "X";
  atualizarFundo();
}

btnReiniciar.addEventListener("click", reiniciarComSorteio);

atualizarFundo();

botoes.forEach(botao => {
  botao.addEventListener("mouseenter", () => {
    const somHover = new Audio("Banco de Soms/selecionar.mp3");
    somHover.volume = 0.2;
    somHover.play();
  });

  botao.addEventListener("click", () => {
    const somClick = new Audio("Banco de Soms/confirmar.mp3");
    somClick.volume = 0.2;
    somClick.play();
  });
});