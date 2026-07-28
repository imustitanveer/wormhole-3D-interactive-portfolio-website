import fs from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

globalThis.ProgressEvent ??= class ProgressEvent {};

const bytes = fs.readFileSync(new URL("../public/models/wormhole.glb", import.meta.url));
const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
const gltf = await new Promise((resolve, reject) => {
  new GLTFLoader().parse(arrayBuffer, "", resolve, reject);
});

gltf.scene.updateMatrixWorld(true);

const vector = (value) => value.toArray().map((number) => Number(number.toFixed(6)));
const quaternion = (value) => vector(value);
const rotation = (value) => [value.x, value.y, value.z, value.order].map((entry) =>
  typeof entry === "number" ? Number(entry.toFixed(6)) : entry,
);

gltf.scene.traverse((object) => {
  const box = new THREE.Box3().setFromObject(object, true);
  const sphere = box.isEmpty() ? null : box.getBoundingSphere(new THREE.Sphere());
  console.log({
    name: object.name || "(unnamed)",
    type: object.type,
    worldPosition: vector(object.getWorldPosition(new THREE.Vector3())),
    rotation: rotation(object.rotation),
    quaternion: quaternion(object.getWorldQuaternion(new THREE.Quaternion())),
    worldScale: vector(object.getWorldScale(new THREE.Vector3())),
    boundingBox: box.isEmpty() ? null : { min: vector(box.min), max: vector(box.max) },
    boundingSphere: sphere ? { center: vector(sphere.center), radius: Number(sphere.radius.toFixed(6)) } : null,
  });

  if (object.isPerspectiveCamera) {
    console.log("EXPORTED_CAMERA", {
      position: vector(object.getWorldPosition(new THREE.Vector3())),
      quaternion: quaternion(object.getWorldQuaternion(new THREE.Quaternion())),
      rotation: rotation(object.rotation),
      fov: object.fov,
      aspect: object.aspect,
      near: object.near,
      far: object.far,
    });
  }

  if (object.isPointLight) {
    console.log("EXPORTED_POINT_LIGHT", {
      position: vector(object.getWorldPosition(new THREE.Vector3())),
      intensity: object.intensity,
      color: `#${object.color.getHexString()}`,
      distance: object.distance,
      decay: object.decay,
    });
  }
});
