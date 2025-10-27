import "../CSS/usermanagement.css"
import NavBar from "../Components/NavBar";
import { TabButton } from "../Components/ButtonComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Modal,Card,Form } from "react-bootstrap";

export default function UserManagement(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getUsers`, {headers: { Authorization: `Bearer ${token}` }})
            .then((response) => {
                if (response.data.status === "success") {
                    setUsers(response.data.data);
                }
                else {
                    setError("Failed to fetch users");
                }
            })
            .catch((error) => {
                console.error("Full error:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                    setError("Server error: " + error.response.status);
                } 
                else if (error.request) {
                    console.error("No response received:", error.request);
                    setError("No response from server.");
                } 
                else {
                    console.error("Error setting up request:", error.message);
                    setError("Request error: " + error.message);
                }
            })
            .finally(() => {    
                setLoading(false)
            });
    };

    const token = localStorage.getItem("token");

    const handleDelete = (userId) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) {
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/user/deleteUser`, {userId: userId}, {headers: { Authorization: `Bearer ${token}` }})
            .then((response) => {
                if (response.data.status === "success") {
                    setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
                } 
                else {
                    alert("Failed to delete user: " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            if (error.response) {
                console.error("Server responded with status", error.response.status);
                console.error(error.response.data);
                alert("Server error: " + error.response.data.message || error.response.status);
            } 
            else if (error.request) {
                console.error("No response received:", error.request);
                alert("No response from server.");
            } 
            else {
                alert("Error setting up request: " + error.message);
            }
            });
        };

        const [editingUser, setEditingUser] = useState(null);
        const [editData, setEditData] = useState({ username: "", gmail: "", password: "" });
        
        const handleEditUser = () => {
            if (!editingUser) {
                return;
            }

            axios.post(`${process.env.REACT_APP_API_URL}/user/editUser`, {
                userId: editingUser.userId, 
                username: editData.username,
                gmail: editData.gmail,
                password: editData.password
            }, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                if (response.data.status === "success") {
                    alert("User updated successfully");
                    setUsers(prevUsers => prevUsers.map(user => user.userId === editingUser.userId ? { ...user, ...editData } : user));
                    setEditingUser(null);
                    fetchUsers();
                }
                else {
                    alert("Failed to update user: " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                alert("Error updating user: " + error.message);
            });
        };

    return(
        <>
            <NavBar children={[
                <TabButton redirectLink={"/admin/dashboard"}>
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
                <TabButton activeCondition={'active'}>
                    User
                </TabButton>,
                <TabButton redirectLink={"/admin/logs"}>
                    Logs
                </TabButton>,
            ]}/>


            <div className="container my-4">
      <h1 className="mb-4">User Management</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {users.map((user) => (
          <div key={user.userId} className="col-md-6 col-lg-4">
            <Card>
              <Card.Body>
                <div className="mb-2">
                  <strong>User ID: </strong> {user.userId}
                </div>
                <div className="mb-2">
                  <strong>Username: </strong> {user.username}
                </div>
                <div className="mb-2">
                  <strong>Gmail: </strong> {user.gmail}
                </div>
                <div className="mb-2">
                  <strong>Role: </strong> {user.role}
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => {
                      setEditingUser(user);
                      setEditData({
                        username: user.username,
                        gmail: user.gmail,
                        password: "",
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(user.userId)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

     
      <Modal show={!!editingUser} onHide={() => setEditingUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gmail</Form.Label>
              <Form.Control
                type="email"
                value={editData.gmail}
                onChange={(e) => setEditData({ ...editData, gmail: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingUser(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
        </>
    );
}