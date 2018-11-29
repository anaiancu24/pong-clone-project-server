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