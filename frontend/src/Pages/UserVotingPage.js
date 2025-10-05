import NavBar from "../Components/NavBar.js"
import NomineeList from "../Components/NomineeList.js"
export default function UserVotingPage(){
    return (
        <>
        <NavBar children="" isNotLogin={false}/>
        <div className="container">
            <div className="row">
                <div className="col pt-5">
                    <h2 className=" fw-bolder">Vote for Yours Favorites</h2>
                    <p className="text-body-tertiary">Cast up to 3 votes per day</p>
                </div>
            </div>
        </div>
         <NomineeList permission="user"/>
        </>
       
    )
}