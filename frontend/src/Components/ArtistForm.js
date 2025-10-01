import { useEffect, useState } from "react"
import InputComponent from "./InputComponent"
import axios from "axios";






export default function ArtistForm({currentArtist,title,usage,fetchArtist}){
    console.log(currentArtist);
    const [artistName,setArtistName] = useState(currentArtist?.artistName || "");
    const [artistInfo,setArtistInfo] = useState(currentArtist?.artistInfo || "");
    const [awards,setAwards] = useState(currentArtist?.awards || "");
    const [error,setError] = useState("");
    const token = localStorage.getItem("token");
    console.log(artistName)
    useEffect(() => {
        setArtistName(currentArtist?.artistName)
        setArtistInfo(currentArtist?.artistInfo)
        setAwards(currentArtist?.awards)
    }, [currentArtist]
    )
    const handleSubmit = (e) => {
          e.preventDefault();

            
            let data = {
                artistName : artistName,
                artistInfo : artistInfo,
                awards : awards,
                
            }
            console.log(data);

            const method = (usage === "Add" ? axios.post : axios.put);
            const url = (usage === "Add" 
                ? "http://localhost:8080/artists"
                : `http://localhost:8080/artists/${currentArtist.artistId}`);
            method(url,data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data);
                fetchArtist();
            }).catch ((err)  => {
                setError(err.response.data.message);
                console.log(err)
            })
        }
    return (
        <>
         <section>
                    <div className="container">
                    <div className="row mt-2 rounded-2">
                            <div className="col bg-white py-3 px-4">
                    <h2>{title}</h2>
                    <form onSubmit={handleSubmit}>
                                   <InputComponent 
                                   labelText="Artist Name"
                                    changeHandle={(e) => setArtistName(e.target.value)}
                                   inputType="text"
                                   inputValue={artistName}
                                   placeholderValue="Enter your artist name"
                                   />
                                   
                                   <InputComponent 
                                   labelText="Artist Info"
                                    changeHandle={(e) => setArtistInfo(e.target.value)}
                                   inputType="text"
                                   inputValue={artistInfo}
                                   placeholderValue="Enter artist info"
                                   />
                                   <InputComponent 
                                   labelText="Awards"
                                    changeHandle={(e) => setAwards(e.target.value)}
                                   inputType="text"
                                   inputValue={awards}
                                   placeholderValue="Enter artist awards"
                                   />
                                   <button type="submit" className="btn btn-warning w-100 mt-2">{usage}</button>
                                 <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>
        
                               </form>
                               </div>
                               </div> 
                               </div>
                               </section>  
        </>
    )
}