import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button,Modal } from "react-bootstrap";
import SongForm from "./SongForm";

export default function SongList({title}){
    const [songList,setSongList] = useState([]);
    const [page,setPage] = useState(0);
    const [showAdd,setShowAdd] = useState(false)
    const [totalPage,setTotalPage] = useState(0);
     const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token");


    const fetchSong = () => {
        axios.get(`http://localhost:8080/songs/page?page=${page}&size=9&search=${search}`,{
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
    useEffect(() => fetchSong(),[page,token,search]); 

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
              
            <Modal
                show={showAdd}
                onHide={() => setShowAdd(false)}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SongForm usage="Add"  fetchSong={fetchSong} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdd(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

           
            <Modal
                show={updateOpen}
                onHide={() => setUpdateOpen(false)}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SongForm
                        usage="Add"
                        currentSong={updateData}
                        fetchSong={fetchSong}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setUpdateOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
             <div className="container">
                 <div className="row bg-white mt-3 rounded-3 py-3">
                    <div className="col-4">
                        <form className="d-flex">
                            <input className="form-control me-2 border-secondary-subtle" value={search} placeholder="Search for song" type="search" onChange={(e) => setSearch(e.target.value) }/>
                        </form>
                    </div>
                      <div className="col-4">
                        <Button
                            className="w-100"
                            variant="warning"
                            onClick={() => setShowAdd(true)}
                        >
                            Add Song
                        </Button>
                    </div>
                </div>
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {songList.map((song) =>(
                        <div className="col-md-4 mt-2">
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
            
        
        </>
    )
}