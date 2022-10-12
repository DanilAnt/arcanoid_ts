import { Vector } from "~/types";

export class Paddle {
    private paddleImage = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(
        private speed: number,
        private paddleWidth: number,
        private paddleHeight: number,
        private position: Vector,
        image: string
    ) {
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage.src = image;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            document.addEventListener("pointerdown", this.handlePointerDown.bind(this));
            document.addEventListener("pointerup", this.handlePointerUp.bind(this));
        }else{
            document.addEventListener("keydown", this.handleKeyDown.bind(this));
            document.addEventListener("keyup", this.handleKeyUp.bind(this))
          
        }
       
    }

    handlePointerDown(e: PointerEvent) {
        console.log(e);
        if (e.x < window.innerWidth / 2) {
            this.moveLeft = true;
            this.moveRight = false;
        } else {
            this.moveRight = true;
            this.moveLeft = false;
        }

    }
    handlePointerUp(e: PointerEvent) {
        console.log(e);
        if (e.x < window.innerWidth / 2) {
            this.moveLeft = false;
        } else {
            this.moveRight = false;
        }

    }
    handleKeyDown(e: KeyboardEvent) {
        console.log(13123);

        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
            this.moveLeft = true;
        } if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
            this.moveRight = true;
        }
    }

    handleKeyUp(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
            this.moveLeft = false;
        } if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
            this.moveRight = false;
        }
    }

    get width(): number {
        return this.paddleWidth
    }

    get height(): number {
        return this.paddleHeight
    }

    get pos(): Vector {
        return this.position
    }

    get image(): HTMLImageElement {
        return this.paddleImage
    }

    get isMovingLeft(): boolean {
        return this.moveLeft
    }

    get isMovingRight(): boolean {
        return this.moveRight
    }

    set width(width: number) {
        this.paddleWidth = width
    }

    set height(height: number) {
        this.paddleHeight = height
    }

    set pos(pos: Vector) {
        this.position.x = pos.x
        this.position.y = pos.y
    }

    movePaddle(): void {
        if (this.moveLeft) {
            this.position.x -= this.speed
        }

        if (this.moveRight) {
            this.position.x += this.speed
        }
    }


}