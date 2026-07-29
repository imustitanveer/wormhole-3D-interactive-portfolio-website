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

const DISABLE_CAMERA_ANIMATION_FOR_DEBUG = false;
const HERO_TRANSITION_VIEWPORTS = 1.5;
const HERO_SCROLL_DAMPING = 3.5;
const PAGE_SCROLL_DAMPING = 4;
const CAMERA_PULL_DISTANCE = 0.45;
const OUTER_TORUS_FADE_START = 0.08;
const OUTER_TORUS_FADE_END = 0.22;
const OUTER_TORUS_VISIBILITY_CUTOFF = 0.015;
const WORMHOLE_MIN_SCALE = 0.72;
const WORMHOLE_SCROLL_X = 0;
const WORMHOLE_SCROLL_Y = 0;

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
  const playableClips = useMemo(() => {
    if (!DISABLE_CAMERA_ANIMATION_FOR_DEBUG) return gltf.animations;

    return gltf.animations
      .map((clip) => {
        const filteredTracks = clip.tracks.filter(
          (track) => !track.name.toLowerCase().includes("camera"),
        );

        return new THREE.AnimationClip(
          `${clip.name}-without-camera`,
          clip.duration,
          filteredTracks,
        );
      })
      .filter((clip) => clip.tracks.length > 0);
  }, [gltf.animations]);
  const mixer = useMemo(
    () =>
      gltf.animations.length > 0 ? new THREE.AnimationMixer(importedScene) : null,
    [gltf.animations.length, importedScene],
  );
  const hasBakedCameraPositionAnimation = useMemo(() => {
    if (!parts.camera) return false;

    return playableClips.some((clip) =>
      clip.tracks.some((track) => {
        const binding = THREE.PropertyBinding.parseTrackName(track.name);
        return binding.nodeName === parts.camera?.name && binding.propertyName === "position";
      }),
    );
  }, [parts.camera, playableClips]);
  const wormholeAnimation = useMemo(() => {
    const tracks = parts.wormholeMesh
      ? gltf.animations.flatMap((clip) =>
          clip.tracks.filter((track) => {
            const binding = THREE.PropertyBinding.parseTrackName(track.name);
            return binding.nodeName === parts.wormholeMesh?.name;
          }),
        )
      : [];
    const properties = new Set(
      tracks.map((track) => THREE.PropertyBinding.parseTrackName(track.name).propertyName),
    );

    return {
      trackNames: tracks.map((track) => track.name),
      hasPosition: properties.has("position"),
      hasQuaternion: properties.has("quaternion"),
      hasScale: properties.has("scale"),
    };
  }, [gltf.animations, parts.wormholeMesh]);
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
  const didLogAnimationClips = useRef(false);
  const didLogWormholeTracks = useRef(false);
  const didWarnWormholeTransform = useRef(false);
  const lightBasePosition = useRef(new THREE.Vector3());
  const lightTargetPosition = useRef(new THREE.Vector3());
  const pointerInsideCanvas = useRef(false);
  const cameraBasePosition = useRef(new THREE.Vector3());
  const bakedCameraPosition = useRef(new THREE.Vector3());
  const cameraScrollOffset = useRef(new THREE.Vector3());
  const cameraLocalPull = useRef(new THREE.Vector3());
  const appliedCameraScrollOffset = useRef(new THREE.Vector3());
  const wormholeBaseScale = useRef(new THREE.Vector3(1, 1, 1));
  const bakedWormholeScale = useRef(new THREE.Vector3(1, 1, 1));
  const wormholeBasePosition = useRef(new THREE.Vector3());
  const bakedWormholePosition = useRef(new THREE.Vector3());
  const bakedWormholeQuaternion = useRef(new THREE.Quaternion());
  const previousWormholePositionOffset = useRef(new THREE.Vector3());
  const currentWormholePositionOffset = useRef(new THREE.Vector3());
  const smoothedHeroProgress = useRef(0);
  const smoothedPageProgress = useRef(0);

  const starMaterial = useMemo(() => new StarMaterial(), []);
  const wormholeMaterial = useMemo(
    () => {
      const material = new THREE.MeshPhysicalMaterial({
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
      });

      material.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            "#include <common>\nvarying vec3 vWormholeLocalPosition;",
          )
          .replace(
            "#include <begin_vertex>",
            "vWormholeLocalPosition = position;\n#include <begin_vertex>",
          );

        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            "#include <common>\nvarying vec3 vWormholeLocalPosition;",
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
vec3 wormholeGradientPosition = normalize(vWormholeLocalPosition);
float wormholeGradientAxis =
  wormholeGradientPosition.x * 0.45 +
  wormholeGradientPosition.y * 0.35 +
  wormholeGradientPosition.z * 0.20;
float wormholeGradientWave = sin(
  wormholeGradientPosition.x * 3.0 +
  wormholeGradientPosition.y * 2.0 +
  wormholeGradientPosition.z * 2.5
) * 0.12;
float wormholeGradientMix = clamp(
  wormholeGradientAxis * 0.5 + 0.5 + wormholeGradientWave,
  0.0,
  1.0
);
vec3 wormholePink = vec3(1.0, 0.31, 0.85);
vec3 wormholePurple = vec3(0.48, 0.30, 1.0);
vec3 wormholeBlue = vec3(0.24, 0.48, 1.0);
vec3 wormholeGradientColor = wormholeGradientMix < 0.5
  ? mix(wormholePink, wormholePurple, wormholeGradientMix * 2.0)
  : mix(wormholePurple, wormholeBlue, (wormholeGradientMix - 0.5) * 2.0);
diffuseColor.rgb = mix(diffuseColor.rgb, wormholeGradientColor, 0.45);`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            "#include <emissivemap_fragment>\ntotalEmissiveRadiance = min(totalEmissiveRadiance + wormholeGradientColor * 0.04, vec3(3.0));",
          );
      };
      material.customProgramCacheKey = () => "wormhole-gradient-v1";

      return material;
    },
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
      wormholeBaseScale.current.copy(parts.wormholeMesh.scale);
      wormholeBasePosition.current.copy(parts.wormholeMesh.position);
      parts.wormholeMesh.material = wormholeMaterial;
      parts.wormholeMesh.frustumCulled = false;
      parts.wormholeMesh.renderOrder = 1;
      const normal = parts.wormholeMesh.geometry.getAttribute("normal");
      if (!normal || normal.count === 0) parts.wormholeMesh.geometry.computeVertexNormals();
    }

    if (parts.camera) {
      cameraBasePosition.current.copy(parts.camera.position);
      parts.camera.near = 0.01;
      parts.camera.far = 100;
      parts.camera.updateProjectionMatrix();

      previousCamera.current = get().camera;
      set({ camera: parts.camera });
    }

    if (parts.light) {
      lightBasePosition.current.copy(parts.light.position);
      parts.light.color.set("#755DFF");
      parts.light.intensity = 3.5;
      parts.light.distance = 9;
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
    parts.camera.near = 0.01;
    parts.camera.far = 100;
    parts.camera.updateProjectionMatrix();
  }, [parts.camera, size.height, size.width]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handlePointerEnter = () => {
      pointerInsideCanvas.current = true;
    };
    const handlePointerLeave = () => {
      pointerInsideCanvas.current = false;
    };

    canvas.addEventListener("pointerenter", handlePointerEnter);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || didLogAnimationClips.current) return;

    didLogAnimationClips.current = true;

    console.info(
      "[wormhole.glb] animation clips",
      gltf.animations.map((clip) => ({
        name: clip.name,
        duration: clip.duration,
        tracks: clip.tracks.map((track) => track.name),
      })),
    );
  }, [gltf.animations]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || didLogWormholeTracks.current) return;

    didLogWormholeTracks.current = true;
    console.info("[wormhole] animated tracks", wormholeAnimation.trackNames);
  }, [wormholeAnimation.trackNames]);

  useEffect(() => {
    if (!mixer) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[wormhole.glb] No baked GLB animation clips found");
      }
      return;
    }

    const actions = playableClips.map((clip) => {
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
      playableClips.forEach((clip) => mixer.uncacheClip(clip));
      mixer.uncacheRoot(importedScene);
    };
  }, [importedScene, mixer, playableClips]);

  useFrame((_, delta) => {
    elapsed.current += delta;
    starMaterial.uniforms.uTime.value = reducedMotion ? 0 : elapsed.current;

    // Restore the prior baked position before the mixer writes this frame so
    // the additive scroll translation can never become the next frame's base.
    if (parts.camera) {
      parts.camera.position.sub(appliedCameraScrollOffset.current);
      appliedCameraScrollOffset.current.set(0, 0, 0);
    }
    if (parts.wormholeMesh) {
      parts.wormholeMesh.position.sub(previousWormholePositionOffset.current);
      previousWormholePositionOffset.current.set(0, 0, 0);
      if (!wormholeAnimation.hasScale) {
        parts.wormholeMesh.scale.copy(wormholeBaseScale.current);
      }
    }

    if (mixer) {
      if (reducedMotion) {
        mixer.setTime(0);
        mixer.timeScale = 0;
      } else {
        mixer.timeScale = 1;
        mixer.update(delta);
      }
    }

    if (parts.camera && !hasBakedCameraPositionAnimation) {
      parts.camera.position.copy(cameraBasePosition.current);
    }
    if (parts.wormholeMesh && !wormholeAnimation.hasPosition) {
      parts.wormholeMesh.position.copy(wormholeBasePosition.current);
    }
    if (parts.wormholeMesh && !wormholeAnimation.hasScale) {
      parts.wormholeMesh.scale.copy(wormholeBaseScale.current);
    }

    const rawHeroProgress = THREE.MathUtils.clamp(
      window.scrollY / (window.innerHeight * HERO_TRANSITION_VIEWPORTS),
      0,
      1,
    );
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const rawPageProgress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    const targetPageProgress = reducedMotion
      ? rawPageProgress >= OUTER_TORUS_FADE_START
        ? 1
        : 0
      : rawPageProgress;

    smoothedHeroProgress.current = reducedMotion
      ? rawHeroProgress
      : THREE.MathUtils.damp(
          smoothedHeroProgress.current,
          rawHeroProgress,
          HERO_SCROLL_DAMPING,
          delta,
        );
    smoothedPageProgress.current = reducedMotion
      ? targetPageProgress
      : THREE.MathUtils.damp(
          smoothedPageProgress.current,
          targetPageProgress,
          PAGE_SCROLL_DAMPING,
          delta,
        );

    const cameraPullProgress = smoothedHeroProgress.current;
    const pageProgress = smoothedPageProgress.current;
    const outerTorusProgress = pageProgress;

    if (parts.camera) {
      bakedCameraPosition.current.copy(parts.camera.position);
      cameraLocalPull.current.set(
        0,
        0,
        cameraPullProgress * CAMERA_PULL_DISTANCE,
      );
      cameraScrollOffset.current
        .copy(cameraLocalPull.current)
        .applyQuaternion(parts.camera.quaternion)
        .clampLength(0, CAMERA_PULL_DISTANCE);
      parts.camera.position
        .copy(bakedCameraPosition.current)
        .add(cameraScrollOffset.current);
      appliedCameraScrollOffset.current.copy(cameraScrollOffset.current);
    }

    const outerOpacity =
      1 -
      THREE.MathUtils.smoothstep(
        outerTorusProgress,
        OUTER_TORUS_FADE_START,
        OUTER_TORUS_FADE_END,
      );
    starMaterial.uniforms.uOpacity.value = outerOpacity;
    if (parts.starMesh) {
      parts.starMesh.visible = outerOpacity > OUTER_TORUS_VISIBILITY_CUTOFF;
    }

    if (parts.wormholeMesh) {
      bakedWormholePosition.current.copy(parts.wormholeMesh.position);
      bakedWormholeScale.current.copy(parts.wormholeMesh.scale);
      bakedWormholeQuaternion.current.copy(parts.wormholeMesh.quaternion);
      const wormholeScaleMultiplier = THREE.MathUtils.lerp(
        1,
        WORMHOLE_MIN_SCALE,
        pageProgress,
      );
      currentWormholePositionOffset.current.set(
        WORMHOLE_SCROLL_X * pageProgress,
        WORMHOLE_SCROLL_Y * pageProgress,
        0,
      );
      parts.wormholeMesh.position
        .copy(bakedWormholePosition.current)
        .add(currentWormholePositionOffset.current);
      parts.wormholeMesh.scale
        .copy(bakedWormholeScale.current)
        .multiplyScalar(wormholeScaleMultiplier);
      parts.wormholeMesh.quaternion.copy(bakedWormholeQuaternion.current);
      previousWormholePositionOffset.current.copy(currentWormholePositionOffset.current);

      if (process.env.NODE_ENV === "development" && !didWarnWormholeTransform.current) {
        const scaleLength = parts.wormholeMesh.scale.length();
        const displacement = parts.wormholeMesh.position.distanceTo(
          bakedWormholePosition.current,
        );
        if (scaleLength > 10 || scaleLength < 0.1 || displacement > 1) {
          didWarnWormholeTransform.current = true;
          console.warn("[wormhole] excessive scroll transform", {
            displacement,
            scaleLength,
          });
        }
      }
    }

    if (parts.light && !hasBakedLightPositionAnimation) {
      lightTargetPosition.current.copy(lightBasePosition.current);
      if (!reducedMotion && pointerInsideCanvas.current) {
        lightTargetPosition.current.x += pointer.x * 1.1;
        lightTargetPosition.current.y += pointer.y * 0.75;
        lightTargetPosition.current.z += pointer.x * 0.15;
      }
      parts.light.position.lerp(
        lightTargetPosition.current,
        1 - Math.exp(-delta * 3.2),
      );
    }

    if (!didSignalReady.current) {
      didSignalReady.current = true;
      onReady();
    }
  });

  return <primitive object={importedScene} dispose={null} />;
}

useGLTF.preload("/models/wormhole.glb");
