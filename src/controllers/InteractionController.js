import * as THREE from 'three';
import artifactService from '../services/artifactService';
import speechService from '../services/speechService';

class InteractionController {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedArtifact = null;
        this.hoverArtifact = null;
        this.originalMaterials = new Map();
        this.artifacts = [];
        this.enabled = true;
        this.viewingArtifact = false;
        
        // Material cho highlighting
        this.highlightMaterial = new THREE.MeshStandardMaterial({
            color: 0xff9900,
            emissive: 0x553300,
            metalness: 0.7,
            roughness: 0.3
        });
        
        this.init();
    }
    
    init() {
        // Thêm sự kiện click và hover
        window.addEventListener('click', this.onMouseClick.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        
        // Load artifacts từ service
        this.loadArtifacts();
    }
    
    async loadArtifacts() {
        try {
            this.artifacts = await artifactService.getAllArtifacts();
        } catch (error) {
            console.error('Failed to load artifacts:', error);
        }
    }
    
    registerArtifact(object, artifactData) {
        object.userData.isArtifact = true;
        object.userData.artifactId = artifactData.id;
        this.artifacts.push(object);
    }
    
    onMouseMove(event) {
        if (!this.enabled || this.viewingArtifact) return;
        
        // Tính toán vị trí chuột trên màn hình
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Cập nhật raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Tìm các vật thể giao với tia
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Nếu đang hover trên artifact khác, reset artifact trước đó
        if (this.hoverArtifact && 
            (intersects.length === 0 || 
             !intersects[0].object.userData.isArtifact || 
             this.hoverArtifact !== intersects[0].object)) {
            this.resetHoverArtifact();
        }
        
        // Nếu hover vào artifact mới
        if (intersects.length > 0 && intersects[0].object.userData.isArtifact) {
            if (this.hoverArtifact !== intersects[0].object) {
                this.handleArtifactHover(intersects[0].object);
            }
            
            // Thay đổi cursor
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
    }
    
    onMouseClick(event) {
        if (!this.enabled) return;
        
        // Cập nhật tọa độ chuột và raycaster
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Tìm vật thể giao với tia
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Xử lý khi click vào artifact
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.isArtifact) {
                this.handleArtifactSelection(object);
            }
        }
    }
    
    handleArtifactHover(artifact) {
        if (this.hoverArtifact === artifact) return;
        
        // Reset hover artifact trước đó
        this.resetHoverArtifact();
        
        // Lưu material gốc
        if (artifact.material && !this.originalMaterials.has(artifact)) {
            this.originalMaterials.set(artifact, artifact.material.clone());
        }
        
        // Highlight artifact
        this.hoverArtifact = artifact;
        if (Array.isArray(artifact.material)) {
            artifact.material.forEach((m, index) => {
                artifact.material[index] = this.highlightMaterial.clone();
            });
        } else if (artifact.material) {
            artifact.material = this.highlightMaterial.clone();
        }
    }
    
    resetHoverArtifact() {
        if (!this.hoverArtifact) return;
        
        // Khôi phục material gốc
        if (this.originalMaterials.has(this.hoverArtifact)) {
            this.hoverArtifact.material = this.originalMaterials.get(this.hoverArtifact);
            this.originalMaterials.delete(this.hoverArtifact);
        }
        
        this.hoverArtifact = null;
    }
    
    async handleArtifactSelection(artifact) {
        if (!artifact.userData.artifactId) return;
        
        try {
            // Lấy thông tin chi tiết về artifact
            const artifactData = await artifactService.getArtifactById(artifact.userData.artifactId);
            
            // Hiển thị InfoPanel
            const infoPanel = document.getElementById('info-panel');
            if (infoPanel) {
                infoPanel.innerHTML = `
                    <button class="close-btn" id="close-info-panel">X</button>
                    <h3>${artifactData.name}</h3>
                    <p>${artifactData.description}</p>
                    ${artifactData.imageUrl ? `<img src="${artifactData.imageUrl}" alt="${artifactData.name}" />` : ''}
                    <button class="read-btn" id="read-info">Nghe thông tin</button>
                `;
                infoPanel.style.display = 'block';
                
                // Thêm sự kiện cho nút đóng
                document.getElementById('close-info-panel').addEventListener('click', () => {
                    infoPanel.style.display = 'none';
                    speechService.stop();
                    this.viewingArtifact = false;
                });
                
                // Thêm sự kiện cho nút đọc thông tin
                document.getElementById('read-info').addEventListener('click', () => {
                    speechService.speak(artifactData.description);
                });
                
                // Chuyển sang chế độ xem chi tiết artifact
                this.viewingArtifact = true;
            }
        } catch (error) {
            console.error('Failed to get artifact data:', error);
        }
    }
    
    enable() {
        this.enabled = true;
    }
    
    disable() {
        this.enabled = false;
        this.resetHoverArtifact();
    }
}

export default InteractionController;