import { Vector } from "~/types";

export class Brick {
    private brickImage = new Image();


    constructor(

        private brickWidth: number,
        private brickHeight: number,
        private position: Vector,
        private brickEnergy: number,
        image: string
    ) {


        this.brickImage.src = image;
    }

    get width(): number {
        return this.brickWidth
    }

    get height(): number {
        return this.brickHeight
    }

    get pos(): Vector {
        return this.position
    }

    get energy(): number {
        return this.brickEnergy
    }

    get image(): HTMLImageElement {
        //  console.log(this.brickImage);

        return this.brickImage
    }


    set energy(energy: number) {
        this.brickEnergy = energy
    }

    set width(width: number) {
        this.brickWidth = width
    }

    set height(height: number) {
        this.brickHeight = height
    }

    set pos(pos: Vector) {
        this.position.x = pos.x
        this.position.y = pos.y
    }
}