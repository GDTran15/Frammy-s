   import axios from "axios";
import InputComponent from "./InputComponent";
import { useEffect, useState } from "react";
import Select from "react-select";




export default function SongForm({currentSong,title,usage, fetchSong}){

    const [songName,setSongName] = useState( currentSong?.songName || "");
    const [songGenre,setSongGenre] = useState(currentSong?.genre || "");
    const [releaseDate, setReleaseDate] = useState(currentSong?.releaseDate || "");
    const [artistList,setArtistList] = useState([]);
    const [artist,setArtist] = useState("");
    const [error,setError] = useState("");
    const token = localStorage.getItem("token");


        const handleSubmit = (e) => {
           
            e.preventDefault();

            
            let data = {
                songName : songName,
                releaseDate : releaseDate,
                songGenre : songGenre,
                artistId : artist.value
            }
            const method = usage === "Add" ? axios.post : axios.put;
            const url = (usage === "Add" ? "http://localhost:8080/songs" : `http://localhost:8080/songs/${currentSong.songId}`);
            method(url,data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data)
                fetchSong();
            }).catch ((err)  => {
                setError(err.response.data.message);
            })
        }
        useEffect(() => {
            setSongName(currentSong?.songName);
            setSongGenre(currentSong?.genre);
            setReleaseDate(currentSong?.releaseDate);
        },[currentSong])

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
    return (
        <>
         <section>
            <div className="container">
            <div className="row mt-2 rounded-2">
                    <div className="col bg-white py-3 px-4">
        <h2>{title}</h2>
         <form onSubmit={handleSubmit}>
                                   <InputComponent 
                                   labelText="Song Name"
                                    changeHandle={(e) => setSongName(e.target.value)}
                                   inputType="text"
                                   inputValue={songName}
                                   placeholderValue="Enter song name"
                                   />
                                   <InputComponent 
                                   labelText="Song Genre"
                                    changeHandle={(e) => setSongGenre(e.target.value)}
                                   inputType="text"
                                   inputValue={songGenre}
                                   placeholderValue="Enter song genre"
                                   />
                                   <InputComponent 
                                   labelText="Release Date"
                                    changeHandle={(e) => setReleaseDate(e.target.value)}
                                   inputType="date"
                                   inputValue={releaseDate}
                                   placeholderValue="Enter song genre"
                                   />
                                   <label className="">Owner of this song</label>
                                   <Select options={artistList} value={artist} onChange={handleChange} onMenuOpen={fetchArtist}/>
                                   
                                  
                                   <button type="submit" className="btn btn-warning w-100 mt-3">Add</button>
                                    <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>

                               </form>
                               </div>
                               </div>
                               </div>
                               </section>
        </>
    )
}