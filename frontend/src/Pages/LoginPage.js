import "../CSS/register.css"
import NavBar from "../Components/NavBar";
import FormComponent from "../Components/FormComponent";
import InputComponent from "../Components/InputComponent";
import axios from "axios";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = (e) => {
        
        e.preventDefault();
        
             axios.post("http://localhost:8080/login",{
            username: username,
            password : password
        }).then((res) =>{
            if(res.data.status === "success"){
                console.log("Register success" , res.data.data)
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userId", res.data.data.userId);
                const role = res.data.data.role;
                if(role === "ROLE_ADMIN"){
                    navigate("/admin/dashboard");
                } else{
                    navigate("/user/home");
                }
            } else  {
                setError(res.data.message);
            }
        }
        
    ).catch((error) =>{
            setError("Something when wrong");
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
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-warning w-100 mt-2">Login</button>
                    
            </form>
            <p className="mt-3 text-danger">{error === "" ? undefined : error}</p>
        </FormComponent>
        
        </>
    );
}