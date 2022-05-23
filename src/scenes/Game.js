import camera from "../basic/Camera.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import renderer from "../basic/Renderer.js";
import resize from "../basic/Resize.js";
import scene from "../basic/Scene.js";
// import cube from "../basic/shapes/Cubeq.js";
// import plane from "../basic/shapes/Plane.js";
// import sphere from "../basic/shapes/Sphere.js";
import nick from "../services/nick.js";
import campo from "./files/Campo.js";
import spawner from "./files/Spawner.js";

class Game {
    open(sceneHandler) {
        this.sceneHandler = sceneHandler

        campo()
        const player = spawner.createPlayer(nick)
        player.start()
        
        // scene.add(sphere);
        scene.add(light);
        loopMachine.addCallback(this.render);
        loopMachine.start()
        camera.position.set(0, 3,15)
        resize.start(renderer)
    }

    render = () => {
        renderer.render(scene, camera)
    }

    next = (e) => {
        this.sceneHandler.goTo('menu')
        e.preventDefault()
        e.stopPropagation()
    }

    close() { }
}
export default Game
