import TransitionHandler from "../basic/animations/TransitionHandler.js"
import spawner from "../scenes/files/Spawner.js"
import nick from "../services/nick.js"
import { mode } from "./ModeController.js"


class AnimationController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = null
        this.transitionHandler = null
        this.sentido = true
        this.force = 1
    }
    init(characterController) {
        this.state = characterController.state
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
            // if(this.state.mode == mode.LOW_LEFT || this.state.mode == mode.LOW_RIGHT){
                const body =  spawner.getCustomController(nick).physicsController.ball.userData.physicsBody
                const ball = spawner.getCustomController(nick).physicsController.ball
                // body.setAngularVelocity(new Ammo.btVector3(0, 1, 0));
                let z = -1*THREE.MathUtils.clamp(ball.position.z, -1, 1)
                // body.applyImpulse(new Ammo.btVector3(0, .5, z));
                body.clearForces()
                // body.applyCentralImpulse(new Ammo.btVector3(0, .4, this.sentido ? .5 : -.5));
                
                setTimeout(() => {
                    body.applyCentralImpulse(new Ammo.btVector3(0, .5, z));
                }, 10);
                // setTimeout(() => {
                //     body.applyCentralImpulse(new Ammo.btVector3(0, .4,  this.sentido ? .5 : -.5));
                // }, 20);
                // body.applyForce(new Ammo.btVector3(0, .2, this.sentido?.5:-.5),new Ammo.btVector3(0, 0, 0) );
                console.log('aaa', z )
                this.sentido = !this.sentido
                
            // }
            this.state.mode == mode.IDLE
        }
    }
    tick() {
        if (this.peerId == nick) {
            // console.log('mode', this.state.mode)
        }
        if (this.state.mode == mode.LOW_LEFT) {
            this.transitionHandler.action(2, 2, true)
            return this.reset()
        }
        if (this.state.mode == mode.LOW_RIGHT) {
            this.transitionHandler.action(1, 2, true)
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