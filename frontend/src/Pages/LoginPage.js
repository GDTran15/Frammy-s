import "../CSS/loginregister.css"
import NavBar from "../Components/NavBar";
import FormComponent from "../Components/FormComponent";
import InputComponent from "../Components/InputComponent";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [validationError,setValiationError] = useState({});

    const handleSubmit = (e) => {
        setError("")
        setValiationError({})
        e.preventDefault();
        
             axios.post("http://localhost:8080/login",{
            username: username,
            password : password
        }).then((res) =>{
            
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userId", res.data.data.userId);
                const role = res.data.data.role;
                if(role === "ROLE_ADMIN"){
                    navigate("/admin/dashboard");
                } else{
                    navigate("/user/voting");
                }
       
            }).catch((error) =>{
        console.log(error)
        if(error.response.data.message){
            setError(error.response.data.message);
        } else  {
            setValiationError(error.response.data)
        }
        }
    )
    }

    return(
        <>
         <NavBar children={""} isNotLogin={true}/>

        <FormComponent
        title="Welcome Back"
        subTitle="Login into your account"
        optional="Don't have account? Register"
        link="/register"
        >
            <form onSubmit={handleSubmit}>
                <InputComponent 
                labelText="Username"
                changeHandle={(e) => setUsername(e.target.value)}
                inputType="text"
                inputValue={username}
                placeholderValue="Enter your username"
                validationError={validationError.username}
                />
                <InputComponent 
                labelText="Password"
                changeHandle={(e) => setPassword(e.target.value)}
                inputType="password"
                inputValue={password}
                placeholderValue="Enter your password"
                 validationError={validationError.password}
                />
                <button type="submit" className="btn btn-warning w-100 mt-2">Login</button>
                    
            </form>
            <p className="mt-3 text-danger">{error === "" ? undefined : "*"+error}</p>
        </FormComponent>
        
        </>
    );
}