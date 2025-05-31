const palabras = ["monitor", "microfono", "televisor", "telefono", "caja", "fibron", "teclado", "pc", "collar", "manzana"];
let palabraSecreta = "";
let palabraAdivinada = [];
let letrasIncorrectas = [];
let vidas = 6;

const hangmanStages = [
  `
  --------
  |      |
  |      O
  |     /|\\
  |     / \\
  |
  |
  ---`,
  `
  --------
  |      |
  |      O
  |     /|\\
  |     /
  |
  |
  ---`,
  `
  --------
  |      |
  |      O
  |     /|\\
  |
  |
  |
  ---`,
  `
  --------
  |      |
  |      O
  |     /|
  |
  |
  |
  ---`,
  `
  --------
  |      |
  |      O
  |      |
  |
  |
  |
  ---`,
  `
  --------
  |      |
  |      O
  |
  |
  |
  |
  ---`,
  `
  --------
  |      |
  |
  |
  |
  |
  |
  ---`
];

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const livesDisplay = document.getElementById("lives");
const hangmanDisplay = document.getElementById("hangman");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const messageDisplay = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

function iniciarJuego() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  palabraAdivinada = Array(palabraSecreta.length).fill("_");
  letrasIncorrectas = [];
  vidas = 6;
  actualizarPantalla();
  messageDisplay.textContent = "";
  letterInput.disabled = false;
  guessButton.disabled = false;
}

function actualizarPantalla() {
  wordDisplay.textContent = palabraAdivinada.join(" ");
  wrongLettersDisplay.textContent = letrasIncorrectas.join(", ");
  livesDisplay.textContent = vidas;
  hangmanDisplay.textContent = hangmanStages[6 - vidas];
}

function adivinarLetra() {
  const letra = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!letra.match(/[a-zñ]/i)) {
    messageDisplay.textContent = "Por favor, ingresa una letra válida.";
    return;
  }

  if (palabraAdivinada.includes(letra) || letrasIncorrectas.includes(letra)) {
    messageDisplay.textContent = "Ya has intentado con esa letra.";
    return;
  }

  if (palabraSecreta.includes(letra)) {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        palabraAdivinada[i] = letra;
      }
    }
    messageDisplay.textContent = "¡Bien hecho!";
  } else {
    letrasIncorrectas.push(letra);
    vidas--;
    messageDisplay.textContent = "Letra incorrecta.";
  }

  actualizarPantalla();
  verificarEstadoJuego();
}

function verificarEstadoJuego() {
  if (!palabraAdivinada.includes("_")) {
    messageDisplay.textContent = "¡Felicidades! Has ganado.";
    letterInput.disabled = true;
    guessButton.disabled = true;
  } else if (vidas === 0) {
    messageDisplay.textContent = `Has perdido. La palabra era: ${palabraSecreta}`;
    letterInput.disabled = true;
    guessButton.disabled = true;
  }
}

guessButton.addEventListener("click", adivinarLetra);
letterInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adivinarLetra();
  }
});
restartButton.addEventListener("click", iniciarJuego);

iniciarJuego();
