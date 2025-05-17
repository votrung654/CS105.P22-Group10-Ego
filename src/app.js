import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

// Các components
import Scene from './components/Museum/Scene';
import Controls from './components/UI/Controls';
import InfoPanel from './components/UI/InfoPanel';
import Minimap from './components/UI/Minimap';
import LoadingScreen from './components/UI/LoadingScreen';
import Environment from './components/Museum/Environment';
import Lighting from './components/Museum/Lighting';
import Artifacts from './components/Museum/Artifacts';
import HelpMenu from './components/UI/HelpMenu';

// Services
import artifactService from './services/artifactService';
import speechService from './services/speechService';

// Dữ liệu
import artifactsData from './data/artifacts';

// CSS
import './styles.css';

// Tạo Context API cho state management
export const MuseumContext = createContext(null);

const App = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
  const [mapData, setMapData] = useState(null);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  
  // Setup và khởi tạo các thành phần khi component được mount
  useEffect(() => {
    // Giả lập quá trình loading
    const simulateLoading = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setLoadingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }, 200);
    };
    
    simulateLoading();
    
    // Event listener cho phím tắt mở Help Menu
    const handleKeyDown = (e) => {
      if (e.key === 'h' || e.key === 'H') {
        setShowHelpMenu(prevState => !prevState);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Các functions để xử lý tương tác artifact
  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
  };
  
  const handleCloseInfoPanel = () => {
    setSelectedArtifact(null);
    speechService.stop();
  };
  
  // Context value cho MuseumContext
  const contextValue = {
    scene,
    camera,
    renderer,
    selectedArtifact,
    setSelectedArtifact: handleArtifactClick,
    closeInfoPanel: handleCloseInfoPanel,
    artifactsData,
    isLoading,
    loadingProgress
  };
  
  return (
    <MuseumContext.Provider value={contextValue}>
      <div className="museum-app">
        {isLoading && <LoadingScreen isLoading={isLoading} loadingProgress={loadingProgress} />}
        
        {!isLoading && (
          <>
            <Scene onSceneCreated={setScene} onCameraCreated={setCamera} onRendererCreated={setRenderer} />
            {scene && camera && <Environment scene={scene} />}
            {scene && <Lighting scene={scene} />}
            {scene && camera && <Artifacts scene={scene} artifacts={artifactsData} onArtifactClick={handleArtifactClick} />}
            <Controls />
            <Minimap mapData={mapData} playerPosition={playerPosition} />
            {selectedArtifact && <InfoPanel artifact={selectedArtifact} onClose={handleCloseInfoPanel} />}
            <HelpMenu isVisible={showHelpMenu} onClose={() => setShowHelpMenu(false)} />
          </>
        )}
      </div>
    </MuseumContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));