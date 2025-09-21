
import Header from "../Components/Header"
import { Link } from "react-router-dom"

export default function ArtistManagement(){
    return (
        <div>
            <Header />
            <h2>Welcome to Artist Management</h2>
            <form className="p-3">
  <div className="mb-3">
    <label className="form-label">Artist Name</label>
    <input type="text" className="form-control" placeholder="Enter name" />
  </div>
  <div className="mb-3">
    <label className="form-label">Artist description</label>
    <input type="text" className="form-control" placeholder="Enter artist inforamtion" />
  </div>
  
  <button type="submit" className="btn btn-primary">Add Artist</button>
</form>
             <Link to = "/home">
                <button>Go to back to home</button>
            </Link>
        </div>
    )
 }