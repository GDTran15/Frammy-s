import { width } from "@fortawesome/free-brands-svg-icons/fa11ty";
import  "../CSS/loginregister.css"
import { useState } from "react";
import axios from "axios";
import InputComponent from "../Components/InputComponent";
import NavBar from "../Components/NavBar";
import FormComponent from "../Components/FormComponent";

export default function RegisterPage(){
  const [gmail,setGmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    if(gmail === "" || username === "" || password === ""){
      setError("Please input all field");
    } else {
    axios.post("http://localhost:8081/register",{
    username: username,
    gmail : gmail,
    password : password
    })
    .then((res) =>{
    const response = res.data;
    console.log(res);
    console.log(response)
     alert(response.data)
    setGmail("");
    setUsername("");
    setPassword("");
   
    }).catch((error) => {
      console.log(error);
     setError(error.response.data.message); 
    })
    
  }
  }

    return (
     <>
      <NavBar children={""} isNotLogin={true}/>
    <FormComponent 
       title="Create Your Account" 
       subTitle="Join Frammy voting community"
       optional="Already have an account? Sign in"
       >
         <form onSubmit={handleSubmit}>
              
            <InputComponent 
            labelText="Gmail address"
            changeHandle={(e) => setGmail(e.target.value)}
            inputType="email"
            value={gmail}
            placeholderValue="Enter your gmail"
            />
            <InputComponent 
            labelText="Username"
            changeHandle={(e) => setUsername(e.target.value)}
            inputType="text"
            value={username}
            placeholderValue="Enter your username"
            />
            <InputComponent 
            labelText="Password"
            changeHandle={(e) => setPassword(e.target.value)}
            inputType="password"
            value={password}
            placeholderValue="Enter your password"
            />
            <p className="text-danger">{error !== "" ?  `*${error}` : ""}</p>
            <button type="submit" className="btn btn-warning w-100 mt-2">Register</button>
                    </form>
        </FormComponent>    

     </>   
    )
}