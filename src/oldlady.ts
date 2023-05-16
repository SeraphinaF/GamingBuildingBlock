import * as PIXI from "pixi.js"

export class OldLady extends PIXI.Sprite {
    speed: number

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.y = 570
        this.x = 990
        this.scale.set(0.5)
        this.speed = 0.1
        this.interactive = true
    }

    walk() {
        this.x -= this.speed
        if (this.x <= -90) {
            this.x = window.innerWidth + 100
        }
    }
}