import axios from "axios";
import InputComponent from "./InputComponent";
import { useState } from "react";
import Select from "react-select";
import { data } from "react-router-dom";


export default function AddSong(){
    const [songName,setSongName] = useState("");
    const [songGenre,setSongGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [artistList,setArtistList] = useState([]);
    const [artist,setArtist] = useState("");
    const token = localStorage.getItem("token");


        const handleSubmit = (e) => {
            e.preventDefault();
            let data = {
                songName : songName,
                releaseDate : releaseDate,
                songGenre : songGenre,
                artistId : artist.value
            }
            axios.post("http://localhost:8080/songs",data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data)
            })
        }

        const fetchArtist = () => {
             axios.get("http://localhost:8080/artists",{
            headers:{
            "Authorization": `Bearer ${token}`
        }
        }).then((res) =>{
        const data = res.data.data.map(item => ({
          value: item.artistId,
         label: item.artistName
        }));
        setArtistList(data);
        })
        }

        const handleChange = (e) => {
            setArtist(e);
            
        }
    return(
        
        <>
        <h2>Add Song</h2>
         <form onSubmit={handleSubmit}>
                                   <InputComponent 
                                   labelText="Song Name"
                                    changeHandle={(e) => setSongName(e.target.value)}
                                   inputType="text"
                                   value={songName}
                                   placeholderValue="Enter song name"
                                   />
                                   <InputComponent 
                                   labelText="Song Genre"
                                    changeHandle={(e) => setSongGenre(e.target.value)}
                                   inputType="text"
                                   value={setSongGenre}
                                   placeholderValue="Enter song genre"
                                   />
                                   <InputComponent 
                                   labelText="Release Date"
                                    changeHandle={(e) => setReleaseDate(e.target.value)}
                                   inputType="date"
                                   value={releaseDate}
                                   placeholderValue="Enter song genre"
                                   />
                                   <label className="">Owner of this song</label>
                                   <Select options={artistList} value={artist} onChange={handleChange} onMenuOpen={fetchArtist}/>
                                   
                                  
                                   <button type="submit" className="btn btn-warning w-100 mt-2">Add</button>
                                    
                               </form>
        </>
    )

}