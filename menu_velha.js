window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      const mensagem = document.getElementById("mensagem");
      const opcoes = document.getElementById("options");

      mensagem.style.display = "none";
      opcoes.classList.remove("escondido");
      opcoes.classList.add("animar-aparecer");
    }
  });
});
function criarElementoVoador() {
  const fundo = document.getElementById("fundo-animado");

  const simbolos = ["✖", "〇", "△"];
  const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];

  const elemento = document.createElement("div");
  elemento.classList.add("elemento-voador");
  elemento.textContent = simbolo;

  // Posição inicial aleatória próxima do canto inferior esquerdo
  const left = Math.random() * 800; // até 100px da esquerda
  const bottom = Math.random() * 800; // até 100px do fundo
  elemento.style.left = `${left}px`;
  elemento.style.bottom = `${bottom}px`;

  fundo.appendChild(elemento);

  // Remover o elemento depois que a animação terminar
  setTimeout(() => {
    fundo.removeChild(elemento);
  }, 2500); // mesma duração da animação
}

// Criar novos elementos a cada 300ms
setInterval(criarElementoVoador, 150);

const botoes = document.querySelectorAll("button");

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

        // Aplica o efeito de tremor
    botao.classList.add("tremendo");

    // Remove a classe após a animação acabar
    setTimeout(() => {
      botao.classList.remove("tremendo");
    }, 200); // mesma duração da animação

  });
});
const musicaFundo = document.getElementById("musica-fundo");

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (musicaFundo.paused) {
      musicaFundo.volume = 0.9;
      musicaFundo.play().catch(err => {
        console.log("Erro ao tocar música:", err);
      });
    }
  }
});

const botaoSobre = document.getElementById("btn-sobre");
const painelSobre = document.getElementById("painel-sobre");
const botaoCreditos = document.getElementById("btn-creditos");
const painelCreditos = document.getElementById("painel-creditos");
const options = document.getElementById("options");

botaoSobre.addEventListener("click", () => {
  options.classList.add("escondido");
  painelSobre.classList.remove("oculto");
});

botaoCreditos.addEventListener("click", () => {
  options.classList.add("escondido");
  painelCreditos.classList.remove("oculto");
});

function fecharPainel() {  
  painelSobre.classList.add("oculto");
  painelCreditos.classList.add("oculto");
  options.classList.remove("escondido");
}