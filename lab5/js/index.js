const startBtn = document.querySelector(".startButton")
const restartBtn = document.querySelector(".restartButton")
const difficultySelect = document.getElementById("difficulty")
const colorSelect = document.getElementById("color")
const gameContainer = document.querySelector(".game-container")
const menuContainer = document.querySelector(".menu-container")
const gameMap = document.querySelector(".game-map")
const gameOverScreen = document.querySelector(".game-over")
const scoreDisplay = document.getElementById("score")
const timeDisplay = document.getElementById("time")
const finalScoreDisplay = document.getElementById("final-score")

let score = 0
let timeLeft = 5
let pixel = null
let gameTimer = null
let pixelTimer = null
let scattering = 0;
let pixelColor = ""
let pixelSize = 0;

let getRandomNumber = function (size) {
  return Math.floor(Math.random() * size)
}

function getDifficulty() {
  const difficulty = difficultySelect.value
  console.log(difficulty);
  switch (difficulty) {
    case "easy":
      return { delay: 10, scattering: 8, pixelSize: 30 }
    case "normal":
      return { delay: 5, scattering: 4, pixelSize: 20}
    case "hard":
      return { delay: 2, scattering: 2, pixelSize: 10}
    default:
      alert("Ти як це зробив?")
      return { delay: 100, scattering: 1 }
  }
}

function getTarget() {
  const color = colorSelect.value
  console.log(color);
  switch (color) {
    case "red":
      return pixelColor = "red";
    case "green":
      return pixelColor = "green";
    case "blue":
      return pixelColor = "blue";
    default:
      alert("Ти як це зробив?")
      return pixelColor = "black";
  }
}


function start() {
  const { delay, scattering, pixelSize } = getDifficulty()
  getTarget()
  menuContainer.style.display = "none"
  gameOverScreen.style.display = "none"
  gameContainer.style.display = "contents"

  score = 0;
  const width = gameMap.clientWidth 
  const height = gameMap.clientHeight
  const spawnWidth = width / scattering
  const spawnHeight = height / scattering

  pixel = document.createElement("div")
  pixel.className = "pixel"
  pixel.style.backgroundColor = pixelColor;
  pixel.style.left = `${getRandomNumber(spawnWidth) + width / 2 - spawnWidth / 2}px`
  pixel.style.top = `${getRandomNumber(spawnHeight) + height / 2 - spawnHeight / 2}px`
  pixel.style.width = `${pixelSize}px`
  pixel.style.height = `${pixelSize}px`
  pixel.style.position = "absolute"
  gameMap.appendChild(pixel)

  pixel.addEventListener("click", function () {

    
    pixel.style.left = `${getRandomNumber(spawnWidth) + width / 2 - spawnWidth / 2}px`
    pixel.style.top = `${getRandomNumber(spawnHeight) + height / 2 - spawnHeight / 2}px`

    score += 1
    scoreDisplay.textContent = score

    restartTimer()

    console.log("клік по пікселю")
  })

  function restartTimer() {
    clearInterval(gameTimer)
    timeLeft = delay
    timeDisplay.textContent = timeLeft
    pixelTimer()
  }

  function pixelTimer() {
    gameTimer = setInterval(() => {
      timeLeft--
      timeDisplay.textContent = timeLeft
      if (timeLeft <= 0) {
        clearInterval(gameTimer)
        gameOverScreen.style.display = "unset"
        gameContainer.style.display = "none"
        finalScoreDisplay.textContent = score
        gameMap.removeChild(pixel)
        console.log("Гра закінчена")
      }
    }, 1000)
  }
}

startBtn.addEventListener("click", function () {
  start()
})

restartBtn.addEventListener("click", function () {
  start()
})  

// Доробити розмір пікселя