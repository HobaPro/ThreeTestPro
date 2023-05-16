import * as THREE from '/build/three.module.js';

import Renderer from './renderer.js';
import * as Mesh from './Mesh.js';
import * as Light from './Light.js';

import { OrbitControls } from '/jsm/controls/OrbitControls.js';
//import { DragControls } from '/jsm/controls/DragControls.js';

import Stats from '/jsm/libs/stats.module.js'
import * as dat from '/dat.gui/build/dat.gui.module.js';

import { LoadModel } from './loadModel.js';

/* -------------- Textures -------------- */

//import ground_1defuse from "/assets/textures/ground_1/defuse.jpg";

/* -------------- End Textures -------------- */ 

const gui = new dat.GUI();



const renderer = new Renderer(window.innerWidth, window.innerHeight, 75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.camera.position.y = 30;
renderer.camera.rotation.x = 90;

document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const orbitControls = new OrbitControls(renderer.camera, renderer.domElement)
orbitControls.update();

const skyMaterial = new THREE.MeshBasicMaterial({
    color: "#fff",
    //map: new THREE.TextureLoader().load("/assets/textures/sky.jpg"),
    side: THREE.DoubleSide,
})

const sky = new Mesh.Box(renderer.scene, new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(1000, 1000, 1000), skyMaterial);

console.log(sky.mesh.position);

const skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 2 );
renderer.scene.add(skyLight);

//const directionaLight = new Light.DirectionaLight(renderer.scene, 0xffffff, 1, new THREE.Vector3(0, 100, 0));
//const spotLight = new Light.SpotLight(renderer.scene, null, 5, 20, null, null, null, new THREE.Vector3(0, 10, 0));

const gound_1Defuse = textureLoader.load("/assets/textures/ground_1/defuse.jpg");
gound_1Defuse.wrapS = THREE.RepeatWrapping;
gound_1Defuse.wrapT = THREE.RepeatWrapping;
gound_1Defuse.repeat.set( 15, 15 );

const gound_1AO = textureLoader.load("/assets/textures/ground_1/ao.jpg");
gound_1AO.wrapS = THREE.RepeatWrapping;
gound_1AO.wrapT = THREE.RepeatWrapping;
gound_1AO.repeat.set( 15, 15 );

const gound_1Displacement = textureLoader.load("/assets/textures/ground_1/displacement.jpg");
gound_1Displacement.wrapS = THREE.RepeatWrapping;
gound_1Displacement.wrapT = THREE.RepeatWrapping;
gound_1Displacement.repeat.set( 15, 15 );

const gound_1Normal = textureLoader.load("/assets/textures/ground_1/normal.jpg");
gound_1Normal.wrapS = THREE.RepeatWrapping;
gound_1Normal.wrapT = THREE.RepeatWrapping;
gound_1Normal.repeat.set( 15, 15 );

const gound_1Roughness = textureLoader.load("/assets/textures/ground_1/roughness.jpg");
gound_1Roughness.wrapS = THREE.RepeatWrapping;
gound_1Roughness.wrapT = THREE.RepeatWrapping;
gound_1Roughness.repeat.set( 15, 15 );

const mask_1 = textureLoader.load("/assets/textures/ground_1/mask_1.jpg")

/*const layer01Data = {
    map: gound_1Defuse,
    direction: new THREE.Vector2(0.7, -0.5),
    speed: 0.00008,
    repeat: new THREE.Vector2(1, 1),
}

const layer02Data = {
    map: gound_1Normal,
    direction: new THREE.Vector2(0.7, 0.7),
    speed: 0.00005,
    repeat: new THREE.Vector2(2, 2),
}*/


/*const layer01Data = {
    map: gound_1Defuse,
    repeat: new THREE.Vector2(1, 1),
}

const layer02Data = {
    map: gound_1Normal,
    repeat: new THREE.Vector2(2, 2),
}*/

const plane01VertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vuv;

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vuv = uv;
    }
`;
const plane01FragmentShader = `
    precision mediump float;

    uniform vec3 opp;
    uniform sampler2D layer01;
    uniform sampler2D layer02;
    uniform sampler2D mask;

    varying vec2 vuv;

    void main(void){

        vec4 layer01 = texture2D(layer01, vuv);
        vec4 layer02 = texture2D(layer02, vuv);
        vec4 mask = texture2D(mask, vuv);

        vec4 st = vec4(opp, 1.0);

        vec4 kk = ((layer01 * mask) + vec4(1.0, 1.0, 1.0, 1.0)) * st;

        gl_FragColor = kk;
    }
`;


const planeMat = new THREE.RawShaderMaterial({
    uniforms: {

        layer01: {
            value: gound_1Defuse
        },

        layer02: {
            value: gound_1Normal
        },
        mask: {
            value: mask_1,
        },
        opp: {
            value: new THREE.Vector3(1.0, 1.0, 1.0),
        },
    },

    vertexShader: plane01VertexShader,

    fragmentShader: plane01FragmentShader,

    wireframe: false,
});

gui.addColor({
    color: "#fff",
}, "color").onChange((e) => {
    planeMat.uniforms.opp.value = new THREE.Vector3(new THREE.Color(e).r, new THREE.Color(e).g, new THREE.Color(e).b);
});

const st = new THREE.MeshBasicMaterial({
    color: "#fff",
})

//const plane_1 = new Mesh.Plane(renderer.scene, new THREE.Vector3(), new THREE.Vector3(-0.5 * Math.PI, 0, 0), new THREE.Vector3(60, 60, 1), st);

LoadModel(renderer.scene);

function tick(time){
    renderer.Render();
}

renderer.renderer.setAnimationLoop(tick);