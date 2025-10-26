import NavBar from "../Components/NavBar.js"
import CommunityLeaderboardList from "../Components/CommunityLeaderboardList.js"

export default function UserVotingPage(){
    return (
        <>
        <NavBar children="" isNotLogin={false}/>
        <div className="container">
            <div className="row">
                <div className="col pt-5">
                    <h2 className=" fw-bolder">Community Leaderboard</h2>
                    <p className="text-body-tertiary">See what is trending 🔥</p>
                </div>
            </div>
        </div>

         <CommunityLeaderboardList 
            title = "Community Leaderboard"
            limit = {25}
            defaultType = "ALL"
            showFilter = {true}
         />
        </>
    );
}