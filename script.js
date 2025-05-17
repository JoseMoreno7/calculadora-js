const display = document.getElementById("display");

const botonesNumeros = document.querySelectorAll(".btn-num");
const botonesOperaciones = document.querySelectorAll(".btn-op");
const botonesFunciones = document.querySelectorAll(".btn-func");
const botonIgual = document.querySelector(".btn-equals");
const btnHistorial = document.getElementById("btn-historial");
const historialContenedor = document.getElementById("historial");
const historialLista = document.getElementById("historial-lista");

let operacionActual = "";
let historial = [];

botonesNumeros.forEach(boton => {
  boton.addEventListener("click", () => {
    operacionActual += boton.textContent;
    actualizarDisplay();
  });
});

botonesOperaciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;
    if (operacionActual.length > 0 && !esOperador(operacionActual.slice(-1))) {
      operacionActual += valor;
      actualizarDisplay();
    }
  });
});

botonesFunciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operacionActual = "";
    } else if (valor === "⌫") {
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

botonIgual.addEventListener("click", () => {
  let resultado;
  try {
    resultado = eval(operacionActual).toString();
  } catch (error) {
    resultado = "Error";
  }

  historial.push(`${operacionActual} = ${resultado}`);
  if (historial.length > 12) {
    historial.shift();
  }
  actualizarHistorial();
  operacionActual = resultado;
  actualizarDisplay();
});

function actualizarDisplay() {
  display.value = operacionActual;
}

function esOperador(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

btnHistorial.addEventListener("click", () => {
  historialContenedor.classList.toggle("hidden");
});

function actualizarHistorial() {
  historialLista.innerHTML = "";
  historial.forEach((item, index) => {
    const historialItem = document.createElement("div");
    historialItem.classList.add("mb-2", "text-gray-400", "p-2", "bg-gray-800", "text-center", "rounded-md");
    historialItem.innerHTML = item;
    historialLista.appendChild(historialItem);
  });
}