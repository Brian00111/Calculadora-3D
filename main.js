const calc = document.querySelector(".calculadora");
let result = document.querySelector("#result span");
const numbers = document.querySelector("#numbers");
const operations = document.querySelector("#operations");

let total;
let cuenta1 = "";
let cuenta2 = "";
let operati = "";
let estado = false;
let estadoBefore = false;

const readNumbers = (
  { key, code, textContent, nodeName, parentNode, id },
  tipoDeEvento
) => {
  if (tipoDeEvento === "keydown") {
    let rangoDeNumeros = /Numpad[0-9]/g;
    let operations = /Numpad((Divide)|(Multiply)|(Subtract)|(Add))/g;

    if (rangoDeNumeros.test(code)) {
      writeNumbers(key);
    }

    if (operations.test(code)) {
      if (estado === true) return;
      operati = code.substring(6);
      estado = true;
      result.textContent += key;
    }
  } else {
    let numeros = textContent;
    let actual = nodeName;
    let parent = parentNode.id;

    if (actual === "BUTTON" && parent === "numbers") {
      writeNumbers(numeros);
    }

    if (actual === "BUTTON" && parent === "operations") {
      if (estado === true) return;

      operati = id;
      estado = true;
      result.textContent += textContent;
    }
  }
};

const writeNumbers = (numeros) => {
  if (cuenta1.length >= 8 || cuenta2.length >= 8) {
    result.textContent = "ERR";
    return;
  }

  if (result.textContent.length === 1 && result.textContent === "0")
    result.textContent = "";

  if (estado === false) {
    cuenta1 += numeros;
    result.textContent += numeros;
  } else {
    cuenta2 += numeros;
    result.textContent += numeros;
  }
};

const makeOperation = (actual) => {
  let numeros = [Number(cuenta1), Number(cuenta2)];

  if (total === 0) estadoBefore = false;

  if (
    actual.id === "btnResult" ||
    actual === "Enter" ||
    actual === "NumpadEnter"
  ) {
    estado = false;

    switch (operati) {
      case "Subtract":
        if (estadoBefore === true) {
          total -= numeros[1];
          result.textContent = total;
          operati = "";
          cuenta1 = "";
          cuenta2 = "";
          return;
        }
        total = numeros[0] - numeros[1];
        result.textContent = total;
        operati = "";
        cuenta1 = "";
        cuenta2 = "";
        estadoBefore = true;
        break;

      case "Add":
        if (estadoBefore === true) {
          total += numeros[1];
          result.textContent = total;
          operati = "";
          cuenta1 = "";
          cuenta2 = "";
          return;
        }

        total = numeros.reduce((num, num2) => num + num2, 0);
        result.textContent = total;
        operati = "";
        cuenta1 = "";
        cuenta2 = "";
        estadoBefore = true;
        break;

      case "Multiply":
        if (estadoBefore === true) {
          total *= numeros[1];
          result.textContent = total;
          operati = "";
          cuenta1 = "";
          cuenta2 = "";
          return;
        }
        total = numeros[0] * numeros[1];
        result.textContent = total;
        operati = "";
        cuenta1 = "";
        cuenta2 = "";
        estadoBefore = true;
        break;

      case "Divide":
        if (estadoBefore === true) {
          total /= numeros[1];
          result.textContent = total;
          operati = "";
          cuenta1 = "";
          cuenta2 = "";
          return;
        }
        total = numeros[0] / numeros[1];
        result.textContent = total;
        operati = "";
        cuenta1 = "";
        cuenta2 = "";
        estadoBefore = true;
        break;
    }
  }
};

const deleteLastEntries = (e) => {
  if (e === "Backspace") {
    if (result.textContent.length < 2) {
      cuenta1 = "";
      cuenta2 = "";
      result.textContent = "";
      result.textContent += 0;
      return;
    }
    result.textContent = result.textContent.slice(0, -1);
  }
  if (e === "Delete") {
    total = 0;
    operati = "";
    cuenta1 = "";
    cuenta2 = "";
    result.textContent = "";
    result.textContent += 0;
    estadoBefore = false;
  }
};

window.addEventListener("keydown", (e) => {
  readNumbers(e, e.type);

  if (e.code.indexOf("Enter") === 0 || e.code.indexOf("Enter") === 6) {
    makeOperation(e.code);
  }
  if (e.code === "Backspace" || e.code === "Delete") {
    deleteLastEntries(e.code);
  }
});

calc.addEventListener("click", (e) => {
  readNumbers(e.target);
  makeOperation(e.target);
  deleteLastEntries(e.target.id);
});
