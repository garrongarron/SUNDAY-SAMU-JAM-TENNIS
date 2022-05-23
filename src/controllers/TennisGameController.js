import { ammoPromise } from "../physics/Ammo.js";
import spawner from "../scenes/files/Spawner.js"
import nick from "../services/nick.js"

class TennisGameController {
    constructor() {
        this.ball = null
        this.ballBox = new THREE.Box3();
        this.ground = new THREE.Box3();
        this.ground.setFromCenterAndSize(new THREE.Vector3(), new THREE.Vector3(8, .2, 24))
        this.prevY = null
        this.goingUp = false
        this.queue = []
    }
    init() {
        ammoPromise.then(() => {
            this.ball = spawner.getCustomController(nick).physicsController.ball
        })
    }
    up(){
        console.log(this.ball.position.z>0?"RED":"GREEN");
        this.queue.unshift(this.ball.position.z>0?"RED":"GREEN")
        if(this.queue[0]==this.queue[1]){
            console.error("LOOSE", this.queue[0]);
        }
        this.queue.length = 2
    }
    tick() {
        if (this.ball == null) return
        this.ballBox.setFromObject(this.ball)
        if (this.ground.intersectsBox(this.ballBox)) {
            if (this.prevY < this.ball.position.y && !this.goingUp) {
                this.goingUp = true
                this.up()
            }
            if (this.prevY > this.ball.position.y && this.goingUp) {
                this.goingUp = false
            }
            this.prevY = this.ball.position.y
        }
    }
}

const tennisGameController = new TennisGameController()

export default tennisGameController

export { TennisGameController }