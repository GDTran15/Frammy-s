import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select"
import { Card } from "react-bootstrap";
import PagiComponent from "./PagiComponenet";
import  { Button,Modal } from "react-bootstrap";
import NomineeForm from "./NomineeForm";
import "../CSS/voting.css";

export default function NomineeList({title,  permission}){
    const [nomineeList,setNomineeList] = useState([]);
    const [page,setPage] = useState(0);
    const [totalPage,setTotalPage] = useState(0)
    const [categories,setCategories] = useState(0)
    const [chosenCategory,setChosenCategories] = useState(null) 
    const token = localStorage.getItem("token");
    const [search,setSearch] = useState("")
    const [updateOpen, setUpdateOpen] = useState(false); 
    const [updateData, setUpdateData] = useState(null);
    const [showAdd,setShowAdd] = useState(false)
 
    
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
        if (!token || permission !== "user") { //edit here
            setLoadingUsage(false);     
            return; 
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/vote/usage`, {
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
        
        axios.get(`${process.env.REACT_APP_API_URL}/nominee/category/${chosenCategory.value}?page=${page}&size=9&search=${search}`,{
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
    useEffect(() =>{
        if(chosenCategory){ 
        getNominee();
        }
    },[page,token,chosenCategory,search]) 

    const handleDelete = (id) =>{
        const confirm = window.confirm("Do you want to delete this nominee?")
        if(!confirm) {
            return;
        }
        axios.delete(`${process.env.REACT_APP_API_URL}/nominee/${id}`,{
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
            console.log("e:" + e)
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
                axios.get(`${process.env.REACT_APP_API_URL}/categories`,{
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
                `${process.env.REACT_APP_API_URL}/vote`,
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
                

            <Modal show={showAdd} onHide={() => setShowAdd(false)} animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                <Modal.Title>Add Nominee</Modal.Title>
                </Modal.Header>
                <Modal.Body><NomineeForm  usage="Add" fetchNominee={getNominee}/>  </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAdd(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

           
           


            <div className="container">
                {permission === "user" && (
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
                )}
                <div className="row bg-white mt-3 rounded-3 py-3">

                

                    <div className="col-4">
                        <Select options={categories} value={chosenCategory} onChange={handleCategoryChange} defaultValue={chosenCategory}/>  
                    </div>
                    <div className="col-4">
                        <form className="d-flex">
                            <input className="form-control  border-secondary-subtle" value={search} placeholder="Search for the nominee" type="search" onChange={(e) => setSearch(e.target.value) }/>
                        </form>
                    
                    </div>
                    <div className="col-4">{permission === "user" ? "" : <Button  className=" w-100" variant="warning" onClick={() => setShowAdd(true)}>
                            Add nominee
                        </Button>}</div>
                    
                </div>

                <div className="row bg-white mt-3 rounded-3 py-3">
                    <h3 className="mb-3">{title}</h3>
                    
                    {nomineeList.map((nominee) =>(
                        <div className="col-md-4 mt-2">
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
            
            
           
             <Modal show={updateOpen} onHide={() => setUpdateOpen(false)} animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                <Modal.Title>Update Nominee</Modal.Title>
                </Modal.Header>
                <Modal.Body><NomineeForm currentNominee={updateData}  usage="Update"/> </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setUpdateOpen(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            
        
       </div>
</>
    )
}  
    
