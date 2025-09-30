import { use, useState } from "react"
import InputComponent from "./InputComponent"
import axios from "axios";
import ArtistList from "./ArtistList";

export default function AddArtist(){
    const [artistName,setArtistName] = useState("");
    const [artistInfo,setArtistInfo] = useState("");
    const [awards,setAwards] = useState("");
    const [error,setError] = useState("");
    const token = localStorage.getItem("token");
    console.log(artistName)
    const handleSubmit = (e) => {
          e.preventDefault();

            
            let data = {
                artistName : artistName,
                artistInfo : artistInfo,
                awards : awards,
                
            }
            axios.post("http://localhost:8080/artists",data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data)
            }).catch ((err)  => {
                setError(err.response.data.message);
            })
        }
    return(
        <>
        <section>
            <div className="container">
            <div className="row mt-2 rounded-2">
                    <div className="col bg-white py-3 px-4">
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
                         <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>

                       </form>
                       </div>
                       </div> 
                       </div>
                       </section>                      
                    <ArtistList/>
        </>
    )
}