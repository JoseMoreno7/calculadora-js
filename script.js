// script.js

const display = document.getElementById("display");

// Detectar todos los botones
const botonesNumeros = document.querySelectorAll(".btn-num");
const botonesOperaciones = document.querySelectorAll(".btn-op");
const botonesFunciones = document.querySelectorAll(".btn-func");
const botonIgual = document.querySelector(".btn-equals");

let operacionActual = "";

// Agregar número o punto
botonesNumeros.forEach(boton => {
  boton.addEventListener("click", () => {
    operacionActual += boton.textContent;
    actualizarDisplay();
  });
});

// Agregar operadores
botonesOperaciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;
    if (operacionActual.length > 0 && !esOperador(operacionActual.slice(-1))) {
      operacionActual += valor;
      actualizarDisplay();
    }
  });
});

// Funciones como C, ⌫, √
botonesFunciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operacionActual = "";
    } else if (valor === "⌫") {
      operacionActual = operacionActual.slice(0, -1);
    } else if (valor === "√") {
      try {
        operacionActual = Math.sqrt(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    }

    actualizarDisplay();
  });
});

// Botón igual (=)
botonIgual.addEventListener("click", () => {
  try {
    operacionActual = eval(operacionActual).toString();
  } catch (error) {
    operacionActual = "Error";
  }
  actualizarDisplay();
});

// Mostrar en pantalla
function actualizarDisplay() {
  display.value = operacionActual;
}

// Validar que no se pongan dos operadores seguidos
function esOperador(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

// Funciones como C, ⌫, √, π, etc.
botonesFunciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operacionActual = "";
    } else if (valor === "⌫") {
      operacionActual = operacionActual.slice(0, -1);
    } else if (valor === "√") {
      try {
        operacionActual = Math.sqrt(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "π") {
      operacionActual += Math.PI.toFixed(8);
    } else if (valor === "x²") {
      try {
        operacionActual = Math.pow(eval(operacionActual), 2).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "^") {
      operacionActual += "**";
    } else if (valor === "log") {
      try {
        operacionActual = Math.log10(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "ln") {
      try {
        operacionActual = Math.log(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "sin") {
      try {
        operacionActual = Math.sin(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "cos") {
      try {
        operacionActual = Math.cos(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    } else if (valor === "tan") {
      try {
        operacionActual = Math.tan(eval(operacionActual)).toString();
      } catch (e) {
        operacionActual = "Error";
      }
    }

    actualizarDisplay();
  });
});

