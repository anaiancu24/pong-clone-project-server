/* import { Game, Player } from './entities'



const gameWidth = 800
const gameHeight = 800

const fps = 60
const paddleWidth = 100

let player1Score = 0,
  player2Score = 0,
  winner = '',
  gameOver = false;
 


export default class Gamelogic {

  update() {
    const Width = gameWidth,
      Height = gameHeight;
      

    let ballY = Height / 2,
      ballX = Width / 2,
      ballRadius = 6,
      ballSpeedY = 0,
      ballSpeedX = Height / 75;

    let paddle1Y = Height / 2 - (paddleWidth / 2),
      paddle2Y = Height / 2 - (paddleWidth / 2),
      paddleSpeed = 6;



    const reset = function () {
      ballY = Height / 2;
      ballX = Width / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = 0;
    }

    
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
          reset();
        }
      }// vertical 
      if (ballY > Height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }

      // ai paddle movement, limits at canvas boundaries to make it more efficient
      if (!monkey) {
        if (ballY > paddle2Y + paddleWidth / 3 && (paddle2Y + paddleWidth) < Height) {
          paddle2Y += paddleSpeed;
        } else if (ballY < paddle2Y + paddleWidth / 3 && paddle2Y > 0) {
          paddle2Y -= paddleSpeed;
        }
      } else {
        if (keys.isPressed(40) && (paddle2Y + paddleWidth) < Height) { // DOWN
          paddle2Y += paddleSpeed;
        } else if (keys.isPressed(38) && paddle2Y > 0) { // UP
          paddle2Y -= paddleSpeed;
        }
      }

      // player1 paddle movement thanks to
      // http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas
      // same limits as ai for efficiency 
      if (keys.isPressed(83) && (paddle1Y + paddleWidth) < Height) { // DOWN
        paddle1Y += paddleSpeed;
      } else if (keys.isPressed(87) && paddle1Y > 0) { // UP
        paddle1Y -= paddleSpeed;
      }
    }
    // draw default if changing game type, else save last draw 
    const GameOver = function () {
      ballSpeedY = 0;
      paddle1Y = Height / 2 - paddleWidth / 2;
      paddle2Y = Height / 2 - paddleWidth / 2;
      player1Score = 0;
      player2Score = 0;
      
    }
    
    // to block automatic start
    GameOver();
    
    // default 60fps
    setInterval(function () {
      if (gameOver === false) {
        moveAll();
      } else {
        GameOver();
      }
    }, 1000 / fps);
  }

};
 */

