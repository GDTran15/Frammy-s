import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button,Modal } from "react-bootstrap";
import ArtistForm from "./ArtistForm";

export default function ArtistList({title}){
    const [artistList,setArtistList] = useState([]);
    const [page,setPage] = useState(0);
    const [totalPage,setTotalPage] = useState(0)
    const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    const token = localStorage.getItem("token");
    const [search,setSearch] = useState("");
    const [showAdd, setShowAdd] = useState(false);

    const fetchData = () =>{
        axios.get(`http://localhost:8080/artists/page?page=${page}&size=9&search=${search}`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
              setArtistList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
             
        })
    }

    useEffect(() => fetchData(),[page,token,search]) 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this artist?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8080/artists/${id}`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }}
        )
        .then((res) => {
            alert(res.data.data);
            fetchData();
        })
    }   

    const handleUpdate = (artist) =>{
        setUpdateData(artist);
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
                    <Modal.Title>Add Artist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ArtistForm usage="Add"  fetchArtist={fetchData} />
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
                    <Modal.Title>Update Artist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ArtistForm
                        usage="Update"
                        currentArtist={updateData}
                        fetchArtist={fetchData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setUpdateOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
             <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3 ">
                    <div className="col-4">
                        <form className="d-flex">
                            <input className="form-control me-2 border-secondary-subtle" value={search} placeholder="Search for artist" type="search" onChange={(e) => setSearch(e.target.value) }/>
                        </form>
                    </div>
                    <div className="col-4 ">
                        <Button className="w-100" variant="warning" onClick={() => setShowAdd(true)}>Add Artist</Button>
                    </div>
                </div>
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {artistList.map((artist) =>(
                        <div className="col-md-4 mt-2">
                            <Card key={artist.artistId}  className="h-100">
                                <Card.Body>
                                    <Card.Title>{artist.artistName}</Card.Title>
                                    
                                    <Card.Text>
                                    {artist.artistInfo}
                                    </Card.Text>
                                    <Card.Text>
                                    {artist.awards}
                                    </Card.Text>
                                   
                                    
                                      <div className="d-flex gap-2">
                                        <Button variant="warning" onClick={() => handleUpdate(artist)}>Update</Button> 
                                        <Button variant="danger" onClick={() => handleDelete(artist.artistId)}>Delete</Button> 
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