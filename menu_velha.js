window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (event) => {
  const mensagem = document.getElementById("mensagem");
  const opcoes = document.getElementById("options");

  const mensagemVisivel = getComputedStyle(mensagem).display !== "none";

  if (event.code === "Space" && mensagemVisivel) {
    mensagem.style.display = "none";
    opcoes.classList.remove("escondido");
    opcoes.classList.add("animar-aparecer");
  }
});
});
function criarElementoVoador() {
  const fundo = document.getElementById("fundo-animado");

  const simbolos = ["✖", "〇", "△",];
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
setInterval(criarElementoVoador, 130);

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
  const todosOsPaineis = document.querySelectorAll(".painel");
  todosOsPaineis.forEach(painel => painel.classList.add("oculto"));

  // Volta para o menu principal
  options.classList.remove("escondido");

  // Volta a logo para o centro
  const logo = document.getElementById("Uttt-logo");
  logo.classList.remove("logo-topo");

  options.classList.remove("escondido");
}

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
  somClick.currentTime = 0;
  somClick.play();

  botaoOpcoes.classList.add("tremendo");

  setTimeout(() => {
    botaoOpcoes.classList.remove("tremendo");
    options.classList.add("escondido");
    painelOpcoes.classList.remove("oculto");
  }, 300); // mesmo delay de 300ms
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

const botaoJogar = document.getElementById("btn-jogar");
const painelModos = document.getElementById("painel-modos");
const painelPadrao = document.getElementById("painel-padrao");
const painelJogo = document.getElementById("painel-jogo");
const vezTexto = document.getElementById("vez-texto");

document.getElementById("modo-padrao").addEventListener("click", () => {
  painelModos.classList.add('oculto');
  painelPadrao.classList.remove("oculto");
});

botaoJogar.addEventListener("click", () => {
  somClick.currentTime = 0;
  somClick.play();

  botaoJogar.classList.add('tremendo');

    setTimeout(() => {
    botaoJogar.classList.remove("tremendo");
    options.classList.add("escondido");
    painelModos.classList.remove("oculto");
      const logo = document.getElementById("Uttt-logo");
      logo.classList.add("logo-topo");
  }, 300);

});

document.getElementById("pvp").addEventListener("click", () => {
  painelPadrao.classList.add("oculto");
  painelJogo.classList.remove("oculto");

  const logo = document.getElementById("Uttt-logo");
  logo.classList.add("escondido")
  
  sortearPrimeiroJogador();
});

function sortearPrimeiroJogador() {
  const jogadorSorteado = Math.random() < 0.5 ? "X" : "O";
  localStorage.setItem("jogadorInicial", jogadorSorteado); // <-- salva quem começa

  const painelMoeda = document.getElementById("painel-moeda");
  const animacaoMoeda = document.getElementById("animacao-moeda");

  vezTexto.textContent = "";

  painelMoeda.classList.remove("oculto");
  animacaoMoeda.src = jogadorSorteado === "X" ? 
    "Banco de Imagens/X-moeda.gif" : 
    "Banco de Imagens/circulo-moeda.gif";

  animacaoMoeda.style.width = "330px";
  animacaoMoeda.style.height = "auto";

  setTimeout(() => {
    vezTexto.textContent = `Jogador ${jogadorSorteado === "X" ? "✖" : "〇"} começa!`;

    setTimeout(() => {
      // Redireciona para a página do jogo depois da animação
      window.location.href = "velha_jogo_padrao.html";
    }, 1000);
  }, 2000);
}

const painelConfigBot = document.getElementById('painel-config-bot');
const btnPvBot = document.getElementById('pvbot');
const botoesDificuldade = document.querySelectorAll('.botao-dificuldade');
const simbolos = document.querySelectorAll('.simbolo-escolha');
const btnConfirmarBot = document.getElementById('confirmar-config-bot');

let dificuldadeSelecionada = null;
let simboloSelecionado = null;

// Abrir painel de configuração quando clicar em "Player vs Bot"
btnPvBot.addEventListener('click', () => {
    fecharTodosOsPaineis(false);
    painelConfigBot.classList.remove('oculto');
    painelJogo.classList.remove('oculto');
});

// Seleção de dificuldade
botoesDificuldade.forEach(botao => {
    botao.addEventListener('click', () => {
        dificuldadeSelecionada = botao.dataset.dificuldade;

        botoesDificuldade.forEach(b => b.classList.remove('selecionado'));
        botao.classList.add('selecionado');
    });
});

// Seleção de símbolo
const etapaSimbolo = document.getElementById("etapa-simbolo");
const etapaDificuldade = document.getElementById("etapa-dificuldade");

simbolos.forEach(img => {
  img.addEventListener('click', () => {
    simboloSelecionado = img.dataset.simbolo;

    simbolos.forEach(i => i.classList.remove('selecionado'));
    img.classList.add('selecionado');

    // Passa para a próxima etapa
    etapaSimbolo.classList.add('oculto');
    etapaDificuldade.classList.remove('oculto');
  });
});


// Confirmar e iniciar o jogo com as configurações
btnConfirmarBot.addEventListener('click', () => {
    if (!dificuldadeSelecionada || !simboloSelecionado) {
        alert("Selecione a dificuldade e o símbolo!");
        return;
    }

    // Sorteio para decidir quem começa
    const jogadorComeca = Math.random() < 0.5 ? "player" : "bot";

    // Salvar no localStorage
    localStorage.setItem('dificuldade', dificuldadeSelecionada);
    localStorage.setItem('simboloPlayer', simboloSelecionado);
    localStorage.setItem('simboloBot', simboloSelecionado === 'X' ? 'O' : 'X');
    localStorage.setItem('quemComeca', jogadorComeca);

    // Redirecionar para a página do modo bot
    window.location.href = 'velha_jogo_bot.html';
});

function fecharTodosOsPaineis() {
  const paineis = document.querySelectorAll('.painel');
  paineis.forEach(painel => painel.classList.add('oculto'));
  options.classList.remove('escondido');
}

function fecharTodosOsPaineis(mostrarMenu = true) {
  const paineis = document.querySelectorAll(".painel");
  paineis.forEach(painel => painel.classList.add("oculto"));

  if (mostrarMenu) {
    options.classList.remove("escondido");
  } else {
    options.classList.add("escondido");
  }
}