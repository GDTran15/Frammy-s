import NavBar from "../Components/NavBar"
import "../CSS/button.css"
import "../CSS/admindashboard.css"
import { TabButton } from "../Components/ButtonComponent"
import { Button,Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import CommunityLeaderboardList from "../Components/CommunityLeaderboardList.js"

export default function AdminDashBoard(){
    return (
        <>
            <NavBar children={[
                  <TabButton activeCondition={'active'}>
                     DashBoard
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

      <div className="dashboard-cards"> 
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
              <Button as={Link} to={"/weekly-result-summary"} variant="primary">View Page</Button>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h2 className="h5 mb-0">Leaderboard Results</h2>
          </Card.Header>
            <Card.Body>
              <p>Summary of Leaderboard results.</p>
              <div>
                <section className="feature bg-body-tertiary text-dark py-5">
                  <div className="container">
                    <div className="row justify-content-center text-center mb-3">
                    </div>
                    <div className="row">
                      <div className="col">
                        <CommunityLeaderboardList
                          limit={5}
                          defaultType="ALL"
                          showFilter={false}   
                        />
                        <div className="d-flex gap-2 mt-3 justify-content-center">
                          <Link to="/user/leaderboard" className="btn btn-warning">
                            View Community Leaderboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Card.Body>
          </Card>

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
                <Button as={Link} to={"/user/prediction"} variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>

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
                <Button as={Link} to={"/statistics"} variant="primary">View Page</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      </>
    )
}