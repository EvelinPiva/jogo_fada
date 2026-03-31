let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// --- ESTADO DO JOGO ---
let estadoJogo = 'menu'
let selecaoMenu = 1
let jogando = false

// --- IMAGENS ---
let imgMenu = new Image()
imgMenu.src = './img/TELA_INICIAL.png'

// --- ÁUDIOS ---
let musicaInicio = new Audio('./sons/MUSIC_INICIO.mp3')
musicaInicio.loop = true
musicaInicio.volume = 0.5

let musicaFundo = new Audio('./sons/music_fundo.mp3')
musicaFundo.loop = true
musicaFundo.volume = 0.5

let somInseto = new Audio('./sons/som_inseto.mp3')
let somCoracao = new Audio('./sons/coracao_som.mp3')
let somPocao = new Audio('./sons/pocao_som.mp3')

// --- OBSTÁCULOS ---
let abelha1 = new Abelha(1300, 100, 50, 50, './img/abelha.png')
let abelha2 = new Abelha(1500, 300, 50, 50, './img/abelha.png')
let abelha3 = new Abelha(1700, 500, 50, 50, './img/abelha.png')

// --- ITENS ---
let pocao = new Pocao(2000, 325, 40, 40, './img/pocao.png')
let coracao = new Coracao(2000, 325, 40, 40, './img/coracao.png')

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

    if (estadoJogo === 'menu') {
        tocarMusicaMenu()
        controleMenu(tecla)
    } else if (estadoJogo === 'instrucoes' || estadoJogo === 'desenvolvedora') {
        if (tecla === 'Enter' || tecla === 'Escape') estadoJogo = 'menu'
    } else if (estadoJogo === 'jogando') {
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

function tocarMusicaMenu() {
    if (musicaInicio.paused) {
        musicaInicio.play().catch(e => console.log('Aguardando interação...'))
    }
}

function controleMenu(tecla) {
    if (tecla === 'ArrowUp') selecaoMenu = (selecaoMenu <= 0) ? 2 : selecaoMenu - 1
    if (tecla === 'ArrowDown') selecaoMenu = (selecaoMenu >= 2) ? 0 : selecaoMenu + 1
    if (tecla === 'Enter') {
        if (selecaoMenu === 1) iniciarJogo()
        else if (selecaoMenu === 0) estadoJogo = 'instrucoes'
        else if (selecaoMenu === 2) estadoJogo = 'desenvolvedora'
    }
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
    if (tecla === 'Escape') voltarMenu()
}

function iniciarJogo() {
    estadoJogo = 'jogando'
    jogando = true
    musicaInicio.pause()
    musicaInicio.currentTime = 0
    musicaFundo.play().catch(e => console.log('Erro ao tocar música:', e))
}

function voltarMenu() {
    estadoJogo = 'menu'
    jogando = false
    musicaFundo.pause()
    musicaFundo.currentTime = 0
    musicaInicio.play().catch(e => { })
    fada.vida = 5
    fada2.vida = 5
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

function atualizaCenario() {
    if (fada.fase == 2 || fada2.fase == 2) {
        canvas.style.backgroundImage = "url('./img/FUNDO_TARDE.png')"
        if (!abelha1.img.src.includes('/img/pernilongo.png')) {
            abelha1.img.src = abelha2.img.src = abelha3.img.src = './img/pernilongo.png'
            abelha1.vel = abelha2.vel = abelha3.vel = 12
        }
    }
    if (fada.fase == 3 || fada2.fase == 3) {
        canvas.style.backgroundImage = "url('./img/FUNDO_NOITE.jpg')"
        if (!abelha1.img.src.includes('/img/insetaoATT.png')) {
            abelha1.img.src = abelha2.img.src = abelha3.img.src = './img/insetaoATT.png'
            abelha1.vel = abelha2.vel = abelha3.vel = 16
        }
    }
}

function colisao() {
    ;[abelha1, abelha2, abelha3].forEach(p => {
        if (fada.colid(p) || fada2.colid(p)) {
            somInseto.currentTime = 0
            somInseto.play().catch(e => console.log('Erro som inseto:', e))
            if (fada.colid(p)) { p.recomeca(); fada.vida-- }
            if (fada2.colid(p)) { p.recomeca(); fada2.vida-- }
        }
    })
    if (fada.colid(coracao) || fada2.colid(coracao)) {
        somCoracao.currentTime = 0
        somCoracao.play().catch(e => console.log('Erro som coracao:', e))
        if (fada.colid(coracao)) fada.vida += 1
        if (fada2.colid(coracao)) fada2.vida += 1
        coracao.recomeca()
    }
    if (fada.colid(pocao) || fada2.colid(pocao)) {
        somPocao.currentTime = 0
        somPocao.play().catch(e => console.log('Erro som pocao:', e))
        if (fada.colid(pocao)) fada.pontos += 10
        if (fada2.colid(pocao)) fada2.pontos += 10
        pocao.recomeca()
    }
}

// --- DESENHA ---
function desenha() {
    if (estadoJogo === 'menu') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height)
        des.strokeStyle = 'gold'
        des.lineWidth = 5
        des.strokeRect(410, 197 + (selecaoMenu * 125), 380, 80)

    } else if (estadoJogo === 'instrucoes') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height)
        des.fillStyle = 'rgba(0,0,0,0.85)'
        des.fillRect(150, 100, 900, 500)
        des.strokeStyle = 'gold'
        des.lineWidth = 5
        des.strokeRect(150, 100, 900, 500)
        des.fillStyle = 'white'
        des.font = '25px Arial'
        des.textAlign = 'center'
        des.fillText('Fada 1: WASD | Fada 2: SETAS', 600, 300)
        des.fillText('Pressione ENTER para voltar', 600, 530)
        des.textAlign = 'start'

    } else if (estadoJogo === 'desenvolvedora') {
        des.drawImage(imgMenu, 0, 0, canvas.width, canvas.height)
        des.fillStyle = 'rgba(0,0,0,0.85)'
        des.fillRect(200, 150, 800, 400)
        des.strokeStyle = 'deeppink'
        des.lineWidth = 5
        des.strokeRect(200, 150, 800, 400)
        des.fillStyle = 'white'
        des.font = '25px Arial'
        des.textAlign = 'center'
        des.fillText('Jogo desenvolvido por: Evelin Piva', canvas.width / 2, 320)
        des.fillText('Projeto de Programação 2026', canvas.width / 2, 370)
        des.fillStyle = 'deeppink'
        des.fillText('Pressione ENTER para voltar', canvas.width / 2, 500)
        des.textAlign = 'start'

    } else if (estadoJogo === 'jogando') {
        abelha1.desenhar()
        abelha2.desenhar()
        abelha3.desenhar()
        pocao.desenhar()
        coracao.desenhar()
        fada.desenhar()
        fada2.desenhar()
        des.font = '30px JetBrains Mono'
        des.fillStyle = 'orange'
        des.fillText('💖: ' + fada.vida, 40, 50)
        des.fillText('🏅: ' + fada.pontos, 40, 90)
        des.fillText('FASE: ' + fada.fase, 40, 130)
        des.fillStyle = 'blue'
        des.fillText('💖: ' + fada2.vida, 800, 50)
        des.fillText('🏅: ' + fada2.pontos, 800, 90)


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
            des.fillText('Pontuação Final: ' + (fada.pontos + fada2.pontos), canvas.width / 2, 430)
            des.fillText('Pontuação Fada Azul: ' + (fada2.pontos), canvas.width / 2, 430)
            des.fillText('Pontuação Fada Laranja: ' + (fada.pontos), canvas.width / 2, 430)
            des.font = '20px JetBrains Mono'
            des.fillText('Pressione F5 para jogar novamente', canvas.width / 2, 550)
            des.textAlign = 'start'
        }else if (estadoJogo === 'vitoria2') {
            des.fillStyle = 'rgba(0, 50, 0, 0.7)'
            des.fillRect(0, 0, canvas.width, canvas.height)
            des.textAlign = 'center'
        
                des.fillStyle = 'gold'
                des.font = '80px JetBrains Mono'
                des.fillText('YOU WIN!', canvas.width / 2, 300)
                des.fillStyle = 'white'
                des.font = '30px JetBrains Mono'
                des.fillText('A fada azul venceu!', canvas.width / 2, 380)
                des.fillText('Pontuação Final: ' + (fada.pontos + fada2.pontos), canvas.width / 2, 430)
                des.fillText('Pontuação Fada Azul: ' + (fada2.pontos), canvas.width / 2, 430)
                des.fillText('Pontuação Fada Laranja: ' + (fada.pontos), canvas.width / 2, 730)
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
        des.font = '22px JetBrains Mono'
        des.fillStyle = 'gold'
        des.fillText('Pressione F5 para voltar ao menu', canvas.width / 2, 460)
        des.textAlign = 'start'
    }

}

// --- ATUALIZA ---
function atualiza() {
    if (estadoJogo !== 'jogando') return
    fada.mover()
    fada2.mover()
    atualizaCenario()
    abelha1.mov_obs()
    abelha2.mov_obs()
    abelha3.mov_obs()
    pocao.mov_obs()
    coracao.mov_obs()
    colisao()
    game_over()
    if (fada.pontos === 130) estadoJogo = 'vitoria'
    if (fada2.pontos === 130) estadoJogo = 'vitoria2'
}

// --- LOOP PRINCIPAL ---
function main() {
    des.clearRect(0, 0, canvas.width, canvas.height)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()