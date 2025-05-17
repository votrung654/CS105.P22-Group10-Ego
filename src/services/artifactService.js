import artifactsData from '../data/artifacts';

// Mock service sử dụng dữ liệu cục bộ thay vì API
const artifactService = {
    getAllArtifacts: async () => {
        return new Promise((resolve) => {
            // Giả lập độ trễ của mạng
            setTimeout(() => {
                resolve(artifactsData);
            }, 500);
        });
    },

    getArtifactById: async (id) => {
        return new Promise((resolve, reject) => {
            const artifact = artifactsData.find(item => item.id === id);
            if (artifact) {
                setTimeout(() => {
                    resolve(artifact);
                }, 300);
            } else {
                reject(new Error(`Không tìm thấy hiện vật với id ${id}`));
            }
        });
    },

    // Các phương thức khác giữ nguyên nhưng dùng dữ liệu cục bộ
    createArtifact: async (artifactData) => {
        return new Promise((resolve) => {
            const newArtifact = {
                ...artifactData,
                id: Math.max(...artifactsData.map(a => a.id)) + 1
            };
            artifactsData.push(newArtifact);
            setTimeout(() => {
                resolve(newArtifact);
            }, 300);
        });
    },

    updateArtifact: async (id, artifactData) => {
        return new Promise((resolve, reject) => {
            const index = artifactsData.findIndex(item => item.id === id);
            if (index !== -1) {
                artifactsData[index] = { ...artifactsData[index], ...artifactData };
                setTimeout(() => {
                    resolve(artifactsData[index]);
                }, 300);
            } else {
                reject(new Error(`Không tìm thấy hiện vật với id ${id}`));
            }
        });
    },

    deleteArtifact: async (id) => {
        return new Promise((resolve, reject) => {
            const index = artifactsData.findIndex(item => item.id === id);
            if (index !== -1) {
                artifactsData.splice(index, 1);
                setTimeout(() => {
                    resolve();
                }, 300);
            } else {
                reject(new Error(`Không tìm thấy hiện vật với id ${id}`));
            }
        });
    }
};

export default artifactService;