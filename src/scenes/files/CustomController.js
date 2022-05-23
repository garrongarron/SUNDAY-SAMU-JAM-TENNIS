import { AnimationController } from "../../controllers/AnimationControllerTennis.js"
import { CameraController } from "../../controllers/CameraControllerTennis.js"
import { CharacterController } from "../../controllers/CharacterController.js"
import { KeyController } from "../../controllers/KeyController.js"
import { MoveController } from "../../controllers/MoveController.js"
import { PhysicsController } from "../../controllers/PhysicsController.js"
import { TennisGameController } from "../../controllers/TennisGameController.js"

class CustomController {
    constructor(peerId) {
        this.model = null
        this.peerId = peerId
        this.character = null
        this.characterController = new CharacterController(this.peerId)
        this.characterController.state['translation'] = { x: 0, y: 0 }
        this.characterController.state['rotation'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['cRotation'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['angle'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['mouse'] = { acumulated: { x: 0, y: 0 }, delta: { x: 0, y: 0 } }
        this.keyController = new KeyController(this.peerId)
        this.moveController = new MoveController()
        this.animationController = new AnimationController(this.peerId)
        this.cameraController = new CameraController(this.peerId)
        this.physicsController = new PhysicsController(this.peerId)
        this.tennisGameController = new TennisGameController(this.peerId)
        
        
    }
    start(character) {
        this.character = character;
        this.character.position.z = 8
        this.character.rotation.y = Math.PI 
        this.characterController.addCharacter(character)
        this.characterController.addController(this.keyController)
        this.characterController.addController(this.moveController)
        this.characterController.addController(this.animationController)
        this.characterController.addController(this.cameraController)
        this.characterController.addController(this.physicsController)
        this.characterController.addController(this.tennisGameController)
        this.characterController.start()
    }
    stop() {
        // scene.remove(this.group)
        this.characterController.stop()
    }
}

export default CustomController