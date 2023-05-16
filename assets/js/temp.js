import * as THREE from '/build/three.module.js';

import Renderer from './renderer.js';
import * as Mesh from './Mesh.js';
import * as Light from './Light.js';

import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import { DragControls } from '/jsm/controls/DragControls.js';

import Stats from '/jsm/libs/stats.module.js'
import * as dat from '/dat.gui/build/dat.gui.module.js';

/* -------------- Textures -------------- */

//import ground_1defuse from "/assets/textures/ground_1/defuse.jpg";

/* -------------- End Textures -------------- */ 

const renderer = new Renderer(window.innerWidth, window.innerHeight, 75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.camera.position.y = 30;
renderer.camera.rotation.x = 90;

document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const orbitControls = new OrbitControls(renderer.camera, renderer.domElement)
orbitControls.update();

const gui = new dat.GUI();

const gridHelper = new THREE.GridHelper(30, 20);
renderer.scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper( 5 );
renderer.scene.add( axesHelper );


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

/*const planeGeometry = new THREE.PlaneGeometry(60, 60, 1);

const planeMaterial = new THREE.MeshStandardMaterial({
    map: gound_1Defuse,
    aoMap: gound_1AO,
    displacementMap: gound_1Displacement,
    normalMap: gound_1Normal,
    roughnessMap: gound_1Roughness,
});

const planeMaterial_1 = new THREE.MeshStandardMaterial({
    color: "red",
    //map: mask_1,
    alphaMap: mask_1,
    aoMap: gound_1AO,
    displacementMap: gound_1Displacement,
    normalMap: gound_1Normal,
    roughnessMap: gound_1Roughness,
})

mask_1.flipY = true;

const planeMaterial_2 = new THREE.MeshStandardMaterial({
    color: "green",
    map: mask_1,
    aoMap: gound_1AO,
    displacementMap: gound_1Displacement,
    normalMap: gound_1Normal,
    roughnessMap: gound_1Roughness,
})

//planeGeometry.addGroup(0, Infinity, 0);

//planeGeometry.addGroup(0, Infinity, 1);

//planeGeometry.addGroup(0, Infinity, 2);

const mats = [ planeMaterial_1, planeMaterial];

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
renderer.scene.add(plane);*/


const cube = new Mesh.Box(renderer.scene, new THREE.Vector3(0, 2, 0));

const options = {
    cubeColor: "#fff",
}

const positionOptions = {
    X: cube.mesh.position.x,
    Y: cube.mesh.position.y,
    Z: cube.mesh.position.z,
}

const rotationOptions = {
    X: cube.mesh.rotation.x,
    Y: cube.mesh.rotation.y,
    Z: cube.mesh.rotation.z,
}

const scaleOptions = {
    X: cube.mesh.scale.x,
    Y: cube.mesh.scale.y,
    Z: cube.mesh.scale.z,
}

gui.addColor(options, "cubeColor").onChange((e) => {
    cube.material.color.set(e);
});

const transformGUI = gui.addFolder("Transform")

const positionGUI = transformGUI.addFolder("Position");

const rotationGUI = transformGUI.addFolder("Rotation");

const scaleGUI = transformGUI.addFolder("Scale");

positionGUI.add(positionOptions, "X", -100, 100).onChange(e => {
    cube.mesh.position.x = e;
});

positionGUI.add(positionOptions, "Y", -100, 100).onChange(e => {
    cube.mesh.position.y = e;
});

positionGUI.add(positionOptions, "Z", -100, 100).onChange(e => {
    cube.mesh.position.z = e;
});

rotationGUI.add(rotationOptions, "X", 0, 360).onChange(e => {
    cube.mesh.rotation.x = e * (Math.PI / 180);
});

rotationGUI.add(rotationOptions, "Y", 0, 360).onChange(e => {
    cube.mesh.rotation.y = e * (Math.PI / 180);
});

rotationGUI.add(rotationOptions, "Z", 0, 360).onChange(e => {
    cube.mesh.rotation.z = e * (Math.PI / 180);
});

scaleGUI.add(scaleOptions, "X", 0.1, 100).onChange(e => {
    cube.mesh.scale.x = e;
})

scaleGUI.add(scaleOptions, "Y", 0.1, 100).onChange(e => {
    cube.mesh.scale.y = e;
})

scaleGUI.add(scaleOptions, "Z", 0.1, 100).onChange(e => {
    cube.mesh.scale.z = e;
})

/*const dragControls = new DragControls([cube], renderer.camera, renderer.domElement);
dragControls.addEventListener("dragstart", function(event){
    orbitControls.enabled = false;
})

dragControls.addEventListener("dragend", function(event){
    orbitControls.enabled = true;
})*/

const planeMat = new THREE.RawShaderMaterial({
    uniforms: {
        uTime: { value: 0.0 },
    },

    vertexShader: `
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;

        attribute vec3 position;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        precision mediump float;
        uniform float uTime;

        void main(void){
            gl_FragColor = vec4(uTime);
        }
    `,

    wireframe: false,
});

const sCube = new Mesh.Plane(renderer.scene, new THREE.Vector3(), new THREE.Vector3(-0.5 * Math.PI, 0, 0), new THREE.Vector3(60, 60, 1), planeMat);

const directionaLight = new Light.DirectionaLight(renderer.scene, 0xffffff, 1, new THREE.Vector3(0, 100, 0));
const spotLight = new Light.SpotLight(renderer.scene, null, 5, 20, null, null, null, new THREE.Vector3(0, 10, 0));
let speed = 0.01;

function tick(time){
    spotLight.light.target = cube.mesh;
    renderer.Render();
}

renderer.renderer.setAnimationLoop(tick);