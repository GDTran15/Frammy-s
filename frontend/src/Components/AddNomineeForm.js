import axios from "axios";
import { use, useEffect, useState } from "react"
import Select from "react-select"
import NomineeList from "./NomineeList";

export default function AddNomineeForm(){
    const [categories,setCategories] = useState([]);
    const [itemList,setItemList] = useState([]);
    const [isSelect,setIsSelect] = useState(false);
    const [type,setType] = useState("");
    const token = localStorage.getItem("token");
    const [choseLabel, setChoseLabel] = useState("");
    const [item,setItem] = useState(undefined);
    const [choseCategory,setChoseCategories] = useState(undefined);
    const [error,setError] = useState("");

    const handleTypeChose = (e) => {
        const selected = e.target.value;
        setType(selected);
        setItemList(undefined);
        setIsSelect(true);

        let url = "";
        switch(selected){
           case "ARTIST":
        url = "http://localhost:8080/artists";
        setChoseLabel("Choose artist:");
        break;
      case "ALBUM":
        url = "http://localhost:8080/albums";
        setChoseLabel("Choose album:");

        break;
      case "SONG":
        url = "http://localhost:8080/songs";
        setChoseLabel("Choose song:");

        break;
        default:
        url = "";
        
        
    }
     
    if(url){     
    axios.get(url,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) =>{ 
        const data = res.data.data.map(item => ({
          value: item.artistId || item.songId || item.albumId, 
         label: item.artistName || item.songName || item.albumName 
        }));
        setItemList(data);
    
    })
 }
 
}   
        
   
    const handleItemChange = (e) => {
        setItem(e);
         console.log(e.value);
    }
    const handleCategoryChange = (e) => {
        setChoseCategories(e);
         console.log(e.value);
    }
    const fetchCategory = () =>{
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
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setError("");
        if(item === undefined){
            setError("Please fill in all field")
        } else {
            let data = {
                categoryId : choseCategory.value,
                nomineeType: type
            }
             if (type === "ARTIST")
                { 
                    data.artistId = item.value
                }else if (type === "ALBUM") {
           data.albumId = item.value;
                }else if (type === "SONG") data.songId = item.value;
            axios.post("http://localhost:8080/nominee",data,{
            headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => {
        alert(res.data.data);
    }).catch((error) => {
    
        setError(error.response.data.message)
    })

        }
    }
    return(
        <>
         <section>
            <div className="container">
            <div className="row mt-2 rounded-2">
                    <div className="col bg-white py-3 px-4">
                        <h2>Add Nominee</h2>
                        <form onSubmit={handleSubmit}>
           
                        <div className="mb-2">
                            <label className="me-2">Choose nominee category:</label>
                            <Select options={categories} value={choseCategory} onChange={handleCategoryChange} defaultValue={choseCategory} onMenuOpen={fetchCategory} />
                            </div>
                        
                            <div>
                            <label className="me-2">Choose nominee type:</label>
                        <select className="form-select border border-secondary-subtle" value={type} aria-label="Default select example" onChange={handleTypeChose}>
                                <option selected>Open this select type</option>
                                <option value="ARTIST">Artist</option>
                                <option value="ALBUM">Album</option>
                                <option value="SONG">Song</option>
                            </select>
                            </div>
                        
                            {isSelect ? <div> <label className="mt-2 ">{choseLabel}</label> 
                            <Select options={itemList} value={item} onChange={handleItemChange}/> 
                            <button type="submit" className="btn btn-warning w-100 mt-3">Add Nomineee</button> </div>
                            : ""}
                            
                            {error !== "" ? <p className="mt-2 text-danger">*{error}</p>: ""}
                            
                            

                        </form>
                    </div>
                </div>
                </div>
           </section>

            <NomineeList categoryList={categories}/>
        
                               
                              
            
        </>
    )
}