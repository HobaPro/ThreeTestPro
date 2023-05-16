import * as THREE from '/build/three.module.js';
import * as Light from './Light.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
/*const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/jsm/libs/draco/');
loader.setDRACOLoader( dracoLoader );*/

// Load a glTF resource

let num = 0;
function findType(object, type) {
    console.log(num);
    num++;
    object.children.forEach((child) => {
        if (child.type.match(type)) {
            console.log(child);
        }
        findType(child, type);
    });
}
function st(){

    console.log(num);
    num++;

    st();
}

//st();

export function LoadModel(scene){
    loader.load('/assets/models/donkey.gltf', function ( gltf ) {

    
        scene.add( gltf.scene );
    
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        findType(gltf.scene, "Mesh");
        console.log(gltf.scene);
        //gltf.scene.getObjectByName("Cube_1").material.color.setHex(0x00FF00);
    
    }, function ( xhr ) {
    
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
    }, function ( error ) {
    
        console.error( `HobaPro Say Error is: ${error}` );
    
    });
}