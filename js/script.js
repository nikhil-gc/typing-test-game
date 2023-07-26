// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");
const themeButton = document.getElementById("theme-btn");

// const loadDataFromLocalstorage = () => {
//   // Load theme from local storage and apply/add on the page
//   const themeColor = localStorage.getItem("themeColor");

//   document.body.classList.toggle("light-mode", themeColor === "light_mode");
// }

// themeButton.addEventListener("click", () => {
//   // Toggle body's class for the theme mode and save the updated theme to the local storage 
//   document.body.classList.toggle("light-mode");
//   btn = document.getElementById("theme-text");
//   localStorage.setItem("themeColor", btn.innerHTML);

//   btn.innerHTML = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
// });


function changeTheme(){
  btn = document.getElementById("theme-text");
  console.log(btn.innerHTML);
  if(btn.innerHTML==="light_mode"){
    btn.innerHTML="dark_mode";
    container = document.getElementById('container');
    container.style.backgroundColor = "#CEE6F3";
    themeButton.style.backgroundColor = "#2c3e50";
    container.style.color = "black";
    document.body.style.backgroundColor = "white";

  }else{
    btn.innerHTML="light_mode";
    container = document.getElementById('container');
    container.style.backgroundColor = "#34495e";
    container.style.color = "white";
    themeButton.style.backgroundColor = "white";
    document.body.style.backgroundColor = "#2c3e50";
  }
}
// list of words for game
const words = [
  "came",
  "come",
  "letter",
  "end",
  "I",
  "all",
  "number",
  "oil",
  "within",
  "now",
  "right",
  "feet",
  "leave",
  "what",
  "now",
  "fall",
  "came",
  "live",
  "year",
  "about",
  "got",
  "came",
  "set",
  "were",
  "follow",
  "study",
  "day",
  "eye",
  "over",
  "why",
  "why",
  "talk",
  "soon",
  "because",
  "eye",
  "watch",
  "year",
  "her",
  "any",
  "by",
  "I",
  "both",
  "around",
  "book",
  "line",
  "mother",
  "open",
  "now",
  "that",
  "mile",
  "go",
  "by",
  "found",
  "said",
  "eye",
  "come",
  "so",
  "place",
  "food",
  "got",
  "city",
  "always",
  "these",
  "any",
  "use",
  "been",
  "was",
  "read",
  "their",
  "without",
  "as",
  "change",
  "leave",
  "can",
  "they",
  "those",
  "eat",
  "never",
  "no",
  "eat",
  "story",
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 5;

// wrong typed words and total words
let wrongTyped = 0;
let correctTyped = 0;

// Set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on text on start
text.focus();

// count down
const timeInterval = setInterval(updateTime, 1000);

// Random words generator from Array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    //   game over
    gameOver();
  }
}

// show Game over
function gameOver() {
  let accuracy = ((correctTyped/(correctTyped+wrongTyped))*100).toFixed(2);
  endGameElement.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is : ${score}</p>
  <p>Your accuracy is : ${(accuracy)}</p>
  <button onclick="location.reload()" style="
  background: #4e5e73; color: #fff;">Reload</button>
    `;

  endGameElement.style.display = "flex";
}

addWordToDOM();

// Typing Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 2;
    } else {
      time += 3;
    }
    updateTime();
    correctTyped++;
  }else{
    if(insertedText.length === randomWord.length)
      wrongTyped++;
  }
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
