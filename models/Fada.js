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
        super(x, y, w, h, './fada1.png')

        this.dir = 0
        this.dir2 = 0
        this.vida = 5
        this.pontos = 0

        this.frames = [
            './fada1.png',
            './fada2.png',
            './fada3.png'
        ]

        this.frameAtual = 0
        this.contador = 0
        this.velocidadeAnim = 10

        this.img = new Image()
        this.img.src = this.frames[this.frameAtual]
    }

    mover() {
        this.y += this.dir
        this.x += this.dir2

        if (this.y <= 0) this.y = 0
        if (this.y >= 600) this.y = 600
        if (this.x <= 0) this.x = 0
        if (this.x >= 1100) this.x = 1100

        this.animar()
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
    mov_obs() {
        this.x -= 8
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
        this.x -= 5 // Velocidade diferente para as poções
        if (this.x < -100) {
            this.recomeca()
        }
    }

    recomeca() {
        this.x = 1300 + Math.random() * 600 // Spawna com atraso aleatório
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }
}