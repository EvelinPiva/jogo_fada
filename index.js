let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

let jogar = true; // Controle de estado do jogo

// Obstáculos
let abelha1 = new Abelha(1300, 100, 50, 50, './abelha.png')
let abelha2 = new Abelha(1500, 300, 50, 50, './abelha.png')
let abelha3 = new Abelha(1700, 500, 50, 50, './abelha.png')

// Itens
let pocao = new Pocao(2000, 325, 40, 40, './pocao.png')

// Vida
let coracao = new Coracao(2000, 325, 40, 40,'./coracao.png')

// Fada
let fada = new Fada(200, 325, 120, 90, './fada1.png')

// CONTROLES
document.addEventListener('keydown', (e) => {
    let tecla = e.key.toLowerCase();
    if (tecla === 'w') fada.dir = -9
    if (tecla === 's') fada.dir = 9
    if (tecla === 'a') fada.dir2 = -11
    if (tecla === 'd') fada.dir2 = 11
})

document.addEventListener('keyup', (e) => {
    let tecla = e.key.toLowerCase();
    if (tecla === 'w' || tecla === 's') fada.dir = 0
    if (tecla === 'a' || tecla === 'd') fada.dir2 = 0
})

function desenhaTexto() {
    des.font = "30px JetBrains Mono";
    des.fillStyle = "green";
    des.fillText("💖: " + fada.vida, 40, 50);
    des.fillText("🏅: " + fada.pontos, 40, 90);
    des.fillText("FASE: " + fada.fase, 40, 130);

    if (!jogar) {
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
    desenhaTexto()
}

function atualiza() {
    fada.mover()

    //  CONTROLE DE FASE 
    if (fada.fase == 2) {
        abelha1.vel = 12
        abelha2.vel = 12
        abelha3.vel = 12
    }

    if (fada.fase == 3) {
        abelha1.vel = 16
        abelha2.vel = 16
        abelha3.vel = 16
    }

    abelha1.mov_obs()
    abelha2.mov_obs()
    abelha3.mov_obs()
    pocao.mov_obs()
    coracao.mov_obs()
}

function colisao() {
    // Colisão Abelhas (Perde Vida)
    [abelha1, abelha2, abelha3].forEach(p => {
        if (fada.colid(p)) {
            p.recomeca()
            fada.vida -= 1
        }
    });

   // 2. Colisão Corações (Ganha Vida)
   [coracao].forEach(p => {
    if (fada.colid(p)) {
        p.recomeca()
        fada.vida += 1 
    }
});

// 3. Colisão Poções (Ganha PONTOS ao coletar)
[pocao].forEach(p => {
    if (fada.colid(p)) {
        p.recomeca()
        fada.pontos += 10 // Quantidade de pontos por poção
    }
});
}

function pontuacao() {
    // Vazia ou removida, pois o ponto agora é na colisão com a poção

}

function game_over() {
    if (fada.vida <= 0) {
        jogar = false
    }
}

function main() {
    if (jogar) {
        des.clearRect(0, 0, canvas.width, canvas.height)
        desenha()
        atualiza()
        colisao()
        pontuacao()
        game_over()
        requestAnimationFrame(main)
    } else {
        desenha() // Desenha o texto de Game Over uma última vez
    }
}

main()