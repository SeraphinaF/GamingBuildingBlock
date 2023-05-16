import * as PIXI from "pixi.js"
import carImage from "./images/car.png"
import backgroundImage from "./images/background-rain.jpg"
import hornSoundFile from "url:./audio/car-horn.mp3"
import backgroundSound from "url:./audio/SAX-LOFI-.mp3"
import oldLadyImage from './images/old-lady.png'
import { OldLady } from "./oldlady"
import { Car } from "./car"



export class carGame {

    pixi: PIXI.Application
    loader: PIXI.Loader
    cars: Car[] = []
    oldLadies: OldLady[] = []
    background = backgroundImage

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", backgroundImage)
            .add('carTexture', carImage)
            .add('oldLadyTexture', oldLadyImage)
            .add("hornSound", hornSoundFile)
            .add("jazz", backgroundSound)
        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        console.log(backgroundSound)

        let backgroundJazz = this.loader.resources["jazz"].data!
        backgroundJazz.play() // start button voorkomt error
        console.log(backgroundJazz)

        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.background.x = 0
        this.background.y = 0
        this.pixi.stage.addChild(this.background)

        for (let i = 0; i < 1; i++) {
            let oldLady = new OldLady(this.loader.resources['oldLadyTexture'].texture!)
            this.pixi.stage.addChild(oldLady)
            this.oldLadies.push(oldLady)
    }
        for (let i = 0; i < 1; i++) {
            let car = new Car(this.loader.resources["carTexture"].texture!, this.loader.resources["hornSound"].data!)
            this.pixi.stage.addChild(car)
            this.cars.push(car)
        }


        this.pixi.ticker.add((delta) => this.updateTheStage(delta))
    }

    checkCollision() {
        for (let car of this.cars)
            for (let oldLady of this.oldLadies) {

                if (this.collision(car, oldLady)) {
                     car.carHonk()
                    }
            }
    }

    collision(car: Car, oldLadies: OldLady) {
        const bounds1 = car.getBounds()
        const bounds2 = oldLadies.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    updateTheStage(delta: number) {
        for (let classicCar of this.cars) {
            classicCar.drive()
        }

        for (let lady of this.oldLadies){
             lady.walk()
        }
        this.checkCollision()
    }
}

new carGame();