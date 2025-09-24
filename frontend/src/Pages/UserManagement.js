import "../CSS/usermanagement.css"
import NavBar from "../Components/NavBar";
import FormComponent from "../Components/FormComponent";
import InputComponent from "../Components/InputComponent";
import axios from "axios";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    return(
        <>
         <NavBar children={""} isNotLogin={false}/>
        
        </>
    );
}