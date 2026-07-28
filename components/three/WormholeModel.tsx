"use client";

/* eslint-disable react-hooks/immutability -- R3F frame loops intentionally mutate Three.js scene objects. */

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { StarMaterial } from "./materials/StarMaterial";

type WormholeModelProps = {
  reducedMotion: boolean;
  onReady: () => void;
};

type SceneParts = {
  camera?: THREE.PerspectiveCamera;
  light?: THREE.PointLight;
  starMesh?: THREE.Mesh;
  wormholeMesh?: THREE.Mesh;
};

const normalizedName = (name: string) => name.replace(/[^a-z0-9]/gi, "").toLowerCase();

function findSceneParts(scene: THREE.Object3D): SceneParts {
  const parts: SceneParts = {};

  scene.traverse((object) => {
    const name = normalizedName(object.name);
    if (object instanceof THREE.PerspectiveCamera && !parts.camera) parts.camera = object;
    if (object instanceof THREE.PointLight && !parts.light) parts.light = object;
    if (object instanceof THREE.Mesh && name === "torus001") parts.starMesh = object;
    if (object instanceof THREE.Mesh && name === "wormholeweb") parts.wormholeMesh = object;
  });

  return parts;
}

function logSceneDiagnostics(scene: THREE.Object3D) {
  if (process.env.NODE_ENV !== "development") return;

  scene.updateMatrixWorld(true);
  console.groupCollapsed("[wormhole.glb] exported scene diagnostics");
  scene.traverse((object) => {
    const box = new THREE.Box3().setFromObject(object, true);
    const sphere = box.isEmpty() ? null : box.getBoundingSphere(new THREE.Sphere());
    console.info({
      name: object.name || "(unnamed)",
      type: object.type,
      worldPosition: object.getWorldPosition(new THREE.Vector3()).toArray(),
      rotation: object.rotation.toArray(),
      scale: object.getWorldScale(new THREE.Vector3()).toArray(),
      boundingBox: box.isEmpty() ? null : { min: box.min.toArray(), max: box.max.toArray() },
      boundingSphere: sphere ? { center: sphere.center.toArray(), radius: sphere.radius } : null,
    });
  });
  console.groupEnd();
}

export function WormholeModel({ reducedMotion, onReady }: WormholeModelProps) {
  const gltf = useGLTF("/models/wormhole.glb");
  const importedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const parts = useMemo(() => findSceneParts(importedScene), [importedScene]);
  const mixer = useMemo(
    () =>
      gltf.animations.length > 0 ? new THREE.AnimationMixer(importedScene) : null,
    [gltf.animations.length, importedScene],
  );
  const hasBakedLightPositionAnimation = useMemo(() => {
    if (!parts.light) return false;

    return gltf.animations.some((clip) =>
      clip.tracks.some((track) => {
        const binding = THREE.PropertyBinding.parseTrackName(track.name);
        return binding.nodeName === parts.light?.name && binding.propertyName === "position";
      }),
    );
  }, [gltf.animations, parts.light]);
  const { pointer, set, get, size, gl } = useThree();
  const previousCamera = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const elapsed = useRef(0);
  const didSignalReady = useRef(false);
  const lightBasePosition = useRef(new THREE.Vector3());
  const lightTarget = useRef(new THREE.Vector3());

  const starMaterial = useMemo(() => new StarMaterial(), []);
  const wormholeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#a790d2"),
        transmission: 0.94,
        thickness: 1.05,
        roughness: 0.09,
        metalness: 0,
        ior: 1.12,
        emissive: new THREE.Color("#26083f"),
        emissiveIntensity: 0.38,
        attenuationColor: new THREE.Color("#a77be8"),
        attenuationDistance: 2.4,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: true,
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!parts.starMesh) console.warn("[wormhole.glb] Missing mesh: Torus.001");
    if (!parts.wormholeMesh) console.warn("[wormhole.glb] Missing mesh: Wormhole_web");

    if (parts.starMesh) {
      parts.starMesh.material = starMaterial;
      parts.starMesh.frustumCulled = false;
      parts.starMesh.renderOrder = 0;
    }

    if (parts.wormholeMesh) {
      parts.wormholeMesh.material = wormholeMaterial;
      parts.wormholeMesh.frustumCulled = false;
      parts.wormholeMesh.renderOrder = 1;
      const normal = parts.wormholeMesh.geometry.getAttribute("normal");
      if (!normal || normal.count === 0) parts.wormholeMesh.geometry.computeVertexNormals();
    }

    if (parts.camera) {
      previousCamera.current = get().camera;
      set({ camera: parts.camera });
    } else {
      console.warn("[wormhole.glb] Missing exported PerspectiveCamera");
    }

    if (parts.light) {
      lightBasePosition.current.copy(parts.light.position);
      parts.light.intensity = 3.5;
      parts.light.distance = 8;
      parts.light.decay = 2;
    } else {
      console.warn("[wormhole.glb] Missing exported PointLight");
    }

    gl.toneMappingExposure = 0.68;
    logSceneDiagnostics(importedScene);

    return () => {
      starMaterial.dispose();
      wormholeMaterial.dispose();
      if (previousCamera.current) set({ camera: previousCamera.current });
    };
  }, [get, gl, importedScene, parts, set, starMaterial, wormholeMaterial]);

  useEffect(() => {
    if (!parts.camera) return;
    parts.camera.aspect = size.width / size.height;
    parts.camera.updateProjectionMatrix();
  }, [parts.camera, size.height, size.width]);

  useEffect(() => {
    if (!mixer) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[wormhole.glb] No baked GLB animation clips found");
      }
      return;
    }

    const actions = gltf.animations.map((clip) => {
      if (process.env.NODE_ENV === "development") {
        console.info("[wormhole.glb] Playing baked animation", {
          name: clip.name,
          duration: clip.duration,
        });
      }

      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      return action;
    });

    return () => {
      actions.forEach((action) => action.stop());
      mixer.stopAllAction();
      gltf.animations.forEach((clip) => mixer.uncacheClip(clip));
      mixer.uncacheRoot(importedScene);
    };
  }, [gltf.animations, importedScene, mixer]);

  useFrame((_, delta) => {
    elapsed.current += delta;
    starMaterial.uniforms.uTime.value = reducedMotion ? 0 : elapsed.current;

    if (mixer) {
      if (reducedMotion) {
        mixer.setTime(0);
        mixer.timeScale = 0;
      } else {
        mixer.timeScale = 1;
        mixer.update(delta);
      }
    }

    if (parts.light && !hasBakedLightPositionAnimation) {
      lightTarget.current.copy(lightBasePosition.current);
      if (!reducedMotion) {
        lightTarget.current.x += pointer.x * 0.32;
        lightTarget.current.y += pointer.y * 0.22;
      }
      parts.light.position.lerp(lightTarget.current, 1 - Math.exp(-delta * 2.5));
    }

    if (!didSignalReady.current) {
      didSignalReady.current = true;
      onReady();
    }
  });

  return <primitive object={importedScene} dispose={null} />;
}

useGLTF.preload("/models/wormhole.glb");
