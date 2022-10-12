import { Ball } from '~/sprites/Ball'
import { Paddle } from '~/sprites/Paddle'
import { Brick } from '~/sprites/Brick'

import { CanvasView } from '~/view/CanvasView'
type Side = 'left' | 'right' | 'top' | 'bottom' | false

export class Collision {

    collidingSide(ball: Ball, brick: Brick | Paddle): Side {


        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y + ball.height > brick.pos.y &&
            ball.pos.y < brick.pos.y + brick.height
        ) {
            let distTop = ball.pos.y + ball.height - brick.pos.y
            let distBottom = brick.pos.y + brick.height - ball.height - ball.pos.y
            let distLeft = ball.pos.x + ball.width - brick.pos.x
            let distRight = brick.pos.x + brick.width - ball.width - ball.pos.x

            if (
                distTop <= distBottom && distTop <= distRight && distTop <= distLeft
            ) {
                return 'top'
            } else if (distBottom <= distRight && distBottom <= distLeft && distBottom <= distTop
            ) {
                return 'bottom'
            } else if (
                distLeft <= distRight && distLeft <= distTop && distLeft <= distBottom
            ) {
                return 'left'
            } else {
                return 'right'
            }
        }
        return false
    }



    isCollidingBricks(ball: Ball, bricks: Array<Brick>): boolean {

        let isColliding = false;

        bricks.forEach((brick, index) => {
            let brickSide = this.collidingSide(ball, brick)
            if (brickSide) {
                if (brickSide === 'left' || brickSide === 'right') {
                    ball.changeXDirection()
                } else {
                    ball.changeYDirection()
                }


                if (brick.energy === 1) {
                    bricks.splice(index, 1)
                } else {
                    brick.energy -= 1;
                } isColliding = true
            }


        })

        return isColliding

    }

    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        let paddleCollidingSide = this.collidingSide(ball, paddle)
        if (paddleCollidingSide === 'top') {
            ball.setUpDirection()
        } else if (paddleCollidingSide === 'left' || paddleCollidingSide === 'right') {
            ball.changeXDirection()
        }

        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
            ball.changeXDirection()
        }

        if (ball.pos.y < 0) {
            ball.changeYDirection()
        }



    }
}