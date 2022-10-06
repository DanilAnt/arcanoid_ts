import { Vector } from "~/types";

export class Ball{
    
    private ballImage = new Image();
private speed :Vector;

    constructor(
        private ballSize: number,
        private position: Vector,
        speed: number,
        image : string
    ){
        this.speed = {
            x: speed,
            y: -speed
        }
        this.ballImage.src = image;

    }


    get width() : number {
        return this.ballSize
    }

    get height() : number {
        return this.ballSize
    }

    get pos():Vector {
        return this.position
    }

    get image(){
        return this.ballImage
    }

    changeYDirection():void {
        this.speed.y= -this.speed.y

    }
    setUpDirection():void {
        this.speed.y= -Math.abs( this.speed.y)
    }
    changeXDirection():void {
        this.speed.x = -this.speed.x
    }

    moveBall(){
        this.position.x +=this.speed.x
        this.position.y +=this.speed.y
    }

}