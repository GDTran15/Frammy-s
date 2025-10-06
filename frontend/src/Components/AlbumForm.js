import axios from "axios";
import InputComponent from "./InputComponent";
import { useEffect, useState } from "react";
import Select from "react-select";
import { data } from "react-router-dom";
import AlbumList from "./AlbumList";


export default function AlbumForm({currentAlbum,title,usage,fetchAlbum}){
    const [albumName,setAlbumName] = useState(currentAlbum?.albumName || "");
    const [albumGenre,setAlbumGenre] = useState(currentAlbum?.genre || "");
    const [releaseDate, setReleaseDate] = useState(currentAlbum?.releaseDate || "");
    const [artistList,setArtistList] = useState([]);
    console.log(currentAlbum);
    const [artist,setArtist] = useState(currentAlbum?.artist || "");
    const [error,setError] = useState("");
    



    const token = localStorage.getItem("token");

    useEffect(() => {
        setAlbumName(currentAlbum?.albumName)
        setAlbumGenre(currentAlbum?.genre)
        setReleaseDate(currentAlbum?.releaseDate) 
    },[currentAlbum])

        const handleSubmit = (e) => {
            e.preventDefault();
            let data = {
                albumName : albumName,
                releaseDate : releaseDate,
                albumGenre : albumGenre,
                artistId : artist.value
            }
            const method = usage === "Add" ? axios.post : axios.put;
            const url = usage === "Add" ? "http://localhost:8080/albums" : `http://localhost:8080/albums/${currentAlbum.albumId}`;
            method(url,data,{
                headers:{
            "Authorization": `Bearer ${token}`
        }
            }).then((res) => {
                alert(res.data.data);
                fetchAlbum();
            }).catch((error) => {
                setError(error.response.data.message)
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
         <section>
            <div className="container">
            <div className="row mt-2 rounded-2">
                    <div className="col bg-white py-3 px-4">
        <h2>{title}</h2>
         <form onSubmit={handleSubmit}>
                                   <InputComponent 
                                   labelText="Album Name"
                                    changeHandle={(e) => setAlbumName(e.target.value)}
                                   inputType="text"
                                   inputValue={albumName}
                                   placeholderValue="Enter Album name"
                                   />
                                   <InputComponent 
                                   labelText="Album Genre"
                                    changeHandle={(e) => setAlbumGenre(e.target.value)}
                                   inputType="text"
                                   inputValue={albumGenre}
                                   placeholderValue="Enter Album genre"
                                   />
                                   <InputComponent 
                                   labelText="Release Date"
                                    changeHandle={(e) => setReleaseDate(e.target.value)}
                                   inputType="date"
                                   inputValue={releaseDate}
                                   placeholderValue="Enter Album genre"
                                   />
                                   <label className="">Owner of this album</label>
                                   <Select options={artistList} value={artist} onChange={handleChange} onMenuOpen={fetchArtist}/>
                                   
                                  
                                   <button type="submit" className="btn btn-warning w-100 mt-3">{usage}</button>
                                    <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>

                               </form>
                               </div>
                               </div>
                               </div>
            </section>
            
        </>
    )

}