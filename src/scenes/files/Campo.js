import scene from "../../basic/Scene.js";
import cube from "../../basic/shapes/Cube.js";

const campo = () => {
    //campo
    // const campo = cube.clone()
    // campo.scale.set(8, 1, 24)
    // campo.position.y = -.5
    // scene.add(campo);

    //transversal
    const transversal = cube.clone()
    transversal.scale.set(.1, 1, 24)
    transversal.position.y = -.48
    const transversalMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    transversal.material = transversalMaterial
    scene.add(transversal);

    //lineas
    const lineas = cube.clone()
    lineas.scale.set(8.2, 1, 24.2)
    lineas.position.y = -.55
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    lineas.material = material
    scene.add(lineas);

    //area
    const area = cube.clone()
    area.scale.set(14, 1, 40)
    area.position.y = -.6
    scene.add(area);

    //red
    const red = cube.clone()
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    red.material = redMaterial
    red.scale.set(8, 2, .1)
    red.opacity = .5
    red.transparent = true
    scene.add(red);

}

export default campo