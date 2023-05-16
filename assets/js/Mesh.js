import * as THREE from '/build/three.module.js';

export class Box{

    #quaternion;
    constructor(scene, position = new THREE.Vector3(), rotation = new THREE.Vector3(), scale = new THREE.Vector3(1, 1, 1), material = new THREE.MeshStandardMaterial()){
        this.geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    
        this.mesh.position.set(position.x, position.y, position.z);
    
        this.#quaternion = new THREE.Quaternion();
        this.mesh.rotation.set(rotation.applyQuaternion(this.#quaternion).x, rotation.applyQuaternion(this.#quaternion).y, rotation.applyQuaternion(this.#quaternion).z);

        scene.add(this.mesh);
    }
}

export class Plane{

    #quaternion;
    constructor(scene, position = new THREE.Vector3(), rotation = new THREE.Vector3(), scale = new THREE.Vector3(1, 1, 1), material = new THREE.MeshStandardMaterial()){
        this.geometry = new THREE.PlaneGeometry(scale.x, scale.y, scale.z);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    
        this.mesh.position.set(position.x, position.y, position.z);
    
        this.#quaternion = new THREE.Quaternion();
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(this.mesh);
    }
}

export class Sphere{

    #quaternion;
    constructor(scene, position = new THREE.Vector3(), rotation = new THREE.Vector3(), radiau = 5, material = new THREE.MeshStandardMaterial()){
        this.geometry = new THREE.SphereGeometry(radiau);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    
        this.mesh.position.set(position.x, position.y, position.z);
    
        this.#quaternion = new THREE.Quaternion();
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(this.mesh);
    }
}