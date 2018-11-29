import { Game } from './entities'
import { io } from '../index'

const Width = 1100
const Height = 800
const paddleWidth = 100

const ballY = Height / 2
const ballX = Width / 2
const ballSpeedY = 0
const ballSpeedX = Height / 75

const paddle1YInitial = Height / 2 - (paddleWidth / 2)
const paddle2YInitial = Height / 2 - (paddleWidth / 2)

export const coordinates = {
  ballY: ballY,
  ballX: ballX,
  ballSpeedY: ballSpeedY,
  ballSpeedX: ballSpeedX,
  paddle1Y: paddle1YInitial,
  paddle2Y: paddle2YInitial,
}

export const startBallLoop = (gameId) => {
  setInterval(() => {
    ballLoop(gameId)
  }, 1000)
}

const ballLoop = async (gameId) => {
  const game = await Game.findOneById(gameId)
  const coordinates = game!.coordinates
  const score1 = game!.players[0].score
  const score2 = game!.players[1].score
  const { ballX, ballY, ballSpeedX, ballSpeedY, paddle1Y, paddle2Y } = coordinates

  let newBallX
  let newBallY
  let newBallSpeedX
  let newBallSpeedY
  let newScore1
  let newScore2
  console.log(ballX)


  newBallX = ballX + ballSpeedX
  newBallY = ballY + ballSpeedY
  console.log(newBallX)

  if (newBallX > Width || newBallX < 0) {

    if (newBallX > Width / 2 && (newBallY <= paddle2Y && newBallY <= paddle2Y + paddleWidth)) {
      newBallSpeedX = -ballSpeedX

      let deltaY = newBallY - (paddle2Y + paddleWidth / 2);
      newBallSpeedY = deltaY * 0.35;

    } else if (newBallX < Width / 2 && (newBallY >= paddle1Y && newBallY <= paddle1Y + paddleWidth)) {
      newBallSpeedX = -ballSpeedX

      let deltaY = newBallY - (paddle1Y + paddleWidth / 2);
      newBallSpeedY = deltaY * 0.35;
    }
    else {
      if (newBallX < Width / 2) {
        newScore2 = score2 + 1
      } else {
        newScore1 = score1 + 1
      }
      newBallY = Height / 2;
      newBallX = Width / 2;
      newBallSpeedX = -ballSpeedX;
      newBallSpeedY = 0;
    }
  }
  if (newBallY > Height || newBallY < 0) {
    newBallSpeedY = -ballSpeedY;
  }
  game!.coordinates.ballX = newBallX
  game!.coordinates.ballY = newBallY
  game!.coordinates.ballSpeedX = newBallSpeedX
  game!.coordinates.ballSpeedY = newBallSpeedY

  game!.players[0].score = newScore1
  game!.players[1].score = newScore2

  await game!.save()

  io.emit('action', {
    type: 'UPDATE_GAME',
    payload: game
  })
}









/* 
// move stuff begore drawing again
const moveAll = function () {

  // ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // horizontal 
  if (ballX > Width || ballX < 0) {

    // right side collision
    if (ballX > Width / 2 &&
      (ballY >= paddle2Y && ballY <= paddle2Y + paddleWidth)) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle2Y + paddleWidth / 2);
      ballSpeedY = deltaY * 0.35;
    } else if (ballX < Width / 2 &&
      (ballY >= paddle1Y && ballY <= paddle1Y + paddleWidth)) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle1Y + paddleWidth / 2);
      ballSpeedY = deltaY * 0.35;
    }
    else {
      if (ballX < Width / 2) {
        player2Score++;
        if (player2Score === 11) {
          winner = "PLAYER2"
          gameOver = true;
        }
      } else {
        player1Score++;
        if (player1Score === 11) {
          winner = "PLAYER1"
          gameOver = true;
        }
      }
      reset();0
    }
  }// vertical 
  if (ballY > Height || ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  setInterval(function () {
    if (gameOver === false) {
      moveAll();
      drawAll();
    } else {
      GameOver();
    }
  }, 1000 / fps);
}

const GameOver = function () {
  ballSpeedY = 0;
  paddle1Y = Height / 2 - paddleWidth / 2;
  paddle2Y = Height / 2 - paddleWidth / 2;
  player1Score = 0;
  player2Score = 0;
  ctx.textAlign = "center";
  if (winner !== "") {
    ctx.fillStyle = "#888";
    ctx.font = "36px Orbitron";
    ctx.fillText(winner + " WON!", Width / 2, 150);
  } else {
    ballY = Height / 2;
    ballX = Width / 2;
    drawAll();
    gameOver = true;
  }
  ctx.font = "14px Roboto Mono";
  ctx.fillText("Click anywhere to start a new game.", Width / 2, 200);
  document.addEventListener("mousedown", function () {
    gameOver = false;
    winner = "";
  });
} */