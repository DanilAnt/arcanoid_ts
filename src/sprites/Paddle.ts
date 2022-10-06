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

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("pointerdown", this.handlePointerDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this))
        document.addEventListener("pointerup", this.handlePointerUp.bind(this));
    }

    handlePointerDown(e : PointerEvent){
        console.log(e);
        if(e.x < window.innerWidth/2){
            this.moveLeft = true;
        }else{
            this.moveRight = true;
        }
        
    }
    handlePointerUp(e : PointerEvent){
        console.log(e);
        if(e.x < window.innerWidth/2){
            this.moveLeft = false;
        }else{
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

    movePaddle(): void {
        if (this.moveLeft) {
            this.position.x -= this.speed
        }

        if (this.moveRight) {
            this.position.x += this.speed
        }
    }


}