import * as THREE from 'three';

class AnimationController {
  constructor() {
    this.animations = new Map(); // Map để lưu trữ các animation
    this.mixers = new Map();     // Map để lưu trữ các AnimationMixer
    this.clock = new THREE.Clock();
  }
  
  /**
   * Đăng ký một model có animation
   * @param {Object} model - Model 3D (thường là GLTF model)
   * @param {String} name - Tên định danh cho model
   */
  registerModel(model, name) {
    if (!model || !model.animations || model.animations.length === 0) {
      console.warn(`Model ${name} không có animations để đăng ký.`);
      return;
    }
    
    // Tạo mixer mới cho model
    const mixer = new THREE.AnimationMixer(model.scene || model);
    this.mixers.set(name, mixer);
    
    // Đăng ký tất cả animation của model
    const animationsMap = new Map();
    model.animations.forEach(clip => {
      const action = mixer.clipAction(clip);
      animationsMap.set(clip.name, action);
    });
    
    this.animations.set(name, animationsMap);
    
    console.log(`Đã đăng ký ${animationsMap.size} animations cho model ${name}`);
  }
  
  /**
   * Phát một animation
   * @param {String} modelName - Tên model
   * @param {String} animationName - Tên animation
   * @param {Object} options - Các tùy chọn (loop, duration, etc.)
   */
  play(modelName, animationName, options = {}) {
    if (!this.animations.has(modelName)) {
      console.warn(`Không tìm thấy model ${modelName}.`);
      return;
    }
    
    const modelAnimations = this.animations.get(modelName);
    
    if (!modelAnimations.has(animationName)) {
      console.warn(`Không tìm thấy animation ${animationName} cho model ${modelName}.`);
      return;
    }
    
    const action = modelAnimations.get(animationName);
    
    // Thiết lập các tùy chọn
    if (options.loop !== undefined) {
      action.loop = options.loop ? THREE.LoopRepeat : THREE.LoopOnce;
    }
    
    if (options.clampWhenFinished !== undefined) {
      action.clampWhenFinished = options.clampWhenFinished;
    }
    
    if (options.duration !== undefined) {
      action.timeScale = action.getClip().duration / options.duration;
    }
    
    // Phát animation với fade in nếu được chỉ định
    const fadeIn = options.fadeIn || 0.2;
    action.reset().fadeIn(fadeIn).play();
    
    console.log(`Đang phát animation ${animationName} cho model ${modelName}`);
  }
  
  /**
   * Dừng một animation
   * @param {String} modelName - Tên model
   * @param {String} animationName - Tên animation (nếu không chỉ định, dừng tất cả animation của model)
   * @param {Number} fadeOut - Thời gian fade out (mặc định 0.2s)
   */
  stop(modelName, animationName, fadeOut = 0.2) {
    if (!this.animations.has(modelName)) {
      console.warn(`Không tìm thấy model ${modelName}.`);
      return;
    }
    
    const modelAnimations = this.animations.get(modelName);
    
    if (animationName && modelAnimations.has(animationName)) {
      // Dừng animation cụ thể
      const action = modelAnimations.get(animationName);
      action.fadeOut(fadeOut);
    } else if (!animationName) {
      // Dừng tất cả animation của model
      modelAnimations.forEach(action => {
        action.fadeOut(fadeOut);
      });
    } else {
      console.warn(`Không tìm thấy animation ${animationName} cho model ${modelName}.`);
    }
  }
  
  /**
   * Cập nhật tất cả animation mixers
   * @param {Number} delta - Thời gian delta (nếu không được chỉ định, sẽ sử dụng internal clock)
   */
  update(delta) {
    // Nếu delta không được chỉ định, sử dụng clock
    if (delta === undefined) {
      delta = this.clock.getDelta();
    }
    
    this.mixers.forEach(mixer => {
      mixer.update(delta);
    });
  }
}

export default AnimationController;
