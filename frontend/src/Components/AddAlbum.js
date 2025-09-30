import axios from "axios";
import InputComponent from "./InputComponent";
import { useState } from "react";
import Select from "react-select";
import { data } from "react-router-dom";
import AlbumList from "./AlbumList";


export default function AddAlbum(){
    const [albumName,setAlbumName] = useState("");
    const [albumGenre,setAlbumGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [artistList,setArtistList] = useState([]);
    const [artist,setArtist] = useState("");
    const [error,setError] = useState("");


    const token = localStorage.getItem("token");


        const handleSubmit = (e) => {
            e.preventDefault();
            let data = {
                albumName : albumName,
                releaseDate : releaseDate,
                albumGenre : albumGenre,
                artistId : artist.value
            }
            axios.post("http://localhost:8081/albums",data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data)
            }).catch((error) => {
                setError(error.response.data.message)
            })
        }

        const fetchArtist = () => {
             axios.get("http://localhost:8081/artists",{
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
         <section>
            <div className="container">
            <div className="row mt-2 rounded-2">
                    <div className="col bg-white py-3 px-4">
        <h2>Add Album</h2>
         <form onSubmit={handleSubmit}>
                                   <InputComponent 
                                   labelText="Album Name"
                                    changeHandle={(e) => setAlbumName(e.target.value)}
                                   inputType="text"
                                   value={albumName}
                                   placeholderValue="Enter Album name"
                                   />
                                   <InputComponent 
                                   labelText="Album Genre"
                                    changeHandle={(e) => setAlbumGenre(e.target.value)}
                                   inputType="text"
                                   value={setAlbumGenre}
                                   placeholderValue="Enter Album genre"
                                   />
                                   <InputComponent 
                                   labelText="Release Date"
                                    changeHandle={(e) => setReleaseDate(e.target.value)}
                                   inputType="date"
                                   value={releaseDate}
                                   placeholderValue="Enter Album genre"
                                   />
                                   <label className="">Owner of this album</label>
                                   <Select options={artistList} value={artist} onChange={handleChange} onMenuOpen={fetchArtist}/>
                                   
                                  
                                   <button type="submit" className="btn btn-warning w-100 mt-3">Add</button>
                                    <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>

                               </form>
                               </div>
                               </div>
                               </div>
            </section>
            <AlbumList/>
        </>
    )

}