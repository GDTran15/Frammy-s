import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button,Modal } from "react-bootstrap";
import AlbumForm from "./AlbumForm";

export default function AlbumList({title}){
    const [albumList,setAlbumList] = useState([]);
    const [page,setPage] = useState(0);
    const [totalPage,setTotalPage] = useState(0)
    const token = localStorage.getItem("token");
    const [updateOpen, setUpdateOpen] = useState(false);
    const [updateData,setUpdateData] = useState(false);
    const [search,setSearch] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const fetchAlbum = 
        () =>{
        axios.get(`http://localhost:8080/albums/page?page=${page}&size=9&search=${search}`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
              setAlbumList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
              console.log(res);
        })
    }
    

    useEffect(() => fetchAlbum(),[page,token,search ]) 
    
    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this album?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8080/albums/${id}`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }}
        )
        .then((res) => {
            alert(res.data.data);
            
            setAlbumList(prev => prev.filter(album => album.albumId !== id))
        })
    }   
    const handleUpdate = (album) =>{
        setUpdateData(album);
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
                    <Modal.Title>Add Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlbumForm  usage="Add" fetchAlbum={fetchAlbum}/>
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
                    <Modal.Title>Update Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlbumForm currentAlbum={updateData} fetchAlbum={fetchAlbum} usage="Update"/>
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
                            <input className="form-control me-2 border-secondary-subtle" value={search} placeholder="Search for album" type="search" onChange={(e) => setSearch(e.target.value) }/>
                        </form>
                    </div>
                    <div className="col-4">
                        <Button variant="warning" className="w-100" onClick={() => setShowAdd(true)}>Add Album</Button>
                    </div>
                </div>
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {albumList.map((album) =>(
                        <div className="col-md-4 mt-2">
                            <Card key={album.albumId}  className="h-100">
                                <Card.Body>
                                    <Card.Title>{album.albumName}</Card.Title>
                                    
                                    <Card.Text>
                                    Release date: {album.releaseDate}
                                    </Card.Text>
                                    <Card.Text>
                                    Genre: {album.genre}
                                    </Card.Text>
                                   
                                    
                                      <div className="d-flex gap-2">
                                        <Button variant="warning" onClick={() => handleUpdate(album)}>Update</Button> 
                                        <Button variant="danger" onClick={() => handleDelete(album.albumId)}>Delete</Button> 
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