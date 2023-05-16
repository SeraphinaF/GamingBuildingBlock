import * as PIXI from "pixi.js"


export class Car extends PIXI.Sprite {

    speed: number
    loader: PIXI.Loader
    hornAudio: HTMLAudioElement
    xspeed = 0
    yspeed = 0

    constructor(texture: PIXI.Texture, sound: HTMLAudioElement) {
        super(texture)
        console.log("VROOM VROOM!")
        this.speed = 15
        this.x = 800
        this.y = 670
        this.hornAudio = sound
        this.scale.set(1.5)
        this.anchor.set(0.5)
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.carHonk())

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    doneLoading() {
        console.log("done loading")
    }

    carHonk() {
        this.hornAudio.play()
    }

    drive() {
    //     // this.x -= this.speed
    //     // if (this.x <= -400) {
    //     //     this.x = window.innerWidth + 400
    //     // }
    }

    private onKeyDown(e: KeyboardEvent): void{
        switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
                this.x -= this.speed
                this.scale.x = 1.5
                break;
            case "ARROWRIGHT":
                this.x += this.speed
                this.scale.x = -1.5
                break;      
        }
    }
    
    private onKeyUp(e: KeyboardEvent): void{
        switch (e.key.toUpperCase()) {  
        case "ARROWLEFT":
            this.xspeed = 0
            break;
        case "ARROWRIGHT":
            this.xspeed = 0
            break;           
        }
    }
}
