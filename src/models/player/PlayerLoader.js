import AnimationLoader from "../../basic/animations/AnimationLoader.js";
import PromiseLoader from "../../basic/PromiseLoader.js";
import fileList from "./FileList.js";


const folder = 'src/models/player/'

const urlAnimations = {}
for (const [key, value] of Object.entries(fileList)) {
    urlAnimations[key] = folder + 'animations/' + value
}

const urlModel = folder + 'Ch46_nonPBR.fbx'
let model = null
const playerContainer = {}
const getPlayerModel = (peerId) => {
    // if(model) return model
    const animationLoader = new AnimationLoader(urlModel, urlAnimations)
    const promiseLoader = new PromiseLoader(THREE.FBXLoader, function (object) {
        const scale = .01
        object.scale.set(scale, scale, scale)
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object.castShadow = true;
        object.receiveShadow = true;
        object.name = peerId
        return object
    })
    animationLoader.addPromiseLoader(promiseLoader)
    model = animationLoader.getModelWithAnimations()
    playerContainer[peerId] = model //promise 
    return model //promise
}

export default getPlayerModel

export { playerContainer }
