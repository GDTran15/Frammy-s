import axios from "axios";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button } from "react-bootstrap";

export default function NomineeList({title, children, permission}){
    const [nomineeList,setNomineeList] = useState([]);
    const [page,setPage] = useState("0");
    const [totalPage,setTotalPage] = useState(0)
    const token = localStorage.getItem("token");

    useEffect(() =>{
        axios.get(`http://localhost:8080/nominee?page=${page}&size=9`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
              setNomineeList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
              console.log(res);
        })
    },[page,token]) 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this nominee?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8080/nominee/${id}`
        )
        .then((res) => {
            alert(res.data.data);
            
            setNomineeList(prev => prev.filter(nominee => nominee.nomineeId !== id))
        })
    }   
    return(
        <>
             <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    {nomineeList.map((nominee) =>(
                        <div className="col-4 mt-2">
                            <Card key={nominee.nomineeId}  className="h-100">
                                <Card.Body>
                                    <Card.Title>{nominee.artistName || nominee.songName || nominee.albumName}</Card.Title>
                                    <Card.Subtitle>{nominee.songReleaseDate || nominee.albumReleaseDate ? `Release date: ${nominee.songReleaseDate || nominee.albumReleaseDate}` 
                                    : ""}</Card.Subtitle>
                                    <Card.Text>
                                    {nominee.artistInfo}
                                    </Card.Text>
                                   
                                    {permission === "user" ? <Button variant="primary">Vote</Button> : 
                                      <div className="d-flex gap-2">
                                        <Button variant="danger" onClick={() => handleDelete(nominee.nomineeId)}>Delete</Button> 
                                      </div> }
                                    
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