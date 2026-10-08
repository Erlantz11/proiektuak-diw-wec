"use strict";

/* ==================== DATOS ==================== */

// API de palabras (en euskera)
const URL_API = "https://words-api-sy2x.onrender.com/api/word";

// Filas del teclado en pantalla
const FILAS_TECLADO = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

// Colores de las teclas según el resultado
const COLORES_TECLA = {
  ok: "#6aaa64",
  existe: "#c9b458",
  no: "#3a3a3c",
};

// Estado de la partida
const estado = {
  palabra: "",
  numLetras: 5,
  numIntentos: 6,
  filaActual: 0,
  letrasActuales: [],
  jugando: false,
};

/* ==================== ELEMENTOS DEL DOM ==================== */

const pantallaConfig = document.getElementById("pantalla-config");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFin = document.getElementById("pantalla-fin");
const formConfig = document.getElementById("form-config");
const btnJugar = document.getElementById("btn-jugar");
const tablero = document.getElementById("tablero");
const teclado = document.getElementById("teclado");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("btn-reiniciar");

/* ==================== PANTALLAS Y MENSAJES ==================== */

// Muestra una pantalla y oculta las otras
function mostrarPantalla(pantalla) {
  pantallaConfig.classList.add("oculto");
  pantallaJuego.classList.add("oculto");
  pantallaFin.classList.add("oculto");
  pantalla.classList.remove("oculto");
}

// Muestra un mensaje durante un momento
function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(function () {
    mensaje.textContent = "";
  }, 1500);
}

/* ==================== PALABRA SECRETA ==================== */

// Pide una palabra a la API con la longitud indicada
async function obtenerPalabra(longitud) {
  const url = URL_API + "?lang=eu&length=" + longitud + "&number=1";
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("Zerbitzariak errorea eman du: " + respuesta.status);
  }
  const datos = await respuesta.json();
  console.log("API erantzuna:", datos); // para ver qué devuelve la API
  return datos[0].toUpperCase();
}

/* ==================== TABLERO Y TECLADO ==================== */

// Crea las filas y casillas del tablero
function construirTablero(filas, columnas) {
  tablero.innerHTML = "";

  for (let f = 0; f < filas; f++) {
    const fila = document.createElement("div");
    fila.classList.add("fila");

    for (let c = 0; c < columnas; c++) {
      const casilla = document.createElement("div");
      casilla.classList.add("casilla");
      casilla.dataset.fila = f;
      casilla.dataset.col = c;
      fila.appendChild(casilla);
    }
    tablero.appendChild(fila);
  }
}

// Crea el teclado en pantalla
function construirTeclado() {
  teclado.innerHTML = "";

  FILAS_TECLADO.forEach(function (letras) {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("fila-teclado");

    letras.forEach(function (letra) {
      const tecla = document.createElement("button");
      tecla.type = "button";
      tecla.textContent = letra;
      tecla.classList.add("tecla");
      tecla.dataset.letra = letra;
      if (letra === "ENTER" || letra === "DEL") {
        tecla.classList.add("ancha");
      }

      tecla.addEventListener("click", function () {
        procesarTecla(letra);
      });
      filaDiv.appendChild(tecla);
    });

    teclado.appendChild(filaDiv);
  });
}

// Devuelve la casilla de una fila y una columna
function obtenerCasilla(fila, col) {
  return tablero.querySelector(
    '.casilla[data-fila="' + fila + '"][data-col="' + col + '"]'
  );
}

/* ==================== TECLAS ==================== */

// Decide qué hacer con cada tecla
function procesarTecla(tecla) {
  if (!estado.jugando) return;

  if (tecla === "ENTER") {
    enviarIntento();
  } else if (tecla === "DEL") {
    borrarLetra();
  } else {
    escribirLetra(tecla);
  }
}

function escribirLetra(letra) {
  if (estado.letrasActuales.length >= estado.numLetras) return;

  const col = estado.letrasActuales.length;
  const casilla = obtenerCasilla(estado.filaActual, col);
  casilla.textContent = letra;
  casilla.classList.add("rellena");
  estado.letrasActuales.push(letra);
}

function borrarLetra() {
  if (estado.letrasActuales.length === 0) return;

  const col = estado.letrasActuales.length - 1;
  const casilla = obtenerCasilla(estado.filaActual, col);
  casilla.textContent = "";
  casilla.classList.remove("rellena");
  estado.letrasActuales.pop();
}

// Teclado físico
function gestionarTecladoReal(evento) {
  const tecla = evento.key.toUpperCase();

  if (tecla === "ENTER") {
    evento.preventDefault(); // evita pulsar dos veces un botón con el foco
    procesarTecla("ENTER");
  } else if (tecla === "BACKSPACE") {
    procesarTecla("DEL");
  } else if (/^[A-ZÑ]$/.test(tecla)) {
    procesarTecla(tecla);
  }
}

/* ==================== COMPROBAR INTENTO ==================== */

// Devuelve un array con "ok", "existe" o "no" para cada letra
function evaluar(intento, secreta) {
  const colores = [];
  const restantes = secreta.split("");

  for (let i = 0; i < intento.length; i++) {
    colores.push("no");
  }

  // Primero las letras bien colocadas (verde)
  for (let i = 0; i < intento.length; i++) {
    if (intento[i] === secreta[i]) {
      colores[i] = "ok";
      restantes[i] = null;
    }
  }

  // Después las que están en la palabra pero en otro sitio (amarillo)
  for (let i = 0; i < intento.length; i++) {
    if (colores[i] === "ok") continue;

    const pos = restantes.indexOf(intento[i]);
    if (pos !== -1) {
      colores[i] = "existe";
      restantes[pos] = null;
    }
  }

  return colores;
}

// Colorea las teclas según el resultado del intento
// Prioridad: ok (verde) > existe (amarillo) > no (gris)
function actualizarTeclado(intento, colores) {
  const prioridad = { no: 1, existe: 2, ok: 3 };

  for (let i = 0; i < intento.length; i++) {
    const tecla = teclado.querySelector(
      '.tecla[data-letra="' + intento[i] + '"]'
    );
    if (!tecla) continue;

    // Estado actual de la tecla (si ya tenía uno)
    let actual = null;
    if (tecla.classList.contains("ok")) actual = "ok";
    else if (tecla.classList.contains("existe")) actual = "existe";
    else if (tecla.classList.contains("no")) actual = "no";

    // Solo se cambia si el nuevo estado es "mejor" que el anterior
    if (actual === null || prioridad[colores[i]] > prioridad[actual]) {
      tecla.classList.remove("ok", "existe", "no");
      tecla.classList.add(colores[i]);

      // Colores directos en la tecla para que ningún CSS los pise
      tecla.style.setProperty("background", COLORES_TECLA[colores[i]], "important");
      tecla.style.setProperty("color", "#fff", "important");
    }
  }
}

// Se ejecuta al pulsar ENTER
function enviarIntento() {
  if (estado.letrasActuales.length !== estado.numLetras) {
    mostrarMensaje("Hizki gehiago falta dira");
    return;
  }

  const intento = estado.letrasActuales.join("");
  const colores = evaluar(intento, estado.palabra);

  // Pintamos la fila
  for (let col = 0; col < colores.length; col++) {
    obtenerCasilla(estado.filaActual, col).classList.add(colores[col]);
  }

  // Pintamos el teclado
  actualizarTeclado(intento, colores);

  if (intento === estado.palabra) {
    terminarPartida(true);
    return;
  }

  estado.filaActual++;
  estado.letrasActuales = [];

  if (estado.filaActual === estado.numIntentos) {
    terminarPartida(false);
  }
}

/* ==================== FINAL E HISTORIAL ==================== */

// Guarda la partida en localStorage (últimas 5)
function guardarPartida(gano, intentos) {
  const lista = JSON.parse(localStorage.getItem("historial")) || [];

  lista.unshift({
    palabra: estado.palabra,
    gano: gano,
    intentos: intentos,
  });

  localStorage.setItem("historial", JSON.stringify(lista.slice(0, 5)));
}

// Dibuja el historial en la pantalla final
function mostrarHistorial() {
  historial.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("historial")) || [];

  lista.forEach(function (partida) {
    const div = document.createElement("div");
    div.classList.add("partida", partida.gano ? "ganada" : "perdida");

    if (partida.gano) {
      div.textContent = partida.palabra + " - " + partida.intentos + " saiakera";
    } else {
      div.textContent = partida.palabra + " - galduta";
    }
    historial.appendChild(div);
  });
}

function terminarPartida(gano) {
  estado.jugando = false;

  let intentos = estado.numIntentos;
  if (gano) {
    intentos = estado.filaActual + 1;
  }
  guardarPartida(gano, intentos);

  if (gano) {
    resultado.textContent = "Irabazi duzu!";
  } else {
    resultado.textContent = "Galdu duzu. Hitza hau zen: " + estado.palabra;
  }

  // Esperamos un poco para que se vean los colores
  setTimeout(function () {
    mostrarHistorial();
    mostrarPantalla(pantallaFin);
  }, 1500);
}

/* ==================== INICIO Y EVENTOS ==================== */

async function iniciarPartida(evento) {
  evento.preventDefault();

  estado.numIntentos = parseInt(document.getElementById("intentos").value, 10);
  estado.numLetras = parseInt(document.getElementById("letras").value, 10);
  estado.filaActual = 0;
  estado.letrasActuales = [];

  btnJugar.textContent = "Kargatzen...";

  try {
    estado.palabra = await obtenerPalabra(estado.numLetras);
  } catch (error) {
    console.log("Errorea:", error);
    alert("Ezin izan da hitza kargatu: " + error.message);
    btnJugar.textContent = "Jokatu";
    return;
  }

  btnJugar.textContent = "Jokatu";
  construirTablero(estado.numIntentos, estado.numLetras);
  construirTeclado();
  mostrarPantalla(pantallaJuego);
  estado.jugando = true;
}

function reiniciarJuego() {
  mostrarPantalla(pantallaConfig);
}

formConfig.addEventListener("submit", iniciarPartida);
btnReiniciar.addEventListener("click", reiniciarJuego);
document.addEventListener("keydown", gestionarTecladoReal);

mostrarPantalla(pantallaConfig);