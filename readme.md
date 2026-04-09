# 🧚 Fairy Game

![Banner](./img/TELA_INICIAL.png)

> Jogo 2D desenvolvido em JavaScript com Canvas API — aventura mágica para 1 ou 2 jogadores!

---

## 📋 Identificação do Projeto

| Campo | Informação |
|---|---|
| Título | Fairy Game |
| Desenvolvedora | Evelin Piva |
| Professor Orientador | Carlos Roberto da Silva Filho |
| Instituição | Sesi Senai |
| Curso | Técnico em Desenvolvimento de Sistemas |

---

## 🎮 Visão Geral

O **Fairy Game** é um jogo 2D com suporte a **modo solo** e **modo multiplayer local**, desenvolvido com JavaScript puro e Canvas API. O jogador controla fadas mágicas, coleta itens e desvia de obstáculos enquanto avança por fases progressivas.

### Modos de Jogo

| Modo | Descrição |
|---|---|
| 🧚 1 Fada | Modo solo — um jogador controla a Fada Laranja |
| 🧚🧚 2 Fadas | Modo multiplayer local — dois jogadores simultâneos |

> A seleção de modo é feita na tela inicial, com os botões **"1 Fada"** e **"2 Fadas"** espaçados para facilitar a escolha.

### Personagens

- 🟠 **Fada Laranja** — controlada com `W A S D`
- 🔵 **Fada Azul** — controlada com as teclas de seta `↑ ↓ ← →` *(disponível no modo 2 Fadas)*

---

## 🎯 Objetivo

Sobreviver, coletar itens e alcançar a maior pontuação possível.

🏆 **Vence o jogador que atingir 130 pontos primeiro.**

---

## 🕹️ Controles

| Jogador | Teclas | Ação |
|---|---|---|
| 🟠 Fada Laranja | `W` `A` `S` `D` | Movimentação |
| 🔵 Fada Azul | `↑` `↓` `←` `→` | Movimentação *(modo 2 Fadas)* |

---

## ⚙️ Mecânicas do Jogo

### 🐝 Obstáculos

- **Insetos** — causam perda de vida ao colidir com a fada

### 💖 Itens Coletáveis

- **Corações** → +1 vida
- **Poções** → +10 pontos

---

## 📈 Progressão de Fases

| Fase | Pontuação | Cenário | Dificuldade |
|---|---|---|---|
| Fase 1 | 0 – 39 pts | Inicial | Normal |
| Fase 2 | 40 – 89 pts | Tarde | Média |
| Fase 3 | 90 – 130 pts | Noite | Difícil |

---

## 📜 Requisitos Funcionais

| ID | Requisito | Descrição |
|---|---|---|
| RF01 | Movimento | Cada fada possui controle independente |
| RF02 | Sistema de Vidas | Perda de vida ao colidir com insetos |
| RF03 | Pontuação | Sistema de pontos em tempo real |
| RF04 | Coletáveis | Corações recuperam vida; poções somam pontos |
| RF05 | Colisão | Sistema de colisão entre objetos |
| RF06 | Progressão de Fases | Mudança de fase por pontuação |
| RF07 | Modos de Jogo | Solo (1 Fada) e Multiplayer Local (2 Fadas) |
| RF08 | Interface | Menu, Seleção de Modo, Jogo, Vitória e Game Over |
| RF09 | Áudio | Música e efeitos sonoros dinâmicos |

---

## 🔧 Requisitos Não Funcionais

| ID | Requisito | Descrição |
|---|---|---|
| RNF01 | Tecnologia | JavaScript ES6, HTML5 e Canvas API |
| RNF02 | Performance | Atualização via `requestAnimationFrame` |
| RNF03 | Portabilidade | Executa diretamente no navegador, sem instalação |
| RNF04 | Usabilidade | Interface simples, responsiva e acessível |
| RNF05 | Áudio | Controle de música com persistência via `localStorage` |
| RNF06 | Experiência | Feedback visual e sonoro em tempo real |

---

## 📏 Regras de Negócio

| ID | Regra |
|---|---|
| RN01 | Insetos causam perda de vida ao colidir com a fada |
| RN02 | Corações aumentam a vida da fada |
| RN03 | Poções aumentam a pontuação da fada |
| RN04 | Fase 1: pontuação de 0 até 39 |
| RN05 | Fase 2: pontuação de 40 até 89 |
| RN06 | Fase 3: pontuação de 90 até 130 |
| RN07 | Vence quem atingir 130 pontos primeiro |
| RN08 | Se uma fada perder todas as vidas, o jogo termina para ambos |

---

## 🔊 Sistema de Áudio

- Música de fundo com loop automático
- Sons para:
  - Colisão com insetos
  - Coleta de coração
  - Coleta de poção
- Tempo da música persiste entre telas via `localStorage`

---

## 🖥️ Interface do Jogo

| Tela | Descrição |
|---|---|
| 🎮 Menu Inicial | Tela de entrada do jogo |
| 🧚 Seleção de Modo | Escolha entre **1 Fada** ou **2 Fadas** |
| 📜 Instruções | Guia de controles e regras |
| 👩‍💻 Desenvolvedor | Informações sobre a criadora |
| 🏆 Vitória | Tela de vencedor |
| 💀 Game Over | Tela de fim de jogo |

---

## 🧠 Lógica Técnica

- Renderização via `<canvas>` HTML5
- Classes para cada objeto do jogo (`Fada`, `Abelha`, etc.)
- Loop principal com `requestAnimationFrame`
- Sistema de estados:
  - `menu`
  - `jogando`
  - `gameover`
  - `vitoria_jogador1`
  - `vitoria_jogador2`
- Colisão em tempo real entre todos os objetos
- Gerenciamento de múltiplos objetos simultâneos (insetos e itens)

---

## 📁 Estrutura do Projeto

## 🚀 Como Executar

1. Clone ou baixe o projeto
2. Abra o arquivo `inicio.html` no navegador

Ou use a extensão **Live Server** no VS Code para rodar com hot reload.

---

## 👩‍💻 Créditos

| Campo | Info |
|---|---|
| Desenvolvedora | Evelin Piva |
| Instagram | [@p.evelinn](https://instagram.com/p.evelinn) |
| Instituição | Sesi Senai |
| Professor | Carlos Roberto da Silva Filho |