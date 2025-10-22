import NavBar from "../Components/NavBar"
import "../CSS/button.css"
import "../CSS/admindashboard.css"
import { TabButton } from "../Components/ButtonComponent"
import { Button,Card } from "react-bootstrap"

export default function AdminDashBoard(){
    return (
        <>
            <NavBar children={[
                  <TabButton activeCondition={'active'}>
                     DashBoard
                  </TabButton>,
                  <TabButton>
                     Voting
                  </TabButton>,
                  <TabButton redirectLink={"/admin/nominee-management"}>
                     Nominee
                  </TabButton>,
                  <TabButton>
                     Community
                  </TabButton>,
                  <TabButton redirectLink={"/admin/user-management"}>
                     User
                  </TabButton>,
                  <TabButton redirectLink={"/admin/logs"}>
                     Logs
                  </TabButton>,
            ]}/>

             <div className="container my-4">
      <h1 className="mb-3">Results Dashboard</h1>
      <p>Welcome to the Dashboard! Here you can manage users, nominees, and view logs.</p>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <Card>
            <Card.Header>
              <h2 className="h5 mb-0">Weekly Results</h2>
            </Card.Header>
            <Card.Body>
              <p>Summary of weekly results.</p>
              <div>
                <p>Display results from component here</p>
              </div>
              <div className="d-flex gap-2">
                <Button href="/weekly-result-summary" variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card>
            <Card.Header>
              <h2 className="h5 mb-0">Leaderboard Results</h2>
            </Card.Header>
            <Card.Body>
              <p>Summary of Leaderboard results.</p>
              <div>
                <p>Display results from component here</p>
              </div>
              <div className="d-flex gap-2">
                <Button href="/user/leaderboard" variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card>
            <Card.Header>
              <h2 className="h5 mb-0">Prediction Results</h2>
            </Card.Header>
            <Card.Body>
              <p>Summary of Prediction results.</p>
              <div>
                <p>Display results from component here</p>
              </div>
              <div className="d-flex gap-2">
                <Button href="/user/prediction" variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 col-lg-3">
          <Card>
            <Card.Header>
              <h2 className="h5 mb-0">Statistics Results</h2>
            </Card.Header>
            <Card.Body>
              <p>Summary of Statistics results.</p>
              <div>
                <p>Display results from component here</p>
              </div>
              <div className="d-flex gap-2">
                <Button href="/statistics" variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
        </>
    )
}