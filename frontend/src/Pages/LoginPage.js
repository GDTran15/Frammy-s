import "../CSS/register.css"
import NavBar from "../Components/NavBar";
import FormComponent from "../Components/FormComponent";
import InputComponent from "../Components/InputComponent";
import axios from "axios";
import { useState } from "react";

export default function LoginPage(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post({
            username: username,
            password : password
        }).then((res) =>{
            
        }
        
    )
    }

    return(
        <>
         <NavBar/>

        <FormComponent
        title="Welcome Back"
        subTitle="Login into your account"
        optional="Don't have account? Register"
        >
            <form >
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
            </form>
        </FormComponent>
        
        </>
    );
}