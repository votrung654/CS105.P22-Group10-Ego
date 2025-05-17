// This file contains the speechService module for handling speech synthesis functionality in the 3D museum web application.

class SpeechService {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isSpeaking = false;
    }

    speak(text) {
        if (this.isSpeaking) {
            this.stop();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
        };

        this.synth.speak(utterance);
        this.isSpeaking = true;
    }

    stop() {
        if (this.isSpeaking) {
            this.synth.cancel();
            this.isSpeaking = false;
        }
    }

    isSpeaking() {
        return this.isSpeaking;
    }
}

export default new SpeechService();