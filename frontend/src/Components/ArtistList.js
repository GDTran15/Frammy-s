import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button } from "react-bootstrap";
import ArtistForm from "./ArtistForm";

export default function ArtistList({title}){
    const [artistList,setArtistList] = useState([]);
    const [page,setPage] = useState("0");
    const [totalPage,setTotalPage] = useState(0)
    const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    const token = localStorage.getItem("token");

    const fetchData = () =>{
        axios.get(`http://localhost:8080/artists/page?page=${page}&size=9`,{
            headers:{
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
              setArtistList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
              console.log(res);
        })
    }

    useEffect(() => fetchData(),[page,token]) 

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
        fetchData();
    }
    return(
        <>
             <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {artistList.map((artist) =>(
                        <div className="col-4 mt-2">
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
                                        <Button variant="success" onClick={() => handleUpdate(artist)}>Update</Button> 
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
            {updateOpen && <ArtistForm usage="Update" title="Update Artist" currentArtist={updateData}/>}
        
        </>
    )
}