
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import "../CSS/home.css"
import  "../Images/purple.jpg"

 export default function Home(){
    return (
       /*  <div >
            <Header />
            <h2 >homepage content</h2>

            <Link to = "/weekly-result-summary"> 
                <button>Go to weekly result summary</button>
            </Link>

            <Link to = "/UserManagement"> 
                <button>Go to User Management Page</button>
            </Link>

            <Link to = "/ArtistManagement"> 
                <button>Go to Artist Management Page</button>
            </Link>


            <Link to = "/PopularityMetrics">
                <button>Popularity Metrics Page</button>
            </Link> 

        </div> */
        <div>
      {/* Navbar */}
      <nav className="navbar bg-black fixed-top">
        <div className="container small">
          <a className="navbar-brand text-light d-flex align-items-center gap-2">
            {/* SVG Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}><path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
            <h5 className="mb-0">GrammyVote</h5>
          </a>
          <div>
            <a href="#" className="btn btn-outline-warning me-2 btn-sm">Login</a>
            <a href="#" className="btn btn-warning btn-sm">Register</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="main-header" >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col">
              {/* SVG Logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={70} height={70}><path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
              <p className="title text-warning">FrammyVote 2025</p>
              <p className="text-white fs-5 px-5">
                Be part of music history. Vote for your favorite artists, predict winners, and compete with the community in the ultimate Grammy experience.
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                <a href="#" className="btn btn-warning">Start Voting</a>
                <a href="#" className="btn btn-outline-warning">View Prediction</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Platform Features */}
      <section className="feature bg-body-tertiary">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col">
              <h5 className="fs-3">Platform Features</h5>
              <p className="fs-5 text-secondary">Everything you need for the ultimate Grammy voting experience</p>
            </div>
          </div>
          {/* Feature Cards Row */}
          <div className="row mt-5">
            {/* <FeatureCard />
            <FeatureCard />
            <FeatureCard /> */}
          </div>
        </div>
      </section>
    </div>
    
    )
 }