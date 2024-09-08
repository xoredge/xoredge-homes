import { useEffect } from 'react';
import './App.css';

enum HomeRecorder {
  READING_HOME = 'Reading home'
}

enum Node3D {
  READING_MODEL = 'Reading model'
}
let loadHomeCalled = false; // to fix useEffect runs twice in development

function App() {
  //const [progressMsg, setProgressMsg] = useState('');
  
  useEffect(() => {
    if(loadHomeCalled) return;
    loadHomeCalled = true;
    const url = new URLSearchParams(location.search);
    const homeName = url.get('id');
    loadHome(homeName!);
  }, []);


  // calling loadHome more than once causes problem with renderer
  const loadHome = (homeName: string) => {
    console.log('rendering ...')

   

    // Display home in canvas 3D
    // Mouse and keyboard navigation explained at 
    // You may also switch between aerial view and virtual visit with the space bar
    // For browser compatibility, see http://caniuse.com/webgl
    viewHome("viewerCanvas",    // Id of the canvas
      `/sh3d/${homeName}.sh3d`,           // URL or relative URL of the home to display 
      onerror,           // Callback called in case of error
      onprogression,     // Callback called while loading 
      {
        roundsPerMinute: 0,                    // Rotation speed of the animation launched once home is loaded in rounds per minute, no animation if missing or equal to 0 
        navigationPanel: "none",               // Displayed navigation arrows, "none" or "default" for default one or an HTML string containing elements with data-simulated-key 
        // attribute set "UP", "DOWN", "LEFT", "RIGHT"... to replace the default navigation panel, "none" if missing 
        aerialViewButtonId: "aerialView",      // Id of the aerial view radio button, radio buttons hidden if missing  
        virtualVisitButtonId: "virtualVisit",  // Id of the aerial view radio button, radio buttons hidden if missing  
        levelsAndCamerasListId: "levelsAndCameras",          // Id of the levels and cameras select component, hidden if missing
        /* level: "Roof", */                                    // Uncomment to select the displayed level, default level if missing */
        /* selectableLevels: ["Ground floor", "Roof"], */       // Uncomment to choose the list of displayed levels, no select component if empty array */
        /* camera: "Exterior view", */                          // Uncomment to select a camera, default camera if missing */
        /* selectableCameras: ["Exterior view", "Kitchen"], */  // Uncomment to choose the list of displayed cameras, no camera if missing */
        activateCameraSwitchKey: true                        // Switch between top view / virtual visit with space bar if not false or missing */
      });
  };



  var onerror = (err: any) => {
    if (err == "No WebGL") {
      alert("Sorry, your browser doesn't support WebGL.");
    }
    else {
      console.log(err.stack);
      console.error(err.message ? err.constructor.name + " " + err.message : err);
    }
  };

  var onprogression = (part: any, info: any, percentage: any) => {
    var progress: any = document.getElementById("viewerProgress");

    if (part === HomeRecorder.READING_HOME) {
      // Home loading is finished 
      progress.value = percentage * 100;
      info = info.substring(info.lastIndexOf('/') + 1);
      progress.style.visibility = 'visible';
    }
    else if (part === Node3D.READING_MODEL) {
      // Models loading is finished 
      progress.value = 100 + percentage * 100;

      if (percentage === 1) {
        progress.style.visibility = 'hidden';
      }
    }

    //const _progressMsg = (percentage ? Math.floor(percentage * 100) + "% " : "") + part + " " + info;
    //setProgressMsg(_progressMsg);
  };

  return (
    <>
      <progress id="viewerProgress" value="0" max="200"></progress>

      <canvas id="viewerCanvas" tabIndex={1}></canvas>

      <div id="viewerNavigationDiv">
        <input id="aerialView" name="cameraType" type="radio" />
        <label htmlFor="aerialView">Aerial view</label>

        <input id="virtualVisit" name="cameraType" type="radio" />
        <label htmlFor="virtualVisit">Virtual visit</label>

        <select id="levelsAndCameras"></select>
      </div>
    </>
  )
}

export default App
