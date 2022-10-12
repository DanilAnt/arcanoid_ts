import { Brick } from '~/sprites/Brick'
import {
    BRICK_IMAGES,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_ENERGY
} from '~/setup'

export function createBricks(STAGE_PADDING:number, BRICK_PADDING: number,BRICK_WIDTH: number,BRICK_HEIGHT: number, ): Array<Brick> {
    return LEVEL.reduce((acc: Array<Brick>, cell: number, i: number): Array<Brick> => {
        const row = Math.floor((i + 1) / STAGE_COLS);
        const col = i % STAGE_COLS;

        const x = STAGE_PADDING + col * (BRICK_PADDING + BRICK_WIDTH)
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

        if (cell === 0) return acc

        return [...acc, new Brick(BRICK_WIDTH, BRICK_HEIGHT, { x, y }, BRICK_ENERGY[cell], BRICK_IMAGES[cell])]




    }, [] as Array<Brick>)
}