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

class Game {
    gameover = false
    score = 0
    view: CanvasView
    bricks: Array<Brick> = []
    paddle: Paddle | undefined
    ball: Ball | undefined


    STAGE_PADDING: number
    STAGE_ROWS: number
    STAGE_COLS: number
    BRICK_PADDING: number
    BRICK_WIDTH: number
    BRICK_HEIGHT: number
    PADDLE_WIDTH: number
    PADDLE_HEIGHT: number
    PADDLE_STARTX: number
    PADDLE_SPEED: number
    BALL_SPEED: number
    BALL_SIZE: number
    BALL_STARTX: number
    BALL_STARTY: number


    constructor() {
        this.view = new CanvasView('#playField')

        this.view.canvas.width = window.innerWidth
        this.view.canvas.height = window.innerHeight

        this.STAGE_PADDING = 10;
        this.STAGE_ROWS = 20;
        this.STAGE_COLS = 10;
        this.BRICK_PADDING =this.view.canvas.height > this.view.canvas.width ? Math.ceil(this.view.canvas.width * 0.0056) : Math.ceil(this.view.canvas.height * 0.0056)
        this.BRICK_WIDTH = this.view.canvas.width * 0.096

        this.BRICK_HEIGHT = this.view.canvas.height * 0.044
        this.PADDLE_WIDTH =this.view.canvas.width * 0.075
        this.PADDLE_HEIGHT =this.view.canvas.height * 0.02
        this.PADDLE_STARTX =this.view.canvas.width / 2 - this.PADDLE_WIDTH
        this.PADDLE_SPEED = 10;
        this.BALL_SPEED = 5;
        this.BALL_SIZE = this.view.canvas.height * 0.015
        this.BALL_STARTX = this.view.canvas.width * Math.random()
        this.BALL_STARTY = this.view.canvas.height - 3 * this.PADDLE_HEIGHT




        window.addEventListener("resize", (e) => { this.resizeHandler(e) })

        this.view.initStartButton(this.startGame.bind(this))
    }
    resizeHandler(e: UIEvent) {
        let resizeRatioX = window.innerWidth / this.view.canvas.width
        let resizeRatioY = window.innerHeight / this.view.canvas.height


        this.resizeCanvas()
        console.log(e, this.view.canvas.width, this.view.canvas.height);
        this.setVariables()

      
        this.setSizes()
        this.setPositions(resizeRatioX, resizeRatioY)
        this.view.clear()
        // console.log(bricks);

        this.view.drawBricks(this.bricks)
        if (this.ball && this.paddle) {
            this.view.drawSprite(this.paddle)
            this.view.drawSprite(this.ball)
        }

    }
    resizeCanvas() {
        this.view.canvas.width = window.innerWidth
        this.view.canvas.height = window.innerHeight
    }
    setVariables(): void {

        this.STAGE_PADDING = 5;
        this.STAGE_ROWS = 20;
        this.STAGE_COLS = 10;
        this.BRICK_PADDING = this.view.canvas.height > this.view.canvas.width ? Math.ceil(this.view.canvas.width * 0.0056) : Math.ceil(this.view.canvas.height * 0.0056)
        this.BRICK_WIDTH = this.view.canvas.width * 0.096

        this.BRICK_HEIGHT = this.view.canvas.height * 0.044
        this.PADDLE_WIDTH =this.view.canvas.width * 0.075
        this.PADDLE_HEIGHT =this.view.canvas.height * 0.02
        this.PADDLE_STARTX =this.view.canvas.width / 2 - this.PADDLE_WIDTH
        this.PADDLE_SPEED = 10;
        this.BALL_SPEED = 5;
        this.BALL_SIZE = this.view.canvas.height * 0.015
        this.BALL_STARTX = this.view.canvas.width * Math.random()
        this.BALL_STARTY = this.view.canvas.height - 3 * this.PADDLE_HEIGHT

    }
    setSizes() {
        if (this.ball) {
            this.ball.width = this.BALL_SIZE
            this.ball.height = this.BALL_SIZE
        }
        if (this.paddle) {
            this.paddle.width = this.PADDLE_WIDTH
            this.paddle.height = this.PADDLE_HEIGHT
        }
        this.bricks.forEach(b => {
            b.width = this.BRICK_WIDTH;
            b.height = this.BRICK_HEIGHT;
        })
    }
    setPositions(resizeRatioX: number, resizeRatioY: number): void {
        if (this.ball) {
            this.ball.pos = { x: resizeRatioX * this.ball.pos.x, y: resizeRatioY * this.ball.pos.y };
        }

        if (this.paddle) {
            this.paddle.pos = { x: resizeRatioX * this.paddle.pos.x, y: resizeRatioY * this.paddle.pos.y };
        }


        this.bricks.forEach(b => {
            b.pos = { x: (resizeRatioX * b.pos.x), y: resizeRatioY * b.pos.y };
        })

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

        this.bricks = [...bricks];
        this.paddle = paddle;
        this.ball = ball;

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

        this.resizeCanvas()
      
        this.setVariables()
        const collision = new Collision()


        const bricks = createBricks(this.STAGE_PADDING, this.BRICK_PADDING, this.BRICK_WIDTH, this.BRICK_HEIGHT)

      
        const ball = new Ball(this.BALL_SIZE, { x: this.BALL_STARTX, y: this.BALL_STARTY }, this.BALL_SPEED, BALL_IMAGE)


        const paddle = new Paddle(PADDLE_SPEED, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, {
            x: this.PADDLE_STARTX,
            y: view.canvas.height - this.PADDLE_HEIGHT - 5
        }, PADDLE_IMAGE)


        this.gameLoop(view, paddle, ball, bricks, collision)

    }
}
setTimeout(() => {
    const game = new Game()
    // Start here
}, 100)






