# Project Architecture for 3D Museum Web

## Overview
The 3D Museum Web project aims to create an interactive virtual museum experience on the web. This document outlines the architecture of the project, detailing the structure, components, and technologies used.

## Project Structure
The project is organized into several key directories, each serving a specific purpose:

- **src/**: Contains the source code for the application.
  - **assets/**: All assets used in the project, including models, textures, audio, and images.
    - **models/**: 3D models for artifacts and the museum environment.
      - **artifacts/**: 3D models of the artifacts.
      - **environment/**: 3D models of the museum structure.
    - **textures/**: Texture files for the models.
    - **audio/**: Audio files for the project.
    - **images/**: Image files used in the project.
  - **components/**: React components for the project.
    - **UI/**: User interface components.
      - **InfoPanel.js**: Displays information about selected artifacts.
      - **Minimap.js**: Displays a mini-map of the museum.
      - **Controls.js**: User controls component.
    - **Museum/**: Components related to the museum environment.
      - **Scene.js**: Sets up the 3D scene.
      - **Lighting.js**: Manages lighting in the scene.
      - **Artifacts.js**: Loads and displays artifacts.
      - **Navigation.js**: Handles user navigation within the museum.
  - **controllers/**: Manages different aspects of the application.
    - **CameraController.js**: Manages camera movements and controls.
    - **InteractionController.js**: Handles user interactions with artifacts.
    - **AudioController.js**: Manages audio playback and controls.
  - **utils/**: Utility functions for the project.
    - **loaders.js**: Functions for loading 3D models and assets.
    - **optimization.js**: Functions for optimizing performance (e.g., LoD, culling).
    - **helpers.js**: General helper functions used throughout the project.
  - **services/**: Services for handling specific functionalities.
    - **artifactService.js**: Manages artifact data and interactions.
    - **speechService.js**: Handles speech synthesis functionality.
  - **app.js**: Main application file that initializes the project and sets up the main components.
  - **index.html**: Main HTML file that serves the application.

- **public/**: Contains public assets.
  - **favicon.ico**: The favicon for the application.
  - **index.html**: An additional HTML file for public access.

- **docs/**: Documentation for the project.
  - **ARCHITECTURE.md**: Documentation outlining the architecture of the project.
  - **SETUP.md**: Instructions for setting up the project.
  - **TEAM_ROLES.md**: Documentation detailing team roles and responsibilities.

- **package.json**: Configuration file for npm, listing dependencies and scripts for the project.

- **webpack.config.js**: Configuration file for Webpack, specifying how to bundle the application.

- **README.md**: Documentation file for the project, providing an overview and instructions.

## Technologies Used
- **Three.js**: A JavaScript library for creating 3D graphics in the browser.
- **React**: A JavaScript library for building user interfaces.
- **WebGL**: A web standard for rendering 3D graphics.
- **Node.js**: JavaScript runtime for server-side development.
- **Webpack**: Module bundler for JavaScript applications.

## Conclusion
This architecture document provides a comprehensive overview of the 3D Museum Web project. It serves as a guide for developers and team members to understand the structure and components of the application, facilitating collaboration and development.