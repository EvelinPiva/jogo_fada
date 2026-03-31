let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

let estadoJogo = 'menu'; // Começamos no menu
let selecaoMenu = 1;     // Indica qual botão está focado (0: Instruções, 1: Jogar)

let imgMenu = new Image();
imgMenu.src = './img/TELA_INICIAL.png';

// Áudio do Menu Inicial
let musicaInicio = new Audio('./sons/MUSIC_INICIO.mp3');
musicaInicio.loop = true;
musicaInicio.volume = 0.5;

// Áudio de Fundo
let musicaFundo = new Audio('./sons/music_fundo.mp3');
musicaFundo.loop = true; 
musicaFundo.volume = 0.5; // 0.5 é mais seguro, 1.0 pode estourar dependendo do arquivo

let somInseto = new Audio('./sons/som_inseto.mp3');
let somCoracao = new Audio('./sons/coracao_som.mp3');
let somPocao = new Audio('./sons/pocao_som.mp3');

// Obstáculos
let abelha1 = new Abelha(1300, 100, 50, 50, './img/abelha.png')
let abelha2 = new Abelha(1500, 300, 50, 50, './img/abelha.png')
let abelha3 = new Abelha(1700, 500, 50, 50, './img/abelha.png')

// Itens
let pocao = new Pocao(2000, 325, 40, 40, './img/pocao.png')
let coracao = new Coracao(2000, 325, 40, 40,'./img/coracao.png')

// Fadas
let fada = new Fada(200, 325, 120, 90, './img/fada1.png')
let fada2 = new Fada2(100, 225, 90, 90, './img/fada2_2.png')

// --- CONTROLES ATUALIZADOS (MENU + JOGO + INSTRUÇÕES) ---
document.addEventListener('keydown', (e) => {
    const tecla = e.key; // Usamos e.key puro para as setas (ArrowUp, etc)
    const t = tecla.toLowerCase(); // t para as letras (w, a, s, d)

    // 1. LÓGICA QUANDO ESTÁ NO MENU
   if (estadoJogo === 'menu') {
        if (tecla === 'ArrowUp') {
            // Se estiver no 0, vai para o 2. Se não, diminui 1.
            selecaoMenu = (selecaoMenu <= 0) ? 2 : selecaoMenu - 1;
        }
        if (tecla === 'ArrowDown') {
            // Se estiver no 2, vai para o 0. Se não, aumenta 1.
            selecaoMenu = (selecaoMenu >= 2) ? 0 : selecaoMenu + 1;
        }
        
      if (tecla === 'Enter') {
            if (selecaoMenu === 1) { // JOGAR
                estadoJogo = 'jogando';
                jogando = true;
                musicaInicio.pause();
                musicaInicio.currentTime = 0;
                musicaFundo.play().catch(e => console.log("Erro ao tocar música:", e));
            } else if (selecaoMenu === 0) { // INSTRUÇÕES
                estadoJogo = 'instrucoes';
            } else if (selecaoMenu === 2) { // DESENVOLVEDORA (Adicionado aqui!)
                estadoJogo = 'desenvolvedora';
            }
        
        
        }
    }
    
    // 2. LÓGICA PARA SAIR DAS INSTRUÇÕES
    else if (estadoJogo === 'instrucoes') {
        if (tecla === 'Enter' || tecla === 'Escape') {
            estadoJogo = 'menu';
        }
    }

    // 3. LÓGICA DURANTE O JOGO (MOVIMENTAÇÃO)
    else if (estadoJogo === 'jogando') {
        // Fada 1
        if (t === 'w') fada.dir = -9;
        if (t === 's') fada.dir = 9;
        if (t === 'a') fada.dir2 = -11;
        if (t === 'd') fada.dir2 = 11;

        // Fada 2
        if (tecla === 'ArrowUp') fada2.dir = -9;
        if (tecla === 'ArrowDown') fada2.dir = 9;
        if (tecla === 'ArrowLeft') fada2.dir2 = -11;
        if (tecla === 'ArrowRight') fada2.dir2 = 11;
        
        // Atalho para voltar ao menu
        if (tecla === 'Escape') {
            estadoJogo = 'menu';
            jogando = false;
            musicaFundo.pause();
        }
    }else if (estadoJogo === 'instrucoes' || estadoJogo === 'desenvolvedora') {
        if (tecla === 'Enter' || tecla === 'Escape') {
            estadoJogo = 'menu';
        }
    }
});

document.addEventListener('keyup', (e) => {
    const tecla = e.key;
    const t = tecla.toLowerCase();

    // Para fada 1
    if (t === 'w' || t === 's') fada.dir = 0;
    if (t === 'a' || t === 'd') fada.dir2 = 0;

    // Para fada 2
    if (tecla === 'ArrowUp' || tecla === 'ArrowDown') fada2.dir = 0;
    if (tecla === 'ArrowLeft' || tecla === 'ArrowRight') fada2.dir2 = 0;
});
function desenhaJanelaInstrucoes() {
    des.fillStyle = "rgba(0,0,0,0.85)";
    des.fillRect(150, 100, 900, 500);
    
    // Borda dourada
    des.strokeStyle = "gold"; 
    des.lineWidth = 5;
    des.strokeRect(150, 100, 900, 500);

    // Texto
    
    des.textAlign = "center";
   
    
    des.fillStyle = "white"; 
    des.font = "25px Arial";
    des.fillText("Fada 1: WASD | Fada 2: SETAS", 600, 300);
    des.fillText("Pressione ENTER para voltar", 600, 530);
    
    des.textAlign = "start"; // Importante resetar para não desalinhar o resto
}

function desenhaJanelaDesenvolvedora() {
    des.fillStyle = "rgba(0,0,0,0.85)";
    des.fillRect(200, 150, 800, 400);
    // borda rosa
    des.strokeStyle = "deeppink"; 
    des.lineWidth = 5;
    des.strokeRect(200, 150, 800, 400);

    des.fillStyle = "white";
    des.font = "bold 40px Arial";
    des.textAlign = "center";
    
    
    des.font = "25px Arial";
    des.fillText("Jogo desenvolvido por: Evelin Piva", canvas.width/2, 320);
    des.fillText("Projeto de Programação 2026", canvas.width/2, 370);
    
    des.fillStyle = "deeppink";
    des.fillText("Pressione ENTER para voltar", canvas.width/2, 500);
    des.textAlign = "start";
}

function desenhaTexto() {
    des.font = "30px JetBrains Mono";
    des.fillStyle = "green";
    des.fillText("💖: " + fada.vida, 40, 50);
    des.fillText("🏅: " + fada.pontos, 40, 90);
    des.fillText("FASE: " + fada.fase, 40, 130);

    if (fada.vida <= 0 || fada2.vida <= 0) {
        des.fillStyle = "rgba(0,0,0,0.7)";
        des.fillRect(0, 0, canvas.width, canvas.height);
        des.fillStyle = "orange";
        des.font = "80px JetBrains Mono";
        des.fillText("GAME OVER", 360, 350);
        des.font = "30px JetBrains Mono";
        des.fillStyle = "white";
        des.fillText("Pressione F5 para reiniciar", 430, 420);
    }else if(fada.pontos == 20){
        des.fillStyle = "rgba(0,0,0,0.7)";
        des.fillRect(0, 0, canvas.width, canvas.height);
        des.fillStyle = "orange";
        des.font = "80px JetBrains Mono";
        des.fillText("YOU WIN!", 360, 350);
    }
}

function desenha() {
    abelha1.desenhar()
    abelha2.desenhar()
    abelha3.desenhar()
    pocao.desenhar()
    coracao.desenhar()
    fada.desenhar()
    fada2.desenhar()
    desenhaTexto()
}

function atualiza() {
    fada.mover()
    fada2.mover()
    atualizaCenario()
    abelha1.mov_obs()
    abelha2.mov_obs()
    abelha3.mov_obs()
    pocao.mov_obs()
    coracao.mov_obs()
}

function colisao() {
    // 1. Insetos (Abelhas/Pernilongos)
    [abelha1, abelha2, abelha3].forEach(p => {
        if (fada.colid(p) || fada2.colid(p)) {
            somInseto.currentTime = 0; 
            somInseto.play().catch(e => console.log("Erro som inseto:", e));

            if (fada.colid(p)) { p.recomeca(); fada.vida--; }
            if (fada2.colid(p)) { p.recomeca(); fada2.vida--; }
        }
    }); 

    // 2. Coração
    if (fada.colid(coracao) || fada2.colid(coracao)) {
        somCoracao.currentTime = 0;
        somCoracao.play().catch(e => console.log("Erro som coracao:", e));

        if (fada.colid(coracao)) { fada.vida += 1; }
        if (fada2.colid(coracao)) { fada2.vida += 1; }
        coracao.recomeca();
    }

    // 3. Poção
    if (fada.colid(pocao) || fada2.colid(pocao)) {
        somPocao.currentTime = 0;
        somPocao.play().catch(e => console.log("Erro som pocao:", e));

        if (fada.colid(pocao)) { fada.pontos += 10; }
        if (fada2.colid(pocao)) { fada2.pontos += 10; }
        pocao.recomeca();
    }
} 

function game_over() {
    if (fada.vida <= 0 || fada2.vida <= 0) {
        jogando = false; // Mudado para parar o loop
        musicaFundo.pause();
    }
}

function atualizaCenario() {
    if (fada.fase == 2 || fada2.fase == 2) {
        canvas.style.backgroundImage = "url('./img/FUNDO_TARDE.png')";
        if (!abelha1.img.src.includes('pernilongo.png')) {
            abelha1.img.src = abelha2.img.src = abelha3.img.src = './img/pernilongo.png';
            abelha1.vel = abelha2.vel = abelha3.vel = 12;
        }
    }
    if (fada.fase == 3 || fada2.fase == 3) {
        canvas.style.backgroundImage = "url('./img/FUNDO_NOITE.jpg')";
        abelha1.vel = abelha2.vel = abelha3.vel = 16;
    }
}
// Toca a música do menu assim que o jogador interagir com o teclado
document.addEventListener('keydown', () => {
    if (estadoJogo === 'menu' && musicaInicio.paused) {
        musicaInicio.play().catch(e => console.log("Aguardando interação para tocar som..."));
    }
}, { once: false }); // Mantém verificando se está no menu

function desenhaVitoria() {
    // Fundo semi-transparente azulado/vitorioso
    des.fillStyle = "rgba(0, 50, 0, 0.7)";
    des.fillRect(0, 0, canvas.width, canvas.height);

    des.textAlign = "center";
    des.fillStyle = "gold";
    des.font = "80px JetBrains Mono";
    des.fillText("YOU WIN!", canvas.width / 2, 300);
    
    des.fillStyle = "white";
    des.font = "30px JetBrains Mono";
    des.fillText("As fadas salvaram o bosque!", canvas.width / 2, 380);
    des.fillText("Pontuação Final: " + (fada.pontos + fada2.pontos), canvas.width / 2, 430);
    
    des.font = "20px JetBrains Mono";
    des.fillText("Pressione F5 para jogar novamente", canvas.width / 2, 550);
    des.textAlign = "start";
}

function main() {
    des.clearRect(0, 0, canvas.width, canvas.height);

    if (estadoJogo === 'jogando') {
        // Movimentação e Lógica
        fada.mover(); 
        fada2.mover();
        abelha1.mov_obs(); abelha2.mov_obs(); abelha3.mov_obs();
        pocao.mov_obs(); coracao.mov_obs();
        colisao();
        atualizaCenario();

        // Desenho
        abelha1.desenhar(); abelha2.desenhar(); abelha3.desenhar();
        pocao.desenhar(); coracao.desenhar(); 
        fada.desenhar(); fada2.desenhar();
        desenhaTexto();

        // Checa Game Over Único
        if (fada.vida <= 0 || fada2.vida <= 0) {
            estadoJogo = 'menu';
            jogando = false;
            musicaFundo.pause();
            musicaFundo.currentTime = 0;
            musicaInicio.play().catch(e => {}); // Tenta voltar a música do menu
            fada.vida = 5; 
            fada2.vida = 5;
        }
    } 
    else if (estadoJogo === 'menu') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
        des.strokeStyle = "gold";
        des.lineWidth = 5;
        let posY = 197 + (selecaoMenu * 125); 
        des.strokeRect(410, posY, 380, 80);
    } 
    else if (estadoJogo === 'instrucoes') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
        desenhaJanelaInstrucoes();
    }
    else if (estadoJogo === 'desenvolvedora') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
        desenhaJanelaDesenvolvedora();
    }

    requestAnimationFrame(main);
}

main();