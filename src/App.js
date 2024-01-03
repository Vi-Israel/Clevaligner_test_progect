import './App.css';
import Three from './Three';
import {useEffect, useState} from "react";

function App() {

    const [fileUp, setFileUp] = useState();
    const [fileLow, setFileLow] = useState();

    const handleFileUpUpload = (event) => {
        setFileUp(event.target.files[0]);

    };
    const handleFileLowUpload = (event) => {
        setFileLow(event.target.files[0]);

    };



    return (
    <div className="App">
        <h3>Upload File</h3>
        Upload Upper Jaw:
        <input type="file" onChange={handleFileUpUpload} />
        Upload Lower Jaw:
        <input type="file" onChange={handleFileLowUpload} />

      <Three fileUp={fileUp} fileLow={fileLow}/>
    </div>
  );
}

export default App;
