import React from 'react';

const InfoPanel = ({ artifact, onClose }) => {
  if (!artifact) return null;
  
  return (
    <div id="info-panel" style={{ display: 'block' }}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h3>{artifact.name}</h3>
      <p>{artifact.description}</p>
      {artifact.imageUrl && (
        <img src={artifact.imageUrl} alt={artifact.name} />
      )}
      <button className="read-btn" onClick={() => {
        // Sử dụng Speech Synthesis API để đọc thông tin
        const speech = new SpeechSynthesisUtterance(artifact.description);
        window.speechSynthesis.speak(speech);
      }}>
        Nghe thông tin
      </button>
    </div>
  );
};

export default InfoPanel;