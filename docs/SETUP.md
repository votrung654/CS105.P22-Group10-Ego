# SETUP.md

# Project Setup Instructions for 3D Museum Web

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js (version 14 or higher)
- npm (Node Package Manager, comes with Node.js)
- A code editor (e.g., Visual Studio Code)

## Installation Steps

1. **Clone the Repository**
   Open your terminal and run the following command to clone the repository:
   ```
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the actual URL of the repository.

2. **Navigate to the Project Directory**
   Change your directory to the project folder:
   ```
   cd 3d-museum-web
   ```

3. **Install Dependencies**
   Run the following command to install all necessary dependencies:
   ```
   npm install
   ```

4. **Run the Development Server**
   Start the development server with the following command:
   ```
   npm start
   ```
   This will launch the application in your default web browser. You can access it at `http://localhost:3000`.

5. **Build for Production**
   To create a production build of the application, run:
   ```
   npm run build
   ```
   This will generate a `dist` folder containing the optimized files for deployment.

## Additional Configuration
- If you need to customize the Webpack configuration, edit the `webpack.config.js` file located in the root directory.
- For any additional environment variables, create a `.env` file in the root directory and define your variables there.

## Troubleshooting
- If you encounter any issues during installation, ensure that your Node.js and npm versions are up to date.
- Check the console for any error messages and refer to the documentation for guidance.

## Conclusion
You are now set up to work on the 3D Museum Web project! Happy coding!