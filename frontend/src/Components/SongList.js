import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button } from "react-bootstrap";
import SongForm from "./SongForm";

export default function SongList({title}){
    const [songList,setSongList] = useState([]);
    const [page,setPage] = useState("0");
    
    const [totalPage,setTotalPage] = useState(0);
     const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    const token = localStorage.getItem("token");


    const fetchSong = () => {
        axios.get(`http://localhost:8080/songs/page?page=${page}&size=9`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
              setSongList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
              console.log(res);
        })
    }
    useEffect(() => fetchSong(),[page,token]); 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this song?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8080/songs/${id}`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }})
        .then((res) => {
            alert(res.data.data);
            
           fetchSong();
        })
    }   

    const handleUpdate = (song) => {
        setUpdateData(song);
        setUpdateOpen(true);
        
    }
    return(
        <>
             <SongForm usage="Add" title="Add Song"/>
             <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {songList.map((song) =>(
                        <div className="col-4 mt-2">
                            <Card key={song.songId}  className="h-100">
                                <Card.Body>
                                    <Card.Title>{song.songName}</Card.Title>
                                    
                                    <Card.Text>
                                    Release date: {song.releaseDate}
                                    </Card.Text>
                                    <Card.Text>
                                    Genre: {song.genre}
                                    </Card.Text>
                                   
                                    
                                      <div className="d-flex gap-2">
                                       <Button variant="warning" onClick={() => handleUpdate(song)}>Update</Button> 
                                        <Button variant="danger" onClick={() => handleDelete(song.songId)}>Delete</Button> 
                                      </div>                                     
                                </Card.Body>
                                </Card>  
                        </div>
                    ))}
                    <div className="d-flex justify-content-center mt-3">
                    <PagiComponent  page={page} totalPage={totalPage} onChange={setPage}  />
                    </div>
                </div>
            </div>
           {updateOpen && <SongForm usage="Update" title="Update Song" currentSong={updateData} fetchSong={fetchSong}/>}
            
        
        </>
    )
}