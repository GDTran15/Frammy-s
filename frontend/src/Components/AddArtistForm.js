import { useState } from "react"
import InputComponent from "./InputComponent"
import axios from "axios";

export default function AddArtist(){
    const [artistName,setArtistName] = useState("");
    const [artistInfo,setArtistInfo] = useState("");
    const [awards,setAwards] = useState("");
    console.log(artistName)
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return(
        <>
            <h2>Add Artist</h2>
            <form onSubmit={handleSubmit}>
                           <InputComponent 
                           labelText="Artist Name"
                            changeHandle={(e) => setArtistName(e.target.value)}
                           inputType="text"
                           value={artistName}
                           placeholderValue="Enter your artist name"
                           />
                           
                           <InputComponent 
                           labelText="Artist Info"
                            changeHandle={(e) => setArtistInfo(e.target.value)}
                           inputType="text"
                           value={artistInfo}
                           placeholderValue="Enter artist info"
                           />
                           <InputComponent 
                           labelText="Awards"
                            changeHandle={(e) => setAwards(e.target.value)}
                           inputType="text"
                           value={awards}
                           placeholderValue="Enter artist awards"
                           />
                           <button type="submit" className="btn btn-warning w-100 mt-2">Add</button>
                            
                       </form>
                       
                      
        </>
    )
}