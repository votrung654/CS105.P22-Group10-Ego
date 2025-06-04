import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CameraController from '../../controllers/CameraController';
import { applyFrustumCulling, setupPerformanceMetrics } from '../../utils/optimization';
import { checkCollision } from '../../utils/collision';

const Scene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraControllerRef = useRef(null);
  const collidableObjectsRef = useRef([]);
  const artifactsRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera Controller
    const cameraController = new CameraController(camera, renderer.domElement);
    cameraControllerRef.current = cameraController;
    scene.add(cameraController.object);

    // Event listeners cho start/exit button
    const startButton = document.getElementById('start-button');
    if (startButton) {
      startButton.addEventListener('click', () => {
        document.getElementById('info').style.display = 'none';
        document.getElementById('exit-button').style.display = 'block';
        cameraController.enablePointerControls();
      });
    }

    const exitButton = document.getElementById('exit-button');
    if (exitButton) {
      exitButton.addEventListener('click', () => {
        document.getElementById('info').style.display = 'flex';
        document.getElementById('exit-button').style.display = 'none';
        cameraController.pointerControls.unlock();
      });
    }

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    collidableObjectsRef.current.push(floor);

    // Walls
    const createWall = (w, h, d, pos, rot = { x: 0, y: 0, z: 0 }) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
      const wall = new THREE.Mesh(geo, mat);
      wall.position.set(pos.x, pos.y, pos.z);
      wall.rotation.set(rot.x, rot.y, rot.z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);
      collidableObjectsRef.current.push(wall);
      return wall;
    };
    createWall(50, 10, 1, { x: 0, y: 5, z: -25 });
    createWall(50, 10, 1, { x: 0, y: 5, z: 25 });
    createWall(1, 10, 50, { x: -25, y: 5, z: 0 });
    createWall(1, 10, 50, { x: 25, y: 5, z: 0 });

    // Load GLTF model (mình để model mặc định hoặc bạn có thể thay đường dẫn)
    const loader = new GLTFLoader();
    loader.load(
      '/src/assets/models/museum.glb',
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            collidableObjectsRef.current.push(obj);
          }
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading model', error);
      }
    );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // setupPerformanceMetrics(); // Tùy bạn có implement

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      if (cameraControllerRef.current) {
        cameraControllerRef.current.update(delta, collidableObjectsRef.current);
      }
      // applyFrustumCulling(camera, artifactsRef.current); // Nếu có sử dụng
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Scene;