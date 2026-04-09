let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// --- ESTADO DO JOGO ---
let estadoJogo = 'menu'
let jogando = false
let modoJogo = 2

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
let abelha4 = new Abelha(1700, 200, 50, 50, './img/abelha.png')
let abelha5 = new Abelha(1900, 400, 50, 50, './img/abelha.png')

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

// --- CONTROLE ---
function teclaPressionada(e) {
    const tecla = e.key
    const t = tecla.toLowerCase()

    if (musicaFundo.paused) {
        musicaFundo.play().catch(() => {})
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

    if (modoJogo === 2) {
        if (tecla === 'ArrowUp' || tecla === 'ArrowDown') fada2.dir = 0
        if (tecla === 'ArrowLeft' || tecla === 'ArrowRight') fada2.dir2 = 0
    }
}

function controleFada(tecla, t) {
    if (t === 'w') fada.dir = -9
    if (t === 's') fada.dir = 9
    if (t === 'a') fada.dir2 = -11
    if (t === 'd') fada.dir2 = 11

    if (modoJogo === 2) {
        if (tecla === 'ArrowUp') fada2.dir = -9
        if (tecla === 'ArrowDown') fada2.dir = 9
        if (tecla === 'ArrowLeft') fada2.dir2 = -11
        if (tecla === 'ArrowRight') fada2.dir2 = 11
    }
}

// BOTÕES
function iniciarModo(modo) {
    modoJogo = modo
    estadoJogo = 'jogando'
    document.getElementById('tela-jogar').style.display = 'none'
    const musica = document.getElementById('menuMusic')
    if (musica) {
        localStorage.setItem('tempoMusica', musica.currentTime)
        musica.pause()
    }
}

// --- LÓGICA ---
function game_over() {
    if (
        fada.vida <= 0 ||
        (modoJogo === 2 && fada2.vida <= 0)
    ) {
        jogando = false
        estadoJogo = 'gameover'
        musicaFundo.pause()
        musicaFundo.currentTime = 0
    }
}

function ver_vitoria() {
    if (fada.pontos >= 130 || (modoJogo === 2 && fada2.pontos >= 130)) {
        jogando = false
        estadoJogo = 'vitoria'
        musicaFundo.pause()
        musicaFundo.currentTime = 0
    }
}

function ver_fase() {
    if (fada.pontos >= 90) fada.fase = 3
    else if (fada.pontos >= 40) fada.fase = 2
    else fada.fase = 1

    if (fada2.pontos >= 90) fada2.fase = 3
    else if (fada2.pontos >= 40) fada2.fase = 2
    else fada2.fase = 1
}

function atualizaImagemInsetos() {
    const faseAtual = Math.max(fada.fase, modoJogo === 2 ? fada2.fase : 1)

    let imgInseto
    if (faseAtual >= 3) {
        imgInseto = './img/insetaoATT.png'
    } else if (faseAtual >= 2) {
        imgInseto = './img/pernilongo.png'
    } else {
        imgInseto = './img/abelha.png'
    }

    ;[abelha1, abelha2, abelha3, abelha4, abelha5].forEach(a => {
        if (a.img.src !== location.origin + '/' + imgInseto.replace('./', '')) {
            a.img.src = imgInseto
        }
    })
}

function atualizaCenario() {
    if (fada.fase === 2 || fada2.fase === 2) {
        fundo.src = './img/FUNDO_TARDE.png'
        abelha1.vel = abelha2.vel = abelha3.vel = abelha4.vel = abelha5.vel = 12
    }

    if (fada.fase === 3 || fada2.fase === 3) {
        fundo.src = './img/FUNDO_NOITE3.png'
        abelha1.vel = abelha2.vel = abelha3.vel = abelha4.vel = abelha5.vel = 16
    }

    atualizaImagemInsetos()
}

function colisao() {

    // ABELHAS
    if (fada.colid(abelha1)) { somInseto.currentTime = 0; somInseto.play(); abelha1.recomeca(); fada.vida-- }
    if (fada.colid(abelha2)) { somInseto.currentTime = 0; somInseto.play(); abelha2.recomeca(); fada.vida-- }
    if (fada.colid(abelha3)) { somInseto.currentTime = 0; somInseto.play(); abelha3.recomeca(); fada.vida-- }
    if (fada.colid(abelha4)) { somInseto.currentTime = 0; somInseto.play(); abelha4.recomeca(); fada.vida-- }
    if (fada.colid(abelha5)) { somInseto.currentTime = 0; somInseto.play(); abelha5.recomeca(); fada.vida-- }

    if (modoJogo === 2) {
        if (fada2.colid(abelha1)) { somInseto.currentTime = 0; somInseto.play(); abelha1.recomeca(); fada2.vida-- }
        if (fada2.colid(abelha2)) { somInseto.currentTime = 0; somInseto.play(); abelha2.recomeca(); fada2.vida-- }
        if (fada2.colid(abelha3)) { somInseto.currentTime = 0; somInseto.play(); abelha3.recomeca(); fada2.vida-- }
        if (fada2.colid(abelha4)) { somInseto.currentTime = 0; somInseto.play(); abelha4.recomeca(); fada2.vida-- }
        if (fada2.colid(abelha5)) { somInseto.currentTime = 0; somInseto.play(); abelha5.recomeca(); fada2.vida-- }
    }

    // CORAÇÕES
    if (fada.colid(coracao)) { somCoracao.currentTime = 0; somCoracao.play(); coracao.recomeca(); fada.vida++ }
    if (fada.colid(coracao2)) { somCoracao.currentTime = 0; somCoracao.play(); coracao2.recomeca(); fada.vida++ }

    if (modoJogo === 2) {
        if (fada2.colid(coracao)) { somCoracao.currentTime = 0; somCoracao.play(); coracao.recomeca(); fada2.vida++ }
        if (fada2.colid(coracao2)) { somCoracao.currentTime = 0; somCoracao.play(); coracao2.recomeca(); fada2.vida++ }
    }

    // POÇÃO
    if (fada.colid(pocao)) { somPocao.currentTime = 0; somPocao.play(); pocao.recomeca(); fada.pontos += 10 }

    if (modoJogo === 2) {
        if (fada2.colid(pocao)) { somPocao.currentTime = 0; somPocao.play(); pocao.recomeca(); fada2.pontos += 10 }
    }
}

// --- DESENHA ---
function desenha() {

    if (estadoJogo === 'menu') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height)
        return
    }

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

        if (modoJogo === 2) {
            fada2.desenhar()
        }

        // HUD FADA 1
        let y = 30
        des.fillStyle = "rgb(198, 242, 158)"
        des.fillRect(y - 10, 20, 150, 70)
        des.strokeStyle = "red"
        des.strokeRect(y - 10, 20, 150, 70)

        des.fillStyle = 'red'
        des.fillText('❤ VIDA: ' + fada.vida, y, 45)
        des.fillText('★ PONTOS: ' + fada.pontos, y, 65)
        des.fillText('🎮 FASE: ' + fada.fase, y, 85)

        // HUD FADA 2
        if (modoJogo === 2) {
            let x = 1070
            des.fillStyle = "rgb(198, 242, 158)"
            des.fillRect(x - 10, 20, 150, 70)
            des.strokeStyle = "blue"
            des.strokeRect(x - 10, 20, 150, 70)

            des.fillStyle = 'blue'
            des.fillText('❤ VIDA: ' + fada2.vida, x, 45)
            des.fillText('★ PONTOS: ' + fada2.pontos, x, 65)
            des.fillText('🎮 FASE: ' + fada2.fase, x, 85)
        }
    }

    // TELA DE GAME OVER
    if (estadoJogo === 'gameover') {
        des.fillStyle = 'rgba(0,0,0,0.85)'
        des.fillRect(0, 0, canvas.width, canvas.height)

        des.textAlign = 'center'

        des.fillStyle = 'red'
        des.font = 'bold 80px Arial'
        des.fillText('GAME OVER', canvas.width / 2, 130)

        if (modoJogo === 1) {
            des.font = '36px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Pontuação: ' + fada.pontos + ' pontos', canvas.width / 2, 230)
            des.fillText('❤ Vidas restantes: ' + fada.vida, canvas.width / 2, 285)

        } else {
            const totalPontos = fada.pontos + fada2.pontos

            des.font = 'bold 38px Arial'
            des.fillStyle = 'yellow'
            des.fillText('★ Total de pontos: ' + totalPontos, canvas.width / 2, 220)

            des.strokeStyle = 'rgba(255,255,255,0.3)'
            des.lineWidth = 2
            des.beginPath()
            des.moveTo(canvas.width / 2 - 300, 250)
            des.lineTo(canvas.width / 2 + 300, 250)
            des.stroke()

            des.font = 'bold 30px Arial'
            des.fillStyle = 'orange'
            des.fillText('🧚 Fada Laranja (Jogador 1)', canvas.width / 2, 295)
            des.font = '26px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Pontos: ' + fada.pontos + '   ❤ Vidas restantes: ' + fada.vida, canvas.width / 2, 335)

            des.strokeStyle = 'rgba(255,255,255,0.15)'
            des.beginPath()
            des.moveTo(canvas.width / 2 - 300, 360)
            des.lineTo(canvas.width / 2 + 300, 360)
            des.stroke()

            des.font = 'bold 30px Arial'
            des.fillStyle = '#66aaff'
            des.fillText('🧚 Fada Azul (Jogador 2)', canvas.width / 2, 405)
            des.font = '26px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Pontos: ' + fada2.pontos + '   ❤ Vidas restantes: ' + fada2.vida, canvas.width / 2, 445)
        }

        des.textAlign = 'start'
    }

    // TELA DE VITÓRIA
    if (estadoJogo === 'vitoria') {
        des.fillStyle = 'rgba(0, 30, 0, 0.88)'
        des.fillRect(0, 0, canvas.width, canvas.height)

        des.textAlign = 'center'

        des.fillStyle = '#ffe94e'
        des.font = 'bold 80px Arial'
        des.fillText('🏆 VITÓRIA! 🏆', canvas.width / 2, 130)

        if (modoJogo === 1) {
            des.font = '36px Arial'
            des.fillStyle = 'white'
            des.fillText('Parabéns! Você venceu!', canvas.width / 2, 215)
            des.fillText('★ Pontuação final: ' + fada.pontos + ' pontos', canvas.width / 2, 270)
            des.fillText('❤ Vidas restantes: ' + fada.vida, canvas.width / 2, 325)

        } else {
            let vencedor = ''
            if (fada.pontos >= 130 && fada2.pontos >= 130) {
                vencedor = 'As duas fadas venceram juntas!'
            } else if (fada.pontos >= 130) {
                vencedor = '🧚 Fada Laranja venceu!'
            } else {
                vencedor = '🧚 Fada Azul venceu!'
            }

            const totalPontos = fada.pontos + fada2.pontos

            des.font = 'bold 38px Arial'
            des.fillStyle = '#ffe94e'
            des.fillText(vencedor, canvas.width / 2, 210)

            des.font = '30px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Total de pontos: ' + totalPontos, canvas.width / 2, 265)

            des.strokeStyle = 'rgba(255,255,255,0.3)'
            des.lineWidth = 2
            des.beginPath()
            des.moveTo(canvas.width / 2 - 300, 290)
            des.lineTo(canvas.width / 2 + 300, 290)
            des.stroke()

            des.font = 'bold 28px Arial'
            des.fillStyle = 'orange'
            des.fillText('🧚 Fada Laranja (Jogador 1)', canvas.width / 2, 335)
            des.font = '24px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Pontos: ' + fada.pontos + '   ❤ Vidas restantes: ' + fada.vida, canvas.width / 2, 370)

            des.strokeStyle = 'rgba(255,255,255,0.15)'
            des.beginPath()
            des.moveTo(canvas.width / 2 - 300, 395)
            des.lineTo(canvas.width / 2 + 300, 395)
            des.stroke()

            des.font = 'bold 28px Arial'
            des.fillStyle = '#66aaff'
            des.fillText('🧚 Fada Azul (Jogador 2)', canvas.width / 2, 440)
            des.font = '24px Arial'
            des.fillStyle = 'white'
            des.fillText('★ Pontos: ' + fada2.pontos + '   ❤ Vidas restantes: ' + fada2.vida, canvas.width / 2, 475)
        }

        des.textAlign = 'start'
    }
}

// --- LOOP ---
function atualiza() {
    if (estadoJogo !== 'jogando') return

    fada.mover()

    if (modoJogo === 2) {
        fada2.mover()
    }

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
    ver_vitoria()
    game_over()
}

function main() {
    des.clearRect(0, 0, canvas.width, canvas.height)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()