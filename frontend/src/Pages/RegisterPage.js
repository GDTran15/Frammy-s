import { width } from "@fortawesome/free-brands-svg-icons/fa11ty";
import  "../CSS/register.css"
import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){
  const [gmail,setGmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();
   axios.post("http://localhost:8080/register",{
    username: username,
    gmail : gmail,
    password : password
  })
  .then((res) =>{
    const response = res.data;
    console.log(response)
    if(response.status === "success"){
      alert(response.data);
    }
    else{
      alert(response.message);
    }
    setGmail("");
    setUsername("");
    setPassword("");
  })
 }

    return (
     <>
      <nav className="navbar bg-black fixed-top">
        <div className="container small">
          <a className="navbar-brand text-light d-flex align-items-center gap-2">
            {/* SVG Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}><path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
            <h5 className="mb-0">GrammyVote</h5>
          </a>
          <div>
            <a href="/login" className="btn btn-outline-warning me-2 btn-sm">Login</a>
            <a href="/register" className="btn btn-warning btn-sm">Register</a>
          </div>
        </div>
      </nav>
    <div className="container-md register">
        <div className="row">
            <div className="col-6 mx-auto">
                 <div className="card rounded-4" >
                  <div className="d-flex justify-content-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={50} height={50} > <path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
                  </div>
            <div className="card-body">
                <h5 className="card-title text-center">Create Your Account</h5>
                <h6 className="card-subtitle mb-2 text-center text-body-tertiary mb-4" >Join Frammy voting community</h6>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label  className="form-label">Gmail address</label>
                <input onChange={(e) => setGmail(e.target.value)}
                 type="email" className="form-control bg-body-tertiary" value={gmail} placeholder="Enter your gmail"/>
                </div>
            <div className="mb-3">
                <label  className="form-label">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} 
                type="text" className="form-control bg-body-tertiary" value={username} placeholder="Enter your username" />
                </div>
            <div className="mb-3">
                <label  className="form-label" >Password</label>
                <input onChange={(e) => setPassword(e.target.value)}
                 type="password" className="form-control bg-body-tertiary" value={password} placeholder="Enter your password" />
            </div>

            <button type="submit" className="btn btn-warning w-100 mt-2">Register</button>
                    </form>
            <div className="text-center my-4">
              <a href="" className="link-signin">Already have an account? Sign in</a>
            </div>
  </div>
</div>    
            </div>
        </div>
    
</div>
    
     </>   
    )
}