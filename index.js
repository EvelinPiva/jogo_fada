let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// --- ESTADO DO JOGO ---
let estadoJogo = 'jogando'
let jogando = false

// --- IMAGENS ---
let imgMenu = new Image()
imgMenu.src = './img/TELA_INICIAL.png'
let fundo = new Image()
fundo.src = './img/FUNDO_MANHA.jpeg'

// --- ÁUDIOS ---
let musicaFundo = new Audio('./sons/music_fundo.mp3')
musicaFundo.loop = true
musicaFundo.volume = 1

let somInseto = new Audio('./sons/som_inseto.mp3')
let somCoracao = new Audio('./sons/coracao_som.mp3')
let somPocao = new Audio('./sons/pocao_som.mp3')

// --- OBSTÁCULOS ---
let abelha1 = new Abelha(1300, 100, 50, 50, './img/abelha.png')
let abelha2 = new Abelha(1500, 300, 50, 50, './img/abelha.png')
let abelha3 = new Abelha(1700, 500, 50, 50, './img/abelha.png')
let abelha4 = new Abelha(1700, 500, 50, 50, './img/abelha.png')
let abelha5 = new Abelha(1700, 500, 50, 50, './img/abelha.png')

// --- ITENS ---
let pocao = new Pocao(2000, 325, 40, 40, './img/pocao.png')

let coracao = new Coracao(2000, 325, 40, 40, './img/coracao.png')
let coracao2 = new Coracao(2000, 300, 40, 40, './img/coracao.png')

// --- PERSONAGENS ---
let fada = new Fada(200, 325, 120, 90, './img/fada1.png')
let fada2 = new Fada2(100, 225, 90, 90, './img/fada2_2.png')


// --- EVENTOS ---
document.addEventListener('keydown', teclaPressionada)
document.addEventListener('keyup', teclaSolta)

// --- FUNÇÕES DE CONTROLE ---
function teclaPressionada(e) {
    const tecla = e.key
    const t = tecla.toLowerCase()

    // DESTRAVAR ÁUDIO: Tenta tocar na primeira tecla pressionada
    if (musicaFundo.paused) {
        musicaFundo.play().catch(err => console.log("Aguardando interação para áudio..."));
    }

    if (estadoJogo === 'jogando') {
        controleFada(tecla, t)
    }
}

function teclaSolta(e) {
    const tecla = e.key
    const t = tecla.toLowerCase()
    if (t === 'w' || t === 's') fada.dir = 0
    if (t === 'a' || t === 'd') fada.dir2 = 0
    if (tecla === 'ArrowUp' || tecla === 'ArrowDown') fada2.dir = 0
    if (tecla === 'ArrowLeft' || tecla === 'ArrowRight') fada2.dir2 = 0
}

function controleFada(tecla, t) {
    if (t === 'w') fada.dir = -9
    if (t === 's') fada.dir = 9
    if (t === 'a') fada.dir2 = -11
    if (t === 'd') fada.dir2 = 11
    if (tecla === 'ArrowUp') fada2.dir = -9
    if (tecla === 'ArrowDown') fada2.dir = 9
    if (tecla === 'ArrowLeft') fada2.dir2 = -11
    if (tecla === 'ArrowRight') fada2.dir2 = 11

}

// --- LÓGICA ---
function game_over() {
    if (fada.vida <= 0 || fada2.vida <= 0) {
        jogando = false
        estadoJogo = 'gameover'
        musicaFundo.pause()
        musicaFundo.currentTime = 0
    }
}
function ver_fase() {
    // FADA 1
    if (fada.pontos >= 90) {
        fada.fase = 3
    } else if (fada.pontos >= 40) {
        fada.fase = 2
    } else {
        fada.fase = 1
    }

    // FADA 2
    if (fada2.pontos >= 90) {
        fada2.fase = 3
    } else if (fada2.pontos >= 40) {
        fada2.fase = 2
    } else {
        fada2.fase = 1
    }
}

function atualizaCenario() {
    if (fada.fase === 2 || fada2.fase === 2) {
        fundo.src = './img/FUNDO_TARDE.png'

        abelha1.img.src = './img/pernilongo.png'
        abelha2.img.src = './img/pernilongo.png'
        abelha3.img.src = './img/pernilongo.png'
        abelha4.img.src = './img/pernilongo.png'
        abelha5.img.src = './img/pernilongo.png'

        abelha1.vel = abelha2.vel = abelha3.vel = abelha4.vel = abelha5.vel = 12
    }

    if (fada.fase === 3 || fada2.fase === 3) {
        fundo.src = './img/FUNDO_NOITE3.png'

        abelha1.img.src = './img/insetaoATT.png'
        abelha2.img.src = './img/insetaoATT.png'
        abelha3.img.src = './img/insetaoATT.png'
        abelha4.img.src = './img/insetaoATT.png'
        abelha5.img.src = './img/insetaoATT.png'

        abelha1.vel = abelha2.vel = abelha3.vel = abelha4.vel = abelha5.vel = 16
    }
}

function colisao() {

    // --- ABELHAS (DANO) ---
    if (fada.colid(abelha1)) { somInseto.play(); abelha1.recomeca(); fada.vida-- }
    if (fada.colid(abelha2)) { somInseto.play(); abelha2.recomeca(); fada.vida-- }
    if (fada.colid(abelha3)) { somInseto.play(); abelha3.recomeca(); fada.vida-- }
    if (fada.colid(abelha4)) { somInseto.play(); abelha4.recomeca(); fada.vida-- }
    if (fada.colid(abelha5)) { somInseto.play(); abelha5.recomeca(); fada.vida-- }

    if (fada2.colid(abelha1)) { somInseto.play(); abelha1.recomeca(); fada2.vida-- }
    if (fada2.colid(abelha2)) { somInseto.play(); abelha2.recomeca(); fada2.vida-- }
    if (fada2.colid(abelha3)) { somInseto.play(); abelha3.recomeca(); fada2.vida-- }
    if (fada2.colid(abelha4)) { somInseto.play(); abelha4.recomeca(); fada2.vida-- }
    if (fada2.colid(abelha5)) { somInseto.play(); abelha5.recomeca(); fada2.vida-- }

    // --- CORAÇÕES (VIDA) ---
    if (fada.colid(coracao)) { somCoracao.play(); coracao.recomeca(); fada.vida++ }
    if (fada.colid(coracao2)) { somCoracao.play(); coracao2.recomeca(); fada.vida++ }

    if (fada2.colid(coracao)) { somCoracao.play(); coracao.recomeca(); fada2.vida++ }
    if (fada2.colid(coracao2)) { somCoracao.play(); coracao2.recomeca(); fada2.vida++ }

    // --- POÇÃO (PONTOS) ---
    if (fada.colid(pocao)) { somPocao.play(); pocao.recomeca(); fada.pontos += 10 }
    if (fada2.colid(pocao)) { somPocao.play(); pocao.recomeca(); fada2.pontos += 10 }
}
// --- DESENHA ---
function desenha() {
    des.drawImage(fundo, 0, 0, canvas.width, canvas.height)
    if (estadoJogo === 'jogando') {
        abelha1.desenhar()
        abelha2.desenhar()
        abelha3.desenhar()
        abelha4.desenhar()
        abelha5.desenhar()
        pocao.desenhar()

        coracao.desenhar()
        coracao2.desenhar()

        fada.desenhar()
        fada2.desenhar()
        // CAIXA FADA 1
        let y = 30
        des.fillStyle = "rgb(198, 242, 158)"
        des.fillRect(y - 10, 20, 150, 70)
        des.beginPath()
        des.strokeStyle = "red"
        des.strokeRect(y - 10, 20, 150, 70)

        des.font = '20px JetBrains Mono'
        des.fillStyle = 'red'
        des.fillText('❤ VIDA: ' + fada.vida, y, 45)
        des.fillText('★ PONTOS: ' + fada.pontos, y, 65)
        des.fillText('🎮 FASE: ' + fada.fase, y, 85)

        // CAIXA FADA 2
        let x = 1070
        des.fillStyle = "rgb(198, 242, 158)"
        des.fillRect(x - 10, 20, 150, 70)
        des.beginPath()
        des.strokeStyle = "blue"
        des.strokeRect(x - 10, 20, 150, 70)

        des.fillStyle = 'blue'
        des.fillText('❤ VIDA: ' + fada2.vida, x, 45)
        des.fillText('★ PONTOS: ' + fada2.pontos, x, 65)
        des.fillText('🎮 FASE: ' + fada2.fase, x, 85)
        
    } else if (estadoJogo === 'vitoria') {
        des.fillStyle = 'rgba(0, 50, 0, 0.7)'
        des.fillRect(0, 0, canvas.width, canvas.height)
        des.textAlign = 'center'
        des.fillStyle = 'gold'
        des.font = '80px JetBrains Mono'
        des.fillText('YOU WIN!', canvas.width / 2, 300)
        des.fillStyle = 'white'
        des.font = '30px JetBrains Mono'
        des.fillText('A fada laranja venceu!', canvas.width / 2, 380)
        des.fillText('Pontuação Final: ' + (fada.pontos + fada2.pontos), canvas.width / 2, 400)
        des.fillText('Pontuação Fada Azul: ' + (fada2.pontos), canvas.width / 2, 430)
        des.fillText('Pontuação Fada Laranja: ' + (fada.pontos), canvas.width / 2, 460)
        des.fillText('Fada Azul ganhou com: ' + (fada2.vida) + ' vidas', canvas.width / 2, 490)
        des.fillText('Fada Laranja ganhou com: ' + (fada.vida) + ' vidas', canvas.width / 2, 520)
        des.font = '20px JetBrains Mono'
        des.fillText('Pressione F5 para jogar novamente', canvas.width / 2, 650)
        des.textAlign = 'start'

    } else if (estadoJogo === 'vitoria2') {
        des.fillStyle = 'rgba(0, 50, 0, 0.7)'
        des.fillRect(0, 0, canvas.width, canvas.height)
        des.textAlign = 'center'

        des.fillStyle = 'gold'
        des.font = '80px JetBrains Mono'
        des.fillText('YOU WIN!', canvas.width / 2, 300)
        des.fillStyle = 'white'
        des.font = '30px JetBrains Mono'
        des.fillText('A fada azul venceu!', canvas.width / 2, 380)
        des.fillText('Pontuação Final: ' + (fada.pontos + fada2.pontos), canvas.width / 2, 400)
        des.fillText('Pontuação Fada Azul: ' + (fada2.pontos), canvas.width / 2, 430)
        des.fillText('Pontuação Fada Laranja: ' + (fada.pontos), canvas.width / 2, 460)
        des.fillText('Fada Azul ganhou com: ' + (fada2.vida) + ' vidas', canvas.width / 2, 490)
        des.fillText('Fada Laranja ganhou com: ' + (fada.vida) + ' vidas', canvas.width / 2, 520)
        des.font = '20px JetBrains Mono'
        des.fillText('Pressione F5 para jogar novamente', canvas.width / 2, 650)
        des.textAlign = 'start'

    } else if (estadoJogo === 'gameover') {
        des.fillStyle = 'rgba(0, 0, 0, 0.85)'
        des.fillRect(0, 0, canvas.width, canvas.height)
        des.textAlign = 'center'
        des.fillStyle = 'red'
        des.font = '80px JetBrains Mono'
        des.fillText('GAME OVER', canvas.width / 2, 280)
        des.fillStyle = 'white'
        des.font = '30px JetBrains Mono'
        des.fillText('Pontuação Final: ' + (fada.pontos + fada2.pontos), canvas.width / 2, 320)
        des.fillText('Pontuação Fada Azul: ' + (fada2.pontos), canvas.width / 2, 430)
        des.fillText('Pontuação Fada Laranja: ' + (fada.pontos), canvas.width / 2, 400)
        
        des.fillText('Fada Azul perdeu com: ' + (fada2.vida) + ' vidas', canvas.width / 2, 460)
        des.fillText('Fada Laranja perdeu com: ' + (fada.vida) + ' vidas', canvas.width / 2, 490)
    
        des.font = '22px JetBrains Mono'
        des.fillStyle = 'gold'
        des.fillText('Pressione F5 para voltar ao menu', canvas.width / 2, 570)
        des.textAlign = 'start'
    }

}

function salvarTempo() {
    localStorage.setItem('tempoMusica', musicaFundo.currentTime);
}

function verificarVitoria() {
    if (fada.pontos === 130) estadoJogo = 'vitoria'
    if (fada2.pontos === 130) estadoJogo = 'vitoria2'
}

// --- ATUALIZA ---
function atualiza() {
    if (estadoJogo !== 'jogando') return

    fada.mover()
    fada2.mover()
    abelha1.mov_obs()
    abelha2.mov_obs()
    abelha3.mov_obs()
    abelha4.mov_obs()
    abelha5.mov_obs()

    pocao.mov_obs()

    coracao.mov_obs()
    coracao2.mov_obs()
    atualizaCenario()

    colisao()
    ver_fase()
    verificarVitoria()
    game_over()
}

// --- LOOP PRINCIPAL ---
function main() {
    des.clearRect(0, 0, canvas.width, canvas.height)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()