import * as THREE from '/build/three.module.js';

export default class Renderer{

    #quaternion;

    constructor(rendererWidth, rendererHeight, cameraFOV, cameraAspectRatio, cameraNear, cameraFar, position = new THREE.Vector3(0, 0, 4), rotation = new THREE.Vector3()){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(rendererWidth, rendererHeight);

        this.domElement = this.renderer.domElement;

        this.scene = new THREE.Scene();
    
        this.camera = new THREE.PerspectiveCamera(cameraFOV, cameraAspectRatio, cameraNear, cameraFar);
    
        this.camera.position.set(position.x, position.y, position.z);
    
        this.#quaternion = new THREE.Quaternion();
        this.camera.rotation.set(rotation.applyQuaternion(this.#quaternion));
    }

    Render(){
        this.renderer.render(this.scene, this.camera);
    }
}