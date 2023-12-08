import japaneseNumbers from "./japaneseNumbers.js";

let name = "";
let number = Math.round(Math.random() * 100);
let guesses = 0;

const output = document.querySelector("#output");
const clue = document.querySelector("#clue");
const input = document.querySelector("#clue input");

input.focus();

const handleSubmit = (evt) => {
  evt.preventDefault();

  processInput(input.value);

  input.value = "";
};

const printMessage = (message) => {
  let li = document.createElement("li");
  li.style.color = "white";
  li.style.fontSize = 18 + "px";
  li.style.paddingTop = "5px";

  li.textContent = message;
  output.appendChild(li);
};

printMessage("Введите имя ㊔");

const clearOutput = () => {
  for (let i = 0; i < output.children.length; i++) {
    output.removeChild(output.children[i]);
  }
};

const processInput = (input) => {
  if (!input) return;

  if (!name) {
    name = input;
    clearOutput();
    printMessage(`${input}, я загадал число от 0 до 100. Попробуй отгадать его за минимальное количество попыток. 
     После каждой попытки я буду говорить "мало", "много" или "верно".`);

    return;
  }

  printMessage(input);

  let guess = Number.parseInt(input);

  if (Number.isNaN(guess)) return;
  guesses++;

  if (guess > number) {
    printMessage("Много, попробуй еще раз");
  } else if (guess < number) {
    printMessage("Мало, попробуй еще раз");
  } else if (guess === number) {
    printMessage(
      `Верно! Это число ${guess} или как бы сказали самураи: ${japaneseNumbers[number]}`
    );
    printMessage(`Количество попыток ${guesses}`);

    clue.remove();
  }
};

clue.addEventListener("submit", handleSubmit);
