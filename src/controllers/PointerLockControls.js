// PointerLockControls.js
import * as THREE from 'three';

export class PointerLockControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.isLocked = false;

        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this.PI_2 = Math.PI / 2;

        // Sử dụng arrow function để bind đúng ngữ cảnh `this`
        this.onPointerlockChange = () => {
            this.isLocked = document.pointerLockElement === this.domElement;
            console.log('Pointer lock changed. isLocked:', this.isLocked);
        };

        this.onPointerlockError = () => {
            console.error('PointerLockControls: Unable to use Pointer Lock API');
        };

        this.onMouseMove = (event) => {
            if (!this.isLocked) return;

            const movementX = event.movementX || 0;
            const movementY = event.movementY || 0;

            this.euler.setFromQuaternion(this.camera.quaternion);

            this.euler.y -= movementX * 0.002;
            this.euler.x -= movementY * 0.002;
            this.euler.x = Math.max(-this.PI_2, Math.min(this.PI_2, this.euler.x));

            this.camera.quaternion.setFromEuler(this.euler);
        };

        this.connect();
    }

    connect() {
        // Khi click, yêu cầu pointer lock
        this.domElement.addEventListener('click', () => {
            this.domElement.requestPointerLock();
        });

        document.addEventListener('pointerlockchange', this.onPointerlockChange, false);
        document.addEventListener('pointerlockerror', this.onPointerlockError, false);
        document.addEventListener('mousemove', this.onMouseMove, false);
    }

    disconnect() {
        document.removeEventListener('pointerlockchange', this.onPointerlockChange, false);
        document.removeEventListener('pointerlockerror', this.onPointerlockError, false);
        document.removeEventListener('mousemove', this.onMouseMove, false);
    }

    lock() {
        this.domElement.requestPointerLock();
    }

    unlock() {
        document.exitPointerLock();
    }

    getObject() {
        return this.camera;
    }

    dispose() {
        this.disconnect();
    }
}
