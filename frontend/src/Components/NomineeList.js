import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select"
import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button } from "react-bootstrap";
import NomineeForm from "./NomineeForm";
import "../CSS/voting.css";

export default function NomineeList({title,  permission}){
    const [nomineeList,setNomineeList] = useState([]);
    const [page,setPage] = useState("0");
    const [totalPage,setTotalPage] = useState(0)
    const [categories,setCategories] = useState(0)
    const [chosenCategory,setChosenCategories] = useState(null) 
    const token = localStorage.getItem("token");
    const [search,setSearch] = useState("")
    const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    console.log(search);
    
//___________________________________________________________________________

    const getColor = (n) => {
        if (n >= 2) return "#1dd648ff";
        if (n === 1) return "#ffc800ff";
        return "#fd0606ff" 
    };

    const [usage, setUsage] = useState({
        limit: 3,
        used: 0,
        remaining: 3,
        resetAt: null,
    });
    const [loadingUsage, setLoadingUsage] = useState(true);

    const fetchUsage = async () => {
        if (!token) { setLoadingUsage(false); return; }
        try {
            const res = await axios.get("http://localhost:8080/vote/usage", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setUsage(res.data.data);
        } catch (e) {
            console.error("Usage fetch failed", e);
        } finally {
            setLoadingUsage(false);
        }
    };

    useEffect(() => { fetchUsage(); }, [token]);

//___________________________________________________________________________
    const getNominee = () => {
        
        axios.get(`http://localhost:8080/nominee?page=${page}&size=9`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
           
              setNomineeList(res.data.data.content);
              setTotalPage(res.data.data.page.totalPages);
           
        })
    
    }


    console.log(updateData);
    useEffect(() =>{ getNominee();},[page,token]) 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this nominee?")
        if(!confirm) {
            return;
        }
        axios.delete(`http://localhost:8080/nominee/${id}`,{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        )
        .then((res) => {
            alert(res.data.data);
            getNominee();
           
        })
    }   

    const handleCategoryChange = (e) => {
            setChosenCategories(e)
            
    }
    const handleUpdate = (nominee) =>{
        const data = {
            nomineeId: nominee.nomineeId,
            
            type: nominee.nomineeType,
            categories:{
                value: nominee.categoryNominee,//this is id
                label: nominee.nomineeCategory//this is name
            },
            item:{
                value: nominee.artistId || nominee.songId || nominee.albumId, 
                label: nominee.artistName || nominee.songName || nominee.albumName 
                }
        }
        
        setUpdateData(data);
        setUpdateOpen(true);
        getNominee();
    }
   
   useEffect(() =>{
                axios.get("http://localhost:8080/categories",{
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


    const handleVote = async (nomineeId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to vote.");
            return;
        }
        try {
            await axios.post(
                "http://localhost:8080/vote",
                { nomineeId }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            alert("Vote successfully created!");
            await fetchUsage();                             // <-------------------
        } catch (err) {
            if (err.response?.status === 409) {
                alert (err.response?.data?.message || "Vote not allowed.");
            } else {
                alert("Vote failed.");
            }
            console.error("Vote error: ", err);
        }
    }

    const resetTimeStr = usage.resetAt
        ? new Date(usage.resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "";

    const votesColor = usage.remaining >= 2 ? "text-success" :
        usage.remaining === 1 ? "text-warning" : "text-danger";

    return(
        <>
<<<<<<< HEAD
            <NomineeForm title="Add Nominee" usage="Add"/>

             <div className="container">
=======
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        {!loadingUsage && typeof usage.remaining === "number" && (
                        <span
                            className="vote-pill"
                            style={{ backgroundColor: getColor(usage.remaining) }}
                            >
                            Votes left today: {usage.remaining}/{usage.limit}
                        </span>
                        )}
                    </div>
                </div>

>>>>>>> 1dec76b465e21cc94e634317a573508306689db8
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
                                   
                                    {permission === "user" ? 
                                    
                                        //<Button variant="primary" onClick={() => handleVote(nominee.nomineeId)}>Vote</Button> 
                                        <Button variant="primary" onClick={() => handleVote(nominee.nomineeId)} disabled={!token || usage.remaining === 0}>
                                            {usage.remaining === 0 ? "No votes left" : "Vote"}
                                        </Button>
                                    : 
                                      <div className="d-flex gap-2">
                                        <Button variant="warning" onClick={() => handleUpdate(nominee)}>Update</Button> 
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
            
            {
                updateOpen && (
                 
                            <NomineeForm currentNominee={updateData} title="Update Nominee" usage="Update"/>
                       
                )
            }
            
        
        </>
    )
}