import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select"
import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button } from "react-bootstrap";

export default function NomineeList({title,  permission}){
    const [nomineeList,setNomineeList] = useState([]);
    const [page,setPage] = useState("0");
    const [totalPage,setTotalPage] = useState(0)
    const [categories,setCategories] = useState(0)
    const [chosenCategory,setChosenCategories] = useState(null) 
    const token = localStorage.getItem("token");
    const [search,setSearch] = useState("")
    console.log(search);
    
   

    useEffect(() =>{
        axios.get(`http://localhost:8081/nominee?page=${page}&size=9`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
           
              setNomineeList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
           
        })
    },[page,token]) 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this nominee?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8081/nominee/${id}`
        )
        .then((res) => {
            alert(res.data.data);
            
            setNomineeList(prev => prev.filter(nominee =>  nominee.nomineeId !== id))
        })
    }   

    const handleCategoryChange = (e) => {
            setChosenCategories(e)
            
    }
   
   useEffect(() =>{
                axios.get("http://localhost:8081/categories",{
                    headers:{
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) =>{
                const data = res.data.data.map(item => ({
                value: item.categoryId,
                label: item.categoryName
                }));
                setCategories(data);
            })
            },[])
   
    useEffect(() => {
        if (categories && categories.length > 0 && chosenCategory === null) {
            setChosenCategories(categories[0]);
            
        }
        }, [categories, chosenCategory]);
    return(
        <>


             <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <div className="col-4">
                        <Select options={categories} value={chosenCategory} onChange={handleCategoryChange} defaultValue={chosenCategory}/>  
                    </div>
                    <div className="col-4">
                        <form className="d-flex">
                            <input className="form-control me-2 border-secondary-subtle" value={search} placeholder="Search" type="search" onChange={(e) => setSearch(e.target.value) }/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>

                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    
                    {nomineeList.filter((nominee => chosenCategory !== null && nominee.nomineeCategory === chosenCategory.label
                        && (search === "" || nominee.artistName?.toLowerCase().includes(search.toLowerCase()) ||
                                nominee.songName?.toLowerCase().includes(search.toLowerCase()) ||
                                nominee.albumName?.toLowerCase().includes(search.toLowerCase()))

                    )).map((nominee) =>(
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