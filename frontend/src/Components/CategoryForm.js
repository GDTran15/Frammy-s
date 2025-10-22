import { useEffect, useState } from "react"
import InputComponent from "./InputComponent"
import axios from "axios";
import { data, Form } from "react-router-dom";

export default function CategoryForm({title,usage,currentCategory,fetchCategory}){
    const [categoryName,setCategoryName] = useState("") 
    const token = localStorage.getItem("token")
    const [error,setError] = useState("");
    const [validationError,setValiationError] = useState({});

    useEffect(() => {
        setCategoryName(currentCategory?.categoryName)
    },[currentCategory])

    console.log(currentCategory?.categoryId)
    const handleSubmit = (e) =>{
        e.preventDefault();
        const method = usage === "Add" ? axios.post : axios.put;
        const url = usage === "Add" ? "http://localhost:8080/categories" : `http://localhost:8080/categories/${currentCategory.categoryId}`;
        const data = {
            categoryName: categoryName
        }
        method(url,data,{
            headers:{
            "Authorization": `Bearer ${token}`
        }})
        .then((res) => {
            console.log(res)
            alert(res.data.data);
            fetchCategory();
        }).catch((error) => {
            if(error.response.data.message){
            setError(error.response.data.message);
            }  else  {
            setValiationError(error.response.data)
            }
        })
    }
    return (
        <>
                
                 <section>
                            <div className="container">
                            <div className="row mt-2 rounded-2">
                                    <div className="col bg-white py-3 px-4">
                            <h2>{title}</h2>
                            <form onSubmit={handleSubmit}>
                                           <InputComponent 
                                           labelText="Category Name"
                                            changeHandle={(e) => setCategoryName(e.target.value)}
                                           inputType="text"
                                           inputValue={categoryName}
                                           placeholderValue="Enter category name"
                                           />
                                           
                                           <button type="submit" className="btn btn-warning w-100 mt-2">{usage}</button>
                                         <p className="text-danger mt-2">{error !== "" ? `*${error}`: "" }</p>
                
                              </form>
                              </div>
                              </div> 
                            </div>
                </section>  
        </>
    )
}