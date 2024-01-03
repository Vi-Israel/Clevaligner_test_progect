import './App.css';
import Three from './Three';
import { useState} from "react";

function App() {

    const [fileUp, setFileUp] = useState();
    const [fileLow, setFileLow] = useState();
    const [isLoaded, setIsLoaded]=useState(false)
    const handleFileUpUpload = (event) => {
        setFileUp(event.target.files[0]);

    };
    const handleFileLowUpload = (event) => {
        setFileLow(event.target.files[0]);

    };
    const handleUpload = () => {

        if(fileLow && fileUp){
            setIsLoaded(true)
        }

    };



    return (
    <div className="App">
        Upload Upper Jaw:
        <input type="file" onChange={handleFileUpUpload} />
        Upload Lower Jaw:
        <input type="file" onChange={handleFileLowUpload} />
        <button onClick={handleUpload}>Upload</button>
      <Three fileUp={fileUp} fileLow={fileLow} isLoaded={isLoaded}/>
    </div>
  );
}

export default App;
