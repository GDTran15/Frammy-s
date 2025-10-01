import axios from "axios";
import InputComponent from "./InputComponent";
import { useState } from "react";
import Select from "react-select";
import { data } from "react-router-dom";
import SongList from "./SongList";
import SongForm from "./SongForm";


export default function SongManagement(){
  
    return(
        
        <>
            <SongForm usage="Add" title="Add Song"/>
            <SongList/>
        </>
    )

}