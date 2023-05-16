import * as THREE from '/build/three.module.js';

export class DirectionaLight{

    constructor(scene, color = 0xffffff, intensity = 0.5, position = new THREE.Vector3()){

        color = color || 0xffffff;
        intensity = intensity || 0.5;

        this.light = new THREE.DirectionalLight(color, intensity);
        this.light.position.set(position.x, position.y, position.z);

        scene.add(this.light);
    }
}

export class SpotLight{

    constructor(scene, color = 0xffffff, intensity = 0.5, distance = 1, angle = Math.PI / 3, penumbra = 0, decay = 2, position = new THREE.Vector3(), rotation = new THREE.Vector3()){

        color = color || 0xffffff;
        intensity = intensity || 0.5;
        distance = distance || 1;
        angle = angle || Math.PI / 3;
        penumbra = penumbra || 0;
        decay = decay || 2;


        this.light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);

        this.light.position.set(position.x, position.y, position.z);
        this.light.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(this.light);
    }
}

export class PointLight{
    constructor(scene, color = 0xffffff, intensity = 0.5, distance = 1, angle = Math.PI / 3, penumbra = 0, decay = 2, position = new THREE.Vector3(), rotation = new THREE.Vector3()){

        color = color || 0xffffff;
        intensity = intensity || 0.5;
        distance = distance || 1;
        angle = angle || Math.PI / 3;
        penumbra = penumbra || 0;
        decay = decay || 2;


        this.light = new THREE.PointLight(color, intensity, distance, angle, penumbra, decay);

        this.light.position.set(position.x, position.y, position.z);
        this.light.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(this.light);
    }
}