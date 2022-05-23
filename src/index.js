import sceneHandler from "./scenes/SceneHandler.js";
import sceneList from "./scenes/SceneList.js";

const scenes = sceneHandler.setSceneList(sceneList)
scenes.goTo('game')