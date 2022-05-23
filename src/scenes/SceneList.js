import lazyLoad from "../basic/LazyLoad.js"

let sceneList = {
    get 'game'(){ return lazyLoad(location.origin+'/SUNDAY-SAMU-JAM-TENNIS/src/scenes/Game.js')}
}

export default sceneList



