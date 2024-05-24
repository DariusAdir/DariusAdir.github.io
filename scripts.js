const palabras = ['ahorrar', 'vibora', 'pertenencia', 'pasto', 'guirnalda', 'bostezo', 'cartulina'];
let palabraSecreta;
let letrasAcertadas = [];
let letrasErroneas = [];
let canvas = document.getElementById('ahorcadoCanvas');
let contexto = canvas.getContext('2d');
let intentosRestantes = 10;
let mensaje = document.getElementById('mensaje');

function iniciarJuego() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].split('');
  letrasAcertadas = [];
  letrasErroneas = [];
  intentosRestantes = 10;
  dibujarCanvas();
  actualizarPalabraOculta();
  mensaje.textContent = '';
}

function actualizarPalabraOculta() {
  let palabraVisible = '';
  for (let letra of palabraSecreta) {
    if (letrasAcertadas.includes(letra)) {
      palabraVisible += letra;
    } else {
      palabraVisible += '_ ';
    }
  }
  document.getElementById('palabraOculta').innerHTML = palabraVisible;
}

function dibujarCanvas() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  // Dibujar horca en base a los intentos restantes
  switch (intentosRestantes) {
    case 10:
      dibujarBase();
      break;
    case 9:
      dibujarPoste();
      break;
    case 8:
      dibujarTravesaño();
      break;
    case 7:
      dibujarCuerda();
      break;
    case 6:
      dibujarCabeza();
      break;
    case 5:
      dibujarCuerpo();
      break;
    case 4:
      dibujarBrazoIzquierdo();
      break;
    case 3:
      dibujarBrazoDerecho();
      break;
    case 2:
      dibujarPiernaIzquierda();
      break;
    case 1:
      dibujarPiernaDerecha();
      break;
    case 0:
      dibujarMonigoteCompleto();
      mostrarMensaje('¡Has perdido! La palabra era: ' + palabraSecreta);
      break;
  }
}

function dibujarBase() {
  contexto.beginPath();
  contexto.moveTo(20, 180);
  contexto.lineTo(100, 180);
  contexto.stroke();
}

function dibujarPoste() {
  contexto.beginPath();
  contexto.moveTo(50, 10);
  contexto.lineTo(50, 180);
  contexto.stroke();
}

function dibujarTravesaño() {
  contexto.beginPath();
  contexto.moveTo(10, 20);
  contexto.lineTo(90, 20);
  contexto.stroke();
}

function dibujarCuerda() {
  contexto.beginPath();
  contexto.moveTo(50, 20);
  contexto.lineTo(50, 40);
  contexto.stroke();
}

function dibujarCabeza() {
  contexto.beginPath();
  contexto.arc(50, 60, 20, 0, Math.PI * 2);
  contexto.stroke();
}

function dibujarCuerpo() {
  contexto.beginPath();
  contexto.moveTo(50, 80);
  contexto.lineTo(50, 140);
  contexto.stroke();
}

function dibujarBrazoIzquierdo() {
  contexto.beginPath();
  contexto.moveTo(50, 100);
  contexto.lineTo(35, 120);
  contexto.stroke();
}

function dibujarPiernaIzquierda() {
    contexto.beginPath();
    contexto.moveTo(50, 140);
    contexto.lineTo(40, 160);
    contexto.stroke();
}
  
function dibujarPiernaDerecha() {
    contexto.beginPath();
    contexto.moveTo(50, 140);
    contexto.lineTo(60, 160);
    contexto.stroke();
}
  
