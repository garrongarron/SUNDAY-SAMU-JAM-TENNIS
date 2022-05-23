import { getDelta } from "../basic/Clock.js"
import { ammoPromise } from "../physics/Ammo.js"
import createBall from "../physics/CreateBall.js"
import createParalellepiped from "../physics/CreateParalellepiped.js"
import initPhysics from "../physics/InitPhysics.js"
import updatePhysics from "../physics/UpdatePhysics.js"
import spawner from "../scenes/files/Spawner.js"

import nick from "../services/nick.js"

class PhysicsController {
    econstructor() {
        this.ready = false
        this.ground = null //this.ground.userData.physicsBody
        this.point = null
        this.ball = null
    }
    init(characterController) {
        ammoPromise.then(() => {
            initPhysics()
            this.ready = true
            const pos = new THREE.Vector3();
            const quat = new THREE.Quaternion();
            pos.set(0, -0.5, 0);
            quat.set(0, 0, 0, 1);
            this.ground = createParalellepiped(11, 1, 24, 0 /*mass*/, pos, quat, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));


            const pos2 = new THREE.Vector3();
            const quat2 = new THREE.Quaternion();
            pos2.set(0, 5, 1);
            quat2.set(0, 0, 0, 1);
            this.ball = createBall( .1 /*mass*/, pos2, quat2, new THREE.MeshPhongMaterial({ color: 0xcc9900 }));
        })
    }
    tick() {
        if (this.ready) {
            updatePhysics(getDelta());
        }
    }
}

const physicsController = new PhysicsController()

export default physicsController

export { PhysicsController }


/*

*/
