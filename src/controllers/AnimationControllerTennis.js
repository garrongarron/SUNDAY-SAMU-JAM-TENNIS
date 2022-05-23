import TransitionHandler from "../basic/animations/TransitionHandler.js"
import spawner from "../scenes/files/Spawner.js"
import nick from "../services/nick.js"
import { mode } from "./ModeController.js"


class AnimationController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = null
        this.transitionHandler = null
        this.force = 1
        this.inProgress = false
    }
    init(characterController) {
        this.state = characterController.state
        this.character = characterController.character
        if (!this.transitionHandler) {
            this.transitionHandler = new TransitionHandler(characterController.character)

        }
        this.transitionHandler.start()
    }
    stop() {
        this.transitionHandler.stop()
    }
    reset = () => {
        this.transitionHandler.callback = () => {
            this.state.mode == mode.IDLE
        }
    }
    hitBall() {

        const body = spawner.getCustomController(nick).physicsController.ball.userData.physicsBody
        const ball = spawner.getCustomController(nick).physicsController.ball

        // if (this.character.position.distanceTo(ball.position) > 2) return console.log('fail')

        const force = .8
        let z = -1 * THREE.MathUtils.clamp(ball.position.z, -force, force)
        body.setLinearVelocity(new Ammo.btVector3(0, .5, z));
        body.applyCentralImpulse(new Ammo.btVector3(0, .5, z));
    }

    tick() {
        if (this.peerId == nick) {
            // console.log('mode', this.state.mode)
        }
        if (this.state.mode == mode.LOW_LEFT) {
            this.transitionHandler.action(2, 3, true)
            if (!this.inProgress) {
                setTimeout(() => {
                    this.inProgress = false
                    this.hitBall()
                }, 200);
            }
            this.inProgress = true
            return this.reset()
        }
        if (this.state.mode == mode.LOW_RIGHT) {
            this.transitionHandler.action(1, 3, true)
            if (!this.inProgress) {
                setTimeout(() => {
                    this.inProgress = false
                    this.hitBall()
                }, 200);
            }
            this.inProgress = true
            return this.reset()
        }

        if (this.state.mode == mode.RUN_LEFT) {
            this.transitionHandler.action(3, 2, false)
            return this.reset()
        }
        if (this.state.mode == mode.RUN_RIGHT) {
            this.transitionHandler.action(4, 2, false)
            return this.reset()
        }
        if (this.state.translation.y == 1) {
            this.transitionHandler.action(5, 2, false)
            return
        }
        if (this.state.translation.y == -1) {
            this.transitionHandler.action(6, 2, false)
            return
        }
        if (this.state.mode == mode.IDLE) {
            this.transitionHandler.action(0, 1, false)
        }
        // if (this.state.mode == mode.IDLE) {
        //     if (this.state.translation.y == 1) {// console.log('2 adelante');
        //         this.transitionHandler.action(5, 1.2)
        //     } else if (this.state.translation.y == -1) {// console.log('1 atras');
        //         this.transitionHandler.action(6, 1.2)
        //     } else if (this.state.translation.x == -1) {// console.log('1 izquierda');
        //         this.transitionHandler.action(9, 1.2)
        //     } else if (this.state.translation.x == 1) {// console.log('1 Derecha');
        //         this.transitionHandler.action(10, 1.2)
        //     } else {// console.log('0 quieto');
        //         this.transitionHandler.action(4)
        //     }
        // }
        // if (this.state.mode == mode.SHOOTER) {
        //     if (1 == 2) {
        //     } else if (this.state.translation.x == 1) {// console.log('1 izquierda');
        //         this.transitionHandler.action(7, 1.2)
        //     } else if (this.state.translation.x == -1) {// console.log('1 derecha');
        //         this.transitionHandler.action(8, 1.2)
        //     } else if (this.state.translation.y == 1) {// console.log('2 adelante');
        //         this.transitionHandler.action(2, 1.2)
        //     } else if (this.state.translation.y == -1) {// console.log('1 atras');
        //         this.transitionHandler.action(1, 1.2)
        //     } else {// console.log('0 quieto');
        //         this.transitionHandler.action(3)
        //     }
        // }
    }
}

const animationController = new AnimationController()

export default animationController

export { AnimationController }