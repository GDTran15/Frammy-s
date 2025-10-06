import { use, useState } from "react"
import InputComponent from "./InputComponent"
import axios from "axios";
import ArtistList from "./ArtistList";
import ArtistForm from "./ArtistForm";

export default function ArtistManagement(){
    
    return(
        <>
            <ArtistList/>
        </>
    )
}