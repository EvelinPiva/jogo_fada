class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.img = new Image()
        this.img.src = a
    }

    desenhar() {
        des.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}

class Fada extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h, './img/fada1.png')

        this.dir = 0
        this.dir2 = 0
        this.vida = 5
        this.pontos = 0
        this.fase = 1

        this.frames = [
            './img/fada1.png',
            './img/fada2.png',
            './img/fada3.png'
        ]

        this.frameAtual = 0
        this.contador = 0
        this.velocidadeAnim = 10

        this.img = new Image()
        this.img.src = this.frames[this.frameAtual]
    }
    verificaFase() {
        // Se pontos for maior ou igual a 50, muda para fase 2
        if (this.pontos >= 50 && this.fase == 1) {
            this.fase = 2;
            // Chamamos a troca de fundo e inimigos aqui para ser imediato
            atualizaCenario(); 
        }
    
        // Exemplo: Se quiseres uma fase 3 com 100 pontos
        if (this.pontos >= 100 && this.fase == 2) {
            this.fase = 3;
        }
    }
    mover() {
        this.y += this.dir
        this.x += this.dir2

        if (this.y <= 0) this.y = 0
        if (this.y >= 600) this.y = 600
        if (this.x <= 0) this.x = 0
        if (this.x >= 1100) this.x = 1100

        this.animar()
        this.verificaFase()
    }

    animar() {
        this.contador++
        if (this.contador >= this.velocidadeAnim) {
            this.contador = 0
            this.frameAtual++
            if (this.frameAtual >= this.frames.length) {
                this.frameAtual = 0
            }
            this.img.src = this.frames[this.frameAtual]
        }
    }

    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        } else {
            return false
        }
    }

    point(objeto) {
        if (objeto.x <= -100) {
            return true
        } else {
            return false
        }
    }
  
}

class Fada2 extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h, './img/fada2_2.png')

        this.dir = 0
        this.dir2 = 0
        this.vida = 5
        this.pontos = 0
        this.fase = 1

        this.frames = [
            './img/fada2_2.png',
            './img/fada2_3.png',
            './img/fada2_6.png',
            './img/fada2_4.png',

            
        ]

        this.frameAtual = 0
        this.contador = 0
        this.velocidadeAnim = 10

        this.img = new Image()
        this.img.src = this.frames[this.frameAtual]
    }
    verificaFase() {
        // Fase 2 aos 50 pontos
        if (this.pontos >= 50 && this.fase == 1) {
            this.fase = 2
        }
    
        // Fase 3 aos 120 pontos
        if (this.pontos >= 120 && this.fase == 2) {
            this.fase = 3
        }
    }
    mover() {
        this.y += this.dir
        this.x += this.dir2

        if (this.y <= 0) this.y = 0
        if (this.y >= 600) this.y = 600
        if (this.x <= 0) this.x = 0
        if (this.x >= 1100) this.x = 1100

        this.animar()
        this.verificaFase()
    }

    animar() {
        this.contador++
        if (this.contador >= this.velocidadeAnim) {
            this.contador = 0
            this.frameAtual++
            if (this.frameAtual >= this.frames.length) {
                this.frameAtual = 0
            }
            this.img.src = this.frames[this.frameAtual]
        }
    }

    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        } else {
            return false
        }
    }

    point(objeto) {
        if (objeto.x <= -100) {
            return true
        } else {
            return false
        }
    }
  
}
class Abelha extends Obj {
    constructor(x,y,w,h,a){
        super(x,y,w,h,a)
        this.vel = 8
    }

    mov_obs() {
        this.x -= this.vel
        if (this.x < -100) {
            this.recomeca()
        }
    }

    recomeca() {
        this.x = 1300
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }
}
class Pocao extends Obj {
    mov_obs() {
        this.x -= 5 // Velocidade diferente para as poções
        if (this.x < -100) {
            this.recomeca()
        }
    }

    recomeca() {
        this.x = 1300 + Math.random() * 500 // Spawna com atraso aleatório
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }
}
class Coracao extends Obj {
    mov_obs() {
        this.x -= 8 // Velocidade diferente para as poções
        if (this.x < -100) {
            this.recomeca()
        }
    }

    recomeca() {
        this.x = 2000 + Math.random() * 800 // Spawna com atraso aleatório
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }
}