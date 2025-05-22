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
    }, 300); // mesma duração da animação

  });
});
const musicaFundo = document.getElementById("musica-fundo");

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (musicaFundo.paused) {
      musicaFundo.volume = parseFloat(seletorVolumeMusica.value);
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
  const somClick = new Audio("Banco de Soms/confirmar.mp3");
  somClick.volume = 0.2;
  somClick.play();

  botaoSobre.classList.add("tremendo");

  setTimeout(() => {
    botaoSobre.classList.remove("tremendo");
    options.classList.add("escondido");
    painelSobre.classList.remove("oculto");
  }, 300); // Delay para dar tempo da animação
});

botaoCreditos.addEventListener("click", () => {
  const somClick = new Audio("Banco de Soms/confirmar.mp3");
  somClick.volume = 0.2;
  somClick.play();

  botaoCreditos.classList.add("tremendo");

  setTimeout(() => {
    botaoCreditos.classList.remove("tremendo");
    options.classList.add("escondido");
    painelCreditos.classList.remove("oculto");
  }, 300); // Delay para dar tempo da animação
});

function fecharPainel() {  
  painelSobre.classList.add("oculto");
  painelCreditos.classList.add("oculto");
  options.classList.remove("escondido");
  painelOpcoes.classList.add("oculto");
};

/* area do menu de opcoes*/
const painelOpcoes = document.getElementById("painel-opcoes");
const botaoOpcoes = document.getElementById("btn-opcoes");
const seletorVolume = document.getElementById("volume-som");
const seletorIdioma = document.getElementById("selecionar-idioma");

let volumeSom = 0.8;

const seletorVolumeMusica = document.getElementById("volume-musica");

seletorVolumeMusica.addEventListener("input", () => {
  musicaFundo.volume = parseFloat(seletorVolumeMusica.value);
});

botaoOpcoes.addEventListener("click", () => {
  options.classList.add("escondido");
  painelOpcoes.classList.remove("oculto");
});

seletorVolume.addEventListener("input", () => {
  volumeSom = parseFloat(seletorVolume.value);
});

// Criar os sons uma única vez
const somHover = new Audio("Banco de Soms/seleciona.mp3");
const somClick = new Audio("Banco de Soms/confirmar.mp3");

// Atualiza o volume dos efeitos
seletorVolume.addEventListener("input", () => {
  volumeSom = parseFloat(seletorVolume.value);
  somHover.volume = volumeSom;
  somClick.volume = volumeSom;
});

// Configurar eventos com reuso dos mesmos objetos de som
botoes.forEach(botao => {
  botao.addEventListener("mouseenter", () => {
    somHover.currentTime = 0; // reinicia o som
    somHover.play();
  });

  botao.addEventListener("click", () => {
    somClick.currentTime = 0;
    somClick.play();

    botao.classList.add("tremendo");
    setTimeout(() => {
      botao.classList.remove("tremendo");
    }, 300);
  });
});
