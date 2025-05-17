import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { checkCollision, handleCollision } from '../utils/collision';

class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.pointerControls = new PointerLockControls(camera, domElement);
    this.orbitControls = new OrbitControls(camera, domElement);
    
    // Mặc định vô hiệu hóa OrbitControls
    this.orbitControls.enabled = false;
    
    // Thiết lập các giới hạn cho OrbitControls
    this.orbitControls.minDistance = 1;
    this.orbitControls.maxDistance = 10;
    this.orbitControls.enableDamping = true;
    
    // Các biến kiểm soát di chuyển
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.speed = 0.1;
    
    this._setupEventListeners();
  }
  
  _setupEventListeners() {
    document.addEventListener('keydown', (event) => this._onKeyDown(event));
    document.addEventListener('keyup', (event) => this._onKeyUp(event));
  }
  
  _onKeyDown(event) {
    if (!this.pointerControls.isLocked) return;
    
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;
    }
  }
  
  _onKeyUp(event) {
    if (!this.pointerControls.isLocked) return;
    
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }
  }
  
  update(delta, collisionObjects = []) {
    if (this.pointerControls.isLocked) {
      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      
      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();
      
      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * this.speed;
      }
      
      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * this.speed;
      }
      
      // Kiểm tra va chạm
      const nextPosition = this.camera.position.clone();
      nextPosition.x -= this.velocity.x;
      nextPosition.z -= this.velocity.z;
      
      // Nếu có va chạm, xử lý phản ứng
      if (collisionObjects.length > 0) {
        const collisionResult = checkCollision(nextPosition, collisionObjects);
        if (collisionResult.collision) {
          // Xử lý phản ứng va chạm
          handleCollision(nextPosition, collisionResult);
        } else {
          // Nếu không có va chạm, di chuyển bình thường
          this.pointerControls.moveRight(-this.velocity.x);
          this.pointerControls.moveForward(-this.velocity.z);
        }
      } else {
        // Nếu không có đối tượng va chạm, di chuyển bình thường
        this.pointerControls.moveRight(-this.velocity.x);
        this.pointerControls.moveForward(-this.velocity.z);
      }
    } else if (this.orbitControls.enabled) {
      this.orbitControls.update();
    }
  }
  
  enablePointerControls() {
    this.pointerControls.lock();
    this.orbitControls.enabled = false;
  }
  
  enableOrbitControls(target) {
    this.pointerControls.unlock();
    this.orbitControls.enabled = true;
    if (target) {
      this.orbitControls.target.copy(target.position);
    }
  }
  
  getPosition() {
    return this.camera.position.clone();
  }
  
  getDirection() {
    return this.camera.getWorldDirection(new THREE.Vector3());
  }
}

export default CameraController;