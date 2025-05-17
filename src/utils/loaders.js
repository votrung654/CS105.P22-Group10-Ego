import * as THREE from 'three';
// Sửa lại dòng import này
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';

// Hàm tải model GLTF
export const loadGLTFModel = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    
    loader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      (xhr) => {
        console.log(`${url}: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
      },
      (error) => {
        console.error(`Error loading model from ${url}:`, error);
        reject(error);
      }
    );
  });
};

// Hàm tải texture
export const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new TextureLoader();
    
    loader.load(
      url,
      (texture) => {
        resolve(texture);
      },
      undefined,
      (error) => {
        console.error(`Error loading texture from ${url}:`, error);
        reject(error);
      }
    );
  });
};