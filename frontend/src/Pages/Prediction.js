import NavBar from "../Components/NavBar.js"
import PredictionNomineeList from "../Components/PredictionNomineeList.js"

export default function UserPredictionPage(){
    return (
        <>
        <NavBar children="" isNotLogin={false}/>
        <div className="container">
            <div className="row">
                <div className="col pt-5">
                    <h2 className="fw-bolder">Predict the Winners</h2>
                    <p className="text-body-tertiary">Make up to 10 predictions per day</p>
                </div>
            </div>
        </div>
         <PredictionNomineeList permission="user"/>
        </>
    )
}
