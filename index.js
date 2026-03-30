let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// --- AJUSTE AQUI: Variável única e começando em FALSE para o Enter funcionar ---
let jogando = false; 

// Áudio de Fundo
let musicaFundo = new Audio('./music_fundo.mp3');
musicaFundo.loop = true; 
musicaFundo.volume = 0.5; // 0.5 é mais seguro, 1.0 pode estourar dependendo do arquivo

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

// --- CONTROLES CORRIGIDOS ---
document.addEventListener('keydown', (e) => {
    let tecla = e.key.toLowerCase();

    // Se apertar Enter e o jogo estiver parado, começa o jogo e o som
    if (tecla === 'enter' && !jogando) {
        jogando = true;
        musicaFundo.play().catch(err => console.log("Erro ao tocar som:", err));
    }

    if (jogando) {
        // Fada 1
        if (tecla === 'w') fada.dir = -9
        if (tecla === 's') fada.dir = 9
        if (tecla === 'a') fada.dir2 = -11
        if (tecla === 'd') fada.dir2 = 11

        // Fada 2
        if (tecla === 'arrowup') fada2.dir = -9
        if (tecla === 'arrowdown') fada2.dir = 9
        if (tecla === 'arrowleft') fada2.dir2 = -11
        if (tecla === 'arrowright') fada2.dir2 = 11
    }
})

document.addEventListener('keyup', (e) => {
    let tecla = e.key.toLowerCase();
    if (tecla === 'w' || tecla === 's') fada.dir = 0
    if (tecla === 'a' || tecla === 'd') fada.dir2 = 0
    if (tecla === 'arrowup' || tecla === 'arrowdown') fada2.dir = 0
    if (tecla === 'arrowleft' || tecla === 'arrowright') fada2.dir2 = 0
})

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
    [abelha1, abelha2, abelha3].forEach(p => {
        if (fada.colid(p)) { p.recomeca(); fada.vida -= 1; }
        if (fada2.colid(p)) { p.recomeca(); fada2.vida -= 1; }
    });
    [coracao].forEach(p => {
        if (fada.colid(p)) { p.recomeca(); fada.vida += 1; }
        if (fada2.colid(p)) { p.recomeca(); fada2.vida += 1; }
    });
    [pocao].forEach(p => {
        if (fada.colid(p)) { p.recomeca(); fada.pontos += 10; }
        if (fada2.colid(p)) { p.recomeca(); fada2.pontos += 10; }
    });
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

function main() {
    des.clearRect(0, 0, canvas.width, canvas.height);
    if (jogando) {
        desenha();
        atualiza();
        colisao();
        game_over();
        atualizaCenario();
    } else {
        // Tela de início
        des.fillStyle = "gold";
        des.font = "50px JetBrains Mono";
        des.fillText("PIVA FAIRIES", 420, 300);
        des.fillStyle = "white";
        des.font = "20px JetBrains Mono";
        des.fillText("Pressione ENTER para começar", 440, 350);
        
        // Se for Game Over (vidas zeradas), desenha a fada morta no fundo
        if (fada.vida <= 0 || fada2.vida <= 0) {
            desenha(); 
        }
    }
    requestAnimationFrame(main);
}

main();