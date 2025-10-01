
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