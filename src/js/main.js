import japaneseNumbers from "./japaneseNumbers.js";

let name = "";
let number = Math.round(Math.random() * 100);
let attemps = 0;

const output = document.querySelector("#output");
const clue = document.querySelector("#clue");
const input = document.querySelector("#clue input");
const clueNumber = document.querySelector("#clueNumber");
const inputNumber = document.querySelector("#clueNumber input");
const selectNumber = document.querySelector("#clueNumber select");
const hint = document.querySelector("#hint");
const notice = document.querySelector("#notice");
const button = document.querySelector(".button");

for (let i = 1; i <= 500; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = i;
  selectNumber.appendChild(option);
}

input.focus();

const handleSubmitInputName = (evt) => {
  evt.preventDefault();

  processInput(input.value);
  inputNumber.focus();

  input.value = "";
};

const handleSubmitInputNumber = (evt) => {
  evt.preventDefault();

  processInputNumber(inputNumber.value);
  inputNumber.value = "";
};

const printMessage = (message, japaneseNumbers) => {
  let li = document.createElement("li");
  let span = document.createElement("span");
  li.style.color = "white";
  span.style.color = "rgb(252, 144, 252)";
  li.style.fontSize = 18 + "px";
  span.style.fontSize = 24 + "px";
  li.style.paddingTop = "5px";

  li.textContent = message;
  span.textContent = japaneseNumbers;
  output.appendChild(li);
  output.appendChild(span);
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
     После каждой попытки я буду говорить "мало", "много" или "верно". Как придумаете число - нажимайте Enter.`);

    clue.style.display = "none";
    clueNumber.style.display = "flex";

    return;
  }
};

const processInputNumber = (inputNumber) => {
  printMessage(inputNumber);

  let guess = +inputNumber;

  if (Number.isNaN(guess)) return;
  attemps++;

  if (guess > number) {
    printMessage("Много, попробуй еще раз");
  } else if (guess < number) {
    printMessage("Мало, попробуй еще раз");
  } else if (guess === number) {
    printMessage(
      `Верно! Это число ${guess} или как бы сказали самураи: `,
      japaneseNumbers[number]
    );
    printMessage(`Количество попыток ${attemps}`);

    clueNumber.remove();
  }

  // Если количество попыток достигло трех
  if (attemps % 3 === 0) {
    // Показываем подсказку о четности или нечетности числа
    hint.style.display = "block";

    if (guess % 2 === 0) {
      hint.innerText = "Число нечетное";
    } else {
      hint.innerText = "Число четное";
    }
  } else {
    // Скрываем подсказку
    hint.style.display = "none";
  }

  if (guess < 1 || guess > 100) {
    notice.textContent =
      "Число должно быть в диапазоне от 1 до 100 включительно";
  } else {
    notice.textContent = "";
  }
};

const reloadPage = () => {
  location.reload();
};

clue.addEventListener("submit", handleSubmitInputName);
clueNumber.addEventListener("submit", handleSubmitInputNumber);
button.addEventListener("click", reloadPage);
selectNumber.addEventListener("change", () => {
  inputNumber.value = selectNumber.value;
  inputNumber.focus();
});
