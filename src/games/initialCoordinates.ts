const Width = 1100
const Height = 800
const fps = 60

const paddleWidth = 100

const ballY = Height / 2
const ballX = Width / 2
const ballRadius = 6
const ballSpeedY = 0
const ballSpeedX = Height / 75

const paddle1YInitial = Height / 2 - (paddleWidth / 2)
const paddle2YInitial = Height / 2 - (paddleWidth / 2)
const paddleSpeed = 6


export const coordinates = {
  width: Width,
  height: Height,
  fps: fps,
  ballY: ballY,
  ballX: ballX,
  ballRadius: ballRadius,
  ballSpeedY: ballSpeedY,
  ballSpeedX: ballSpeedX,
  paddle1Y: paddle1YInitial,
  paddle2Y: paddle2YInitial,
  paddleSpeed: paddleSpeed,
}