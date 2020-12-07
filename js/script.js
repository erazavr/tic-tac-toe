const box = document.querySelector("#box");
resetBtn = document.querySelector("#reset");
currMove = document.querySelector("#currMove");

let ai = "X";
let human = "O";
let currentPlayer = human;

// Цикл в котором добавляю 9 квадртиков в box, где позднее буду рисовать Х или 0
for (let i = 0; i < 9; i++) {
  let div = document.createElement("div");
  div.classList.add("box__item");
  box.appendChild(div);
}

let counter = 0;
box.addEventListener("click", init);

// Функция для отрисовки Х или 0

function init(e) {
  if (e.target.innerHTML) return; // Если внутри кликнутого квадратика есть текст, просто ретёрним, чтобы не поменять innerHTML

  // Если counter при делении на 2 не имеет остатка, то отрисуется Х, иначе 0
  if (counter % 2 == 0) {
    currMove.innerHTML = "O";
    e.target.innerHTML = "X";
  } else {
    currMove.innerHTML = "X";
    e.target.innerHTML = "O";
  }
  counter++;
  checkWinner();
}

// Функция, чтобы начать игру занаво
resetBtn.addEventListener("click", () => {
  const boxItems = document.querySelectorAll(".box__item"); // Массив кдвадратиков
  clear(boxItems);
});

// Фукнция, чтобы узнать кто победил

const checkWinner = () => {
  const boxItems = document.querySelectorAll(".box__item");
  sX = document.querySelector("#sX");
  sO = document.querySelector("#sO");
  sD = document.querySelector("#sD");

  // Массив победных комбинаций
  let arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Объект, в котором храню количество побед
  const stats = {
    x: 0,
    o: 0,
    d: 0,
  };
  // Цикл, где определяю кто победил

  for (let i = 0; i < arr.length; i++) {
    if (
      boxItems[arr[i][0]].innerHTML === "X" &&
      boxItems[arr[i][1]].innerHTML === "X" &&
      boxItems[arr[i][2]].innerHTML === "X"
    ) {
      counter = 0; // Обнуляю counter, чтобы не выскакивал alert(ничья) при победе
      setTimeout(function () {
        //Функция выполнится спустя 100 миллисекунд, чтобы сначала отрисовался символ, а потом уже alert
        alert("Победили крестики"); // Объявляю победителя
      }, 100);
      stats.x++; // Увеличиваю значение в объекте на 1 при победе
      sX.innerHTML = +sX.innerHTML + stats.x; // Присваю нужное значение
      box.removeEventListener("click", init); // Убираю возможность кликать после победы
    } else if (
      boxItems[arr[i][0]].innerHTML === "O" &&
      boxItems[arr[i][1]].innerHTML === "O" &&
      boxItems[arr[i][2]].innerHTML === "O"
    ) {
      counter = 0;
      setTimeout(function () {
        alert("Победили нолики");
      }, 100);
      stats.o++;
      sO.innerHTML = +sO.innerHTML + stats.o;
      box.removeEventListener("click", init);
    }
  }
  // Проверка на ничью
  if (counter === 9) {
    setTimeout(function () {
      alert("Ничья");
    }, 100);
    stats.d++;
    sD.innerHTML = +sD.innerHTML + stats.d;
  }
};
bestMove();
// Фукнция для очистки игры
const clear = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].innerHTML = ""; //Убираем текст из каждого элмента массива
    currMove.innerHTML = "X";
    counter = 0;
    box.addEventListener("click", init); // Заново добавляем событие клик
  }
};
