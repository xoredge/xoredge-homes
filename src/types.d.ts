
function viewHome(
    canvasId: string,
    sh3dFileUrl: string,
    onError: (err) => void,
    onProgress: (part, info, percentage) => void, options: {
        roundsPerMinute: number;                    // Rotation speed of the animation launched once home is loaded in rounds per minute, no animation if missing or equal to 0 
        navigationPanel: string;               // Displayed navigation arrows, "none" or "default" for default one or an HTML string containing elements with data-simulated-key 
        // attribute set "UP", "DOWN", "LEFT", "RIGHT"... to replace the default navigation panel, "none" if missing 
        aerialViewButtonId: string;      // Id of the aerial view radio button, radio buttons hidden if missing  
        virtualVisitButtonId: string;  // Id of the aerial view radio button, radio buttons hidden if missing  
        levelsAndCamerasListId: string;          // Id of the levels and cameras select component, hidden if missing
        /* level: "Roof", */                                    // Uncomment to select the displayed level, default level if missing */
        /* selectableLevels: ["Ground floor", "Roof"], */       // Uncomment to choose the list of displayed levels, no select component if empty array */
        /* camera: "Exterior view", */                          // Uncomment to select a camera, default camera if missing */
        /* selectableCameras: ["Exterior view", "Kitchen"], */  // Uncomment to choose the list of displayed cameras, no camera if missing */
        activateCameraSwitchKey: true                        // Switch between top view / virtual visit with space bar if not false or missing */
    })