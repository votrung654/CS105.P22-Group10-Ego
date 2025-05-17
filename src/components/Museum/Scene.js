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
        // Khởi tạo scene, camera, renderer
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(0x87ceeb);
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;
        camera.position.set(0, 1.6, 5);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);
        
        // Khởi tạo camera controller
        const cameraController = new CameraController(camera, renderer.domElement);
        cameraControllerRef.current = cameraController;
        
        // Thêm sự kiện khi click vào start button
        const startButton = document.getElementById('start-button');
        if (startButton) {
            startButton.addEventListener('click', () => {
                document.getElementById('info').style.display = 'none';
                document.getElementById('exit-button').style.display = 'block';
                cameraController.enablePointerControls();
            });
        }
        
        // Thêm sự kiện khi click vào exit button
        const exitButton = document.getElementById('exit');
        if (exitButton) {
            exitButton.addEventListener('click', () => {
                document.getElementById('info').style.display = 'flex';
                document.getElementById('exit-button').style.display = 'none';
                cameraController.pointerControls.unlock();
            });
        }
        
        // Tạo floor và walls
        const floorGeometry = new THREE.PlaneGeometry(50, 50);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
        collidableObjectsRef.current.push(floor);
        
        // Tạo các bức tường
        const createWall = (width, height, depth, position, rotation = { x: 0, y: 0, z: 0 }) => {
            const wallGeometry = new THREE.BoxGeometry(width, height, depth);
            const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(position.x, position.y, position.z);
            wall.rotation.set(rotation.x, rotation.y, rotation.z);
            wall.castShadow = true;
            wall.receiveShadow = true;
            scene.add(wall);
            collidableObjectsRef.current.push(wall);
            return wall;
        };
        
        // Tạo các bức tường xung quanh museum
        createWall(50, 10, 1, { x: 0, y: 5, z: -25 });
        createWall(50, 10, 1, { x: 0, y: 5, z: 25 });
        createWall(1, 10, 50, { x: -25, y: 5, z: 0 });
        createWall(1, 10, 50, { x: 25, y: 5, z: 0 });
        
        // Load models bảo tàng
        const loader = new GLTFLoader();
        loader.load(
            '/assets/models/environment/museum.glb', 
            (gltf) => {
                scene.add(gltf.scene);
                // Thêm các object để kiểm tra va chạm
                gltf.scene.traverse((object) => {
                    if (object.isMesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                        collidableObjectsRef.current.push(object);
                    }
                });
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
        
        // Thêm ánh sáng
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);
        
        // Set up performance metrics
        setupPerformanceMetrics();
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            const delta = clockRef.current.getDelta();
            
            // Update camera controller
            if (cameraControllerRef.current) {
                cameraControllerRef.current.update(delta, collidableObjectsRef.current);
            }
            
            // Apply frustum culling
            if (artifactsRef.current.length > 0) {
                applyFrustumCulling(camera, artifactsRef.current);
            }
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle window resize
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Scene;