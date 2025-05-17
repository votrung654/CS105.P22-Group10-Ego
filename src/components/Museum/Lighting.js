import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Lighting = ({ scene }) => {
  const lightsRef = useRef({});
  
  useEffect(() => {
    if (!scene) return;
    
    // Tạo ánh sáng môi trường
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    ambientLight.name = 'ambient-light';
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;
    
    // Tạo ánh sáng chính (trực tiếp)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 20, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -25;
    mainLight.shadow.camera.right = 25;
    mainLight.shadow.camera.top = 25;
    mainLight.shadow.camera.bottom = -25;
    mainLight.shadow.bias = -0.0001;
    mainLight.name = 'main-directional-light';
    scene.add(mainLight);
    lightsRef.current.main = mainLight;
    
    // Tạo ánh sáng bổ sung từ hướng khác
    const secondaryLight = new THREE.DirectionalLight(0xffffcc, 0.4);
    secondaryLight.position.set(-10, 15, -10);
    secondaryLight.castShadow = true;
    secondaryLight.shadow.mapSize.width = 1024;
    secondaryLight.shadow.mapSize.height = 1024;
    secondaryLight.name = 'secondary-directional-light';
    scene.add(secondaryLight);
    lightsRef.current.secondary = secondaryLight;
    
    // Tạo các spotlight cho hiện vật
    const createSpotlight = (x, y, z, color, intensity, targetX, targetY, targetZ, name) => {
      const spotlight = new THREE.SpotLight(color, intensity, 30, Math.PI / 6, 0.5, 2);
      spotlight.position.set(x, y, z);
      
      // Tạo target cho spotlight
      const targetObject = new THREE.Object3D();
      targetObject.position.set(targetX, targetY, targetZ);
      scene.add(targetObject);
      spotlight.target = targetObject;
      
      spotlight.castShadow = true;
      spotlight.shadow.mapSize.width = 1024;
      spotlight.shadow.mapSize.height = 1024;
      spotlight.shadow.camera.near = 0.5;
      spotlight.shadow.camera.far = 20;
      spotlight.name = name;
      
      scene.add(spotlight);
      return spotlight;
    };
    
    // Tạo nhiều spotlight cho các vị trí hiện vật
    lightsRef.current.spotlights = [];
    
    // Spotlight cho các bệ đỡ
    lightsRef.current.spotlights.push(
      createSpotlight(-10, 8, -10, 0xffffff, 1.5, -10, 0, -10, 'spotlight-1'),
      createSpotlight(-10, 8, 0, 0xffffff, 1.5, -10, 0, 0, 'spotlight-2'),
      createSpotlight(-10, 8, 10, 0xffffff, 1.5, -10, 0, 10, 'spotlight-3'),
      createSpotlight(0, 8, -10, 0xffffff, 1.5, 0, 0, -10, 'spotlight-4'),
      createSpotlight(0, 8, 10, 0xffffff, 1.5, 0, 0, 10, 'spotlight-5'),
      createSpotlight(10, 8, -10, 0xffffff, 1.5, 10, 0, -10, 'spotlight-6'),
      createSpotlight(10, 8, 0, 0xffffff, 1.5, 10, 0, 0, 'spotlight-7'),
      createSpotlight(10, 8, 10, 0xffffff, 1.5, 10, 0, 10, 'spotlight-8')
    );
    
    // Ánh sáng trang trí (các đèn tường)
    const wallLightPositions = [
      { x: -24, y: 5, z: -20 },
      { x: -24, y: 5, z: -10 },
      { x: -24, y: 5, z: 0 },
      { x: -24, y: 5, z: 10 },
      { x: -24, y: 5, z: 20 },
      { x: 24, y: 5, z: -20 },
      { x: 24, y: 5, z: -10 },
      { x: 24, y: 5, z: 0 },
      { x: 24, y: 5, z: 10 },
      { x: 24, y: 5, z: 20 },
    ];
    
    lightsRef.current.wallLights = [];
    
    wallLightPositions.forEach((pos, index) => {
      const pointLight = new THREE.PointLight(0xffcc77, 0.8, 10);
      pointLight.position.set(pos.x, pos.y, pos.z);
      pointLight.name = `wall-light-${index}`;
      scene.add(pointLight);
      lightsRef.current.wallLights.push(pointLight);
      
      // Thêm helper object để thấy được vị trí đèn
      const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 8);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc77 });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(pointLight.position);
      sphere.name = `wall-light-helper-${index}`;
      scene.add(sphere);
    });
    
    // Mục đích debugging: Helper cho đèn chính
    // const directionalLightHelper = new THREE.DirectionalLightHelper(mainLight, 5);
    // scene.add(directionalLightHelper);
    
    // Cleanup khi component unmount
    return () => {
      // Xóa tất cả các loại đèn
      if (lightsRef.current.ambient) scene.remove(lightsRef.current.ambient);
      if (lightsRef.current.main) scene.remove(lightsRef.current.main);
      if (lightsRef.current.secondary) scene.remove(lightsRef.current.secondary);
      
      // Xóa các spotlight
      if (lightsRef.current.spotlights) {
        lightsRef.current.spotlights.forEach(light => {
          if (light.target) scene.remove(light.target);
          scene.remove(light);
        });
      }
      
      // Xóa các đèn tường
      if (lightsRef.current.wallLights) {
        lightsRef.current.wallLights.forEach((light, index) => {
          scene.remove(light);
          const helper = scene.getObjectByName(`wall-light-helper-${index}`);
          if (helper) scene.remove(helper);
        });
      }
    };
  }, [scene]);
  
  return null; // React component không render gì, chỉ xử lý Three.js
};

export default Lighting;