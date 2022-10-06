import { Ball } from '~/sprites/Ball'
import { Paddle } from '~/sprites/Paddle'
import { Brick } from '~/sprites/Brick'

import { CanvasView } from '~/view/CanvasView'
import { Collision } from '~/Collision'
import PADDLE_IMAGE from '~/images/paddle.png'
import BALL_IMAGE from '~/images/ball.png'

import {
    PADDLE_SPEED,
    PADDLE_WIDTH, PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY
} from '~/setup'

import { createBricks } from '~/helpers'
window.addEventListener("resize", () => {
    console.log(12312312);
    window.location.reload();
})
class Game {
    gameover = false
    score = 0
    view: CanvasView

    constructor() {
        this.view = new CanvasView('#playField')

        this.view.initStartButton(this.startGame.bind(this))
    }
    setGameOver(view: CanvasView) {
        view.drawInfo('Game over!')
        this.gameover = false;
    }

    setGameWin(view: CanvasView) {
        view.drawInfo('Game won!')
        this.gameover = false;
    }


    gameLoop(view: CanvasView,
        paddle: Paddle,
        ball: Ball,
        bricks: Brick[], collision: Collision) {


        view.clear()
        // console.log(bricks);

        view.drawBricks(bricks)
        view.drawSprite(paddle)
        view.drawSprite(ball)


        ball.moveBall()


        if ((paddle.isMovingLeft && paddle.pos.x > 0) || (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
            paddle.movePaddle()
        }


        collision.checkBallCollision(ball, paddle, view)

        const colliding = collision.isCollidingBricks(ball, bricks)

        if (colliding) {


            this.score += 1
            view.drawScore(this.score)
        }



        if (this.gameover) return
        requestAnimationFrame(() => {
            this.gameLoop(view, paddle, ball, bricks, collision)
        })

        if (bricks.length === 0 || ball.pos.y > view.canvas.height) {
            this.gameover = true
            view.showStart()
        }
    }

    startGame(view: CanvasView) {
        console.log("Start here!");
        this.gameover = false
        view.hideStart()
        this.score = 0
        view.drawInfo('')
        view.drawScore(0);


        const collision = new Collision()


        const bricks = createBricks()

        const ball = new Ball(BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_SPEED, BALL_IMAGE)


        const paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        }, PADDLE_IMAGE)


        this.gameLoop(view, paddle, ball, bricks, collision)

    }
}
setTimeout(() => {
    const game = new Game()
    // Start here
}, 100)






