import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import artifactService from '../../services/artifactService';

const Artifacts = ({ scene, artifacts, onArtifactClick }) => {
  const artifactsRef = useRef([]);
  
  useEffect(() => {
    if (!scene) return;
    
    // Tải mô hình cho mỗi hiện vật
    const loader = new GLTFLoader();
    
    artifacts.forEach(artifact => {
      loader.load(
        artifact.modelPath,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(
            artifact.position.x,
            artifact.position.y,
            artifact.position.z
          );
          model.scale.set(1, 1, 1);
          
          // Đặt userData cho model để dễ dàng truy xuất thông tin
          model.userData.isArtifact = true;
          model.userData.artifactId = artifact.id;
          
          // Thiết lập shadow
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.userData.isArtifact = true;
              child.userData.artifactId = artifact.id;
            }
          });
          
          scene.add(model);
          artifactsRef.current.push(model);
          
          console.log(`Đã tải hiện vật: ${artifact.name}`);
        },
        (xhr) => {
          console.log(`${artifact.name}: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
        },
        (error) => {
          console.error(`Lỗi khi tải hiện vật ${artifact.name}:`, error);
        }
      );
    });
    
    // Cleanup
    return () => {
      artifactsRef.current.forEach(model => {
        scene.remove(model);
      });
      artifactsRef.current = [];
    };
  }, [scene, artifacts]);

  return null; // Component này chỉ xử lý logic, không render gì
};

export default Artifacts;