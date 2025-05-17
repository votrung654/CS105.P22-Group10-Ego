// AudioController.js

class AudioController {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = {};
    }

    loadSound(name, url) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.sounds[name] = audioBuffer;
            })
            .catch(error => console.error(`Error loading sound: ${name}`, error));
    }

    playSound(name) {
        if (this.sounds[name]) {
            const source = this.audioContext.createBufferSource();
            source.buffer = this.sounds[name];
            source.connect(this.audioContext.destination);
            source.start(0);
        } else {
            console.warn(`Sound not found: ${name}`);
        }
    }

    stopSound(name) {
        // Implementation for stopping sound if needed
    }

    setVolume(volume) {
        this.audioContext.gain.value = volume;
    }
}

export default AudioController;