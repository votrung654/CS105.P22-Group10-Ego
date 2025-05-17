import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { loadGLTFModel, loadTexture } from '../../utils/loaders';

const Environment = ({ scene }) => {
  const environmentRef = useRef(null);
  
  useEffect(() => {
    if (!scene) return;
    
    const createEnvironment = async () => {
      // Tạo group để chứa môi trường bảo tàng
      const environmentGroup = new THREE.Group();
      environmentGroup.name = 'museum-environment';
      environmentRef.current = environmentGroup;
      
      // Load textures
      const floorTexture = await loadTexture('/assets/textures/floor-marble.jpg');
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(10, 10);
      
      const wallTexture = await loadTexture('/assets/textures/wall-plaster.jpg');
      wallTexture.wrapS = THREE.RepeatWrapping;
      wallTexture.wrapT = THREE.RepeatWrapping;
      wallTexture.repeat.set(2, 2);
      
      // Tạo sàn
      const floorGeometry = new THREE.PlaneGeometry(50, 50);
      const floorMaterial = new THREE.MeshStandardMaterial({ 
        map: floorTexture,
        roughness: 0.3,
        metalness: 0.2
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      floor.name = 'museum-floor';
      environmentGroup.add(floor);
      
      // Hàm tạo tường
      const createWall = (width, height, depth, position, rotation = { x: 0, y: 0, z: 0 }, name) => {
        const wallGeometry = new THREE.BoxGeometry(width, height, depth);
        const wallMaterial = new THREE.MeshStandardMaterial({ 
          map: wallTexture,
          roughness: 0.8,
          metalness: 0.1
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(position.x, position.y, position.z);
        wall.rotation.set(rotation.x, rotation.y, rotation.z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.name = name;
        environmentGroup.add(wall);
        return wall;
      };
      
      // Tạo các bức tường chính
      const wallHeight = 10;
      createWall(50, wallHeight, 0.5, { x: 0, y: wallHeight/2, z: -25 }, { x: 0, y: 0, z: 0 }, 'north-wall');
      createWall(50, wallHeight, 0.5, { x: 0, y: wallHeight/2, z: 25 }, { x: 0, y: 0, z: 0 }, 'south-wall');
      createWall(0.5, wallHeight, 50, { x: -25, y: wallHeight/2, z: 0 }, { x: 0, y: 0, z: 0 }, 'west-wall');
      createWall(0.5, wallHeight, 50, { x: 25, y: wallHeight/2, z: 0 }, { x: 0, y: 0, z: 0 }, 'east-wall');
      
      // Tạo mái nhà
      const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
      const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
      const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = wallHeight;
      ceiling.receiveShadow = true;
      ceiling.name = 'museum-ceiling';
      environmentGroup.add(ceiling);
      
      // Tạo các bệ đỡ hiện vật
      const createPedestal = (x, z) => {
        const pedestalGeometry = new THREE.BoxGeometry(2, 1, 2);
        const pedestalMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.position.set(x, 0.5, z);
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        pedestal.name = `pedestal-${x}-${z}`;
        environmentGroup.add(pedestal);
        return pedestal;
      };
      
      // Tạo một số bệ đỡ cho hiện vật
      createPedestal(-10, -10);
      createPedestal(-10, 0);
      createPedestal(-10, 10);
      createPedestal(0, -10);
      createPedestal(0, 10);
      createPedestal(10, -10);
      createPedestal(10, 0);
      createPedestal(10, 10);
      
      // Tạo các bức tường ngăn
      createWall(0.3, wallHeight, 15, { x: -15, y: wallHeight/2, z: -5 }, { x: 0, y: 0, z: 0 }, 'partition-wall-1');
      createWall(0.3, wallHeight, 15, { x: 15, y: wallHeight/2, z: 5 }, { x: 0, y: 0, z: 0 }, 'partition-wall-2');
      createWall(15, wallHeight, 0.3, { x: 5, y: wallHeight/2, z: -15 }, { x: 0, y: 0, z: 0 }, 'partition-wall-3');
      
      // Load model 3D cho các chi tiết bổ sung (ví dụ: cửa, cửa sổ)
      try {
        const doorModel = await loadGLTFModel('/assets/models/environment/door.glb');
        if (doorModel) {
          doorModel.scene.position.set(0, 0, -24.5);
          doorModel.scene.scale.set(2, 2, 2);
          doorModel.scene.name = 'museum-door';
          environmentGroup.add(doorModel.scene);
        }
      } catch (error) {
        console.error('Error loading door model:', error);
      }
      
      // Thêm toàn bộ group vào scene
      scene.add(environmentGroup);
    };
    
    createEnvironment();
    
    // Cleanup
    return () => {
      if (environmentRef.current) {
        scene.remove(environmentRef.current);
      }
    };
  }, [scene]);
  
  return null; // React component không render gì, chỉ xử lý Three.js
};

export default Environment;