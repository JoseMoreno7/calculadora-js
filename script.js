const display = document.getElementById("display");

// Detectar todos los botones
const botonesNumeros = document.querySelectorAll(".btn-num");
const botonesOperaciones = document.querySelectorAll(".btn-op");
const botonesFunciones = document.querySelectorAll(".btn-func");
const botonIgual = document.querySelector(".btn-equals");
const btnHistorial = document.getElementById("btn-historial");
const historialContenedor = document.getElementById("historial");
const historialLista = document.getElementById("historial-lista");

let operacionActual = "";
let historial = [];

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

// Funciones como C, ⌫, √, π, etc.
botonesFunciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operacionActual = "";
    } else if (valor === "⌫") {
      // Borrar un solo carácter
      operacionActual = operacionActual.slice(0, operacionActual.length - 1);
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

// Botón igual (=)
botonIgual.addEventListener("click", () => {
  let resultado;
  try {
    resultado = eval(operacionActual).toString();
  } catch (error) {
    resultado = "Error";
  }
  // Guardar en el historial
  historial.push(`${operacionActual} = ${resultado}`);
  if (historial.length > 12) {
    historial.shift();  // Eliminar la operación más antigua si hay más de 12
  }
  actualizarHistorial();
  operacionActual = resultado;
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

//Alternar visibilidad del historial en la UI
btnHistorial.addEventListener("click", () => {
  historialContenedor.classList.toggle("hidden");
});

// Actualizar el historial en la UI con un grid
function actualizarHistorial() {
  historialLista.innerHTML = "";  // Limpiar historial
  // Organizar las operaciones en el grid
  historial.forEach((item, index) => {
    const historialItem = document.createElement("div");
    historialItem.classList.add("mb-2", "text-gray-400", "p-2", "bg-gray-800", "text-center", "rounded-md");
    historialItem.innerHTML = item;  // Simplemente mostramos la operación y resultado
    historialLista.appendChild(historialItem);
  });
}