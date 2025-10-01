
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import "../CSS/home.css"
import  "../Images/purple.jpg"

 export default function HomePage(){
    
    return (
        <div>
      {/* Navbar */}
      <nav className="navbar bg-black fixed-top">
        <div className="container small ">
          <a className="navbar-brand text-light d-flex align-items-center gap-2">
            {/* SVG Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}><path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
            <h5 className="mb-0">Frammy's</h5>
          </a>
          <div>
            <a href="/login" className="btn btn-outline-warning me-2 btn-sm">Login</a>
            <a href="/register" className="btn btn-warning btn-sm">Register</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="homepage-header">
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
                <a href="/login" className="btn btn-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="me-1" viewBox="0 0 640 640"><path d="M584 352C597.3 352 608 362.7 608 376L608 480C608 515.3 579.3 544 544 544L96 544C60.7 544 32 515.3 32 480L32 376C32 362.7 42.7 352 56 352C69.3 352 80 362.7 80 376L80 480C80 488.8 87.2 496 96 496L544 496C552.8 496 560 488.8 560 480L560 376C560 362.7 570.7 352 584 352zM448 96C483.3 96 512 124.7 512 160L512 384C512 419.3 483.3 448 448 448L192 448C156.7 448 128 419.3 128 384L128 160C128 124.7 156.7 96 192 96L448 96zM192 144C183.2 144 176 151.2 176 160L176 384C176 392.8 183.2 400 192 400L448 400C456.8 400 464 392.8 464 384L464 160C464 151.2 456.8 144 448 144L192 144zM356.7 207.9C364.5 197.2 379.5 194.8 390.2 202.6C400.9 210.4 403.3 225.4 395.5 236.1L319.4 340.8C315.2 346.5 308.7 350.1 301.6 350.6C294.5 351.1 287.6 348.4 282.7 343.3L246.8 306.1C237.6 296.6 237.9 281.4 247.4 272.2C256.9 263 272.1 263.2 281.3 272.8L297.4 289.4L356.7 207.8z"/></svg>
                    Start Voting</a>
                <a href="/login" className="btn btn-outline-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="me-1" height="16px" viewBox="0 0 640 640"><path fill="#FFD43B" d="M416 224C398.3 224 384 209.7 384 192C384 174.3 398.3 160 416 160L576 160C593.7 160 608 174.3 608 192L608 352C608 369.7 593.7 384 576 384C558.3 384 544 369.7 544 352L544 269.3L374.6 438.7C362.1 451.2 341.8 451.2 329.3 438.7L224 333.3L86.6 470.6C74.1 483.1 53.8 483.1 41.3 470.6C28.8 458.1 28.8 437.8 41.3 425.3L201.3 265.3C213.8 252.8 234.1 252.8 246.6 265.3L352 370.7L498.7 224L416 224z"/></svg>
                    View Prediction</a>
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

            {/* Public Logs Preview */}
      <section className="feature bg-dark text-light py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-3">
            <div className="col">
              <h5 className="fs-3 text-warning">Latest Community Activity</h5>
              <p className="fs-6 text-secondary">See what the Frammy community is voting on right now</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* Use  PublicLogFeed component here */}
              {/* Limit to 5 items for preview */}
              {/* <PublicLogFeed endpoint="http://localhost:9000/public/logs" limit={5} /> */}

              {/* Link to full page */}
              <a href="/activity" className="btn btn-outline-warning mt-3">
                View Full Activity Feed
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    )
 }