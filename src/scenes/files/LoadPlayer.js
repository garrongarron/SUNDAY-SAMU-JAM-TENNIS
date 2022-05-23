import keyListener from "../../basic/KeyListener.js"
import mouse from "../../basic/Mouse.js"
import { canvas } from "../../basic/Renderer.js"
import scene from "../../basic/Scene.js"
import getPlayerModel from "../../models/player/PlayerLoader.js"
import nick from "../../services/nick.js"
import CustomController from "./CustomController.js"

class LoadPlayer {
    constructor(peerId) {
        this.peerId = peerId
        this.models = []
        this.customController = null
        this.character = null
    }
    start() {
        this.models = [getPlayerModel(this.peerId)]
        Promise.all(this.models).then(models => {
            this.character = models[0]
            console.log(models[0])
            this.character.name = this.peerId
            this.character.position.set(0, 0, 0)
            this.character.rotation.set(0, 0, 0)
            scene.add(this.character)
            ////////////////
            this.customController = new CustomController(this.peerId)
            this.customController.start(this.character)
        })
        if (this.peerId == nick) keyListener.start()
        // if (this.peerId == nick) mouse.setCanvas(canvas)
        // if (this.peerId == nick) mouse.start()
    }
    stop() {
        keyListener.stop()
        // mouse.stop()
        this.customController?.stop()
    }
}

const loadPlayer = new LoadPlayer()

export default loadPlayer

export { LoadPlayer }