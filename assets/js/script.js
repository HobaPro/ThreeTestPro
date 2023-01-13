import * as THREE from '/build/three.module.js';

import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import { DragControls } from '/jsm/controls/DragControls.js';

import Stats from '/jsm/libs/stats.module.js'
import * as dat from '/dat.gui/build/dat.gui.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 30, 20);
camera.rotation.x = 45;

const renderer = new THREE.WebGLRenderer()

const orbitControls = new OrbitControls(camera, renderer.domElement)

const gui = new dat.GUI();

const gridHelper = new THREE.GridHelper(30, 20);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const planeGeometry = new THREE.PlaneGeometry(30, 30, 1);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);
cube.position.y += 2;

const options = {
    cubeColor: "#fff",
}

const positionOptions = {
    X: cube.position.x,
    Y: cube.position.y,
    Z: cube.position.z,
}

const rotationOptions = {
    X: cube.rotation.x,
    Y: cube.rotation.y,
    Z: cube.rotation.z,
}

const scaleOptions = {
    X: cube.scale.x,
    Y: cube.scale.y,
    Z: cube.scale.z,
}

gui.addColor(options, "cubeColor").onChange((e) => {
    cube.material.color.set(e);
});

const transformGUI = gui.addFolder("Transform")

const positionGUI = transformGUI.addFolder("Position");

const rotationGUI = transformGUI.addFolder("Rotation");

const scaleGUI = transformGUI.addFolder("Scale");

positionGUI.add(positionOptions, "X", -100, 100).onChange(e => {
    cube.position.x = e;
});

positionGUI.add(positionOptions, "Y", -100, 100).onChange(e => {
    cube.position.y = e;
});

positionGUI.add(positionOptions, "Z", -100, 100).onChange(e => {
    cube.position.z = e;
});

rotationGUI.add(rotationOptions, "X", 0, 360).onChange(e => {
    cube.rotation.x = e * (Math.PI / 180);
});

rotationGUI.add(rotationOptions, "Y", 0, 360).onChange(e => {
    cube.rotation.y = e * (Math.PI / 180);
});

rotationGUI.add(rotationOptions, "Z", 0, 360).onChange(e => {
    cube.rotation.z = e * (Math.PI / 180);
});

scaleGUI.add(scaleOptions, "X", 0.1, 100).onChange(e => {
    cube.scale.x = e;
})

scaleGUI.add(scaleOptions, "Y", 0.1, 100).onChange(e => {
    cube.scale.y = e;
})

scaleGUI.add(scaleOptions, "Z", 0.1, 100).onChange(e => {
    cube.scale.z = e;
})

const dragControls = new DragControls([cube], camera, renderer.domElement);
dragControls.addEventListener("dragstart", function(event){
    orbitControls.enabled = false;
})

dragControls.addEventListener("dragend", function(event){
    orbitControls.enabled = true;
})

scene.add(cube);
orbitControls.update();

renderer.setSize( window.innerWidth, window.innerHeight ); 

document.body.appendChild( renderer.domElement );

renderer.render(scene, camera);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set(10, 10, 10);
scene.add( directionalLight );

let speed = 0.01;

function tick(time){
    //cube.rotation.x += 0.01;
    //speed += 0.001;
    renderer.render( scene, camera );
}

renderer.setAnimationLoop(tick);