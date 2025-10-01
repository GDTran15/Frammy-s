import "../CSS/usermanagement.css"
import NavBar from "../Components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserManagement(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:8080/user/getUsers", {headers: { Authorization: `Bearer ${token}` }})
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

        axios.post(`http://localhost:8080/user/deleteUser`, {userId: userId}, {headers: { Authorization: `Bearer ${token}` }})
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

            axios.post("http://localhost:8080/user/editUser", {
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
            <NavBar children={""} isNotLogin={false}/>

            <div className="user-management-container">
                <h1>User Management</h1>

                {loading && <p>Loading users...</p>}
                {error && <p className="error">{error}</p>}

                <div className="user-cards-wrapper">
                    {users.map((user) => (
                        <div key={user.userId} className="user-card">
                            <div className="user-info">
                                <div className="user-detail">
                                    <p><strong>User ID: </strong></p>   
                                    <p>{user.userId}</p>
                                </div>
                                <div className="user-detail">
                                    <p><strong>Username: </strong></p>
                                    <p>{user.username}</p>
                                </div>
                                <div className="user-detail">
                                    <p><strong>Gmail: </strong></p>
                                    <p>{user.gmail}</p>
                                </div>
                                <div className="user-detail">
                                    <p><strong>Role: </strong></p>
                                    <p>{user.role}</p>
                                </div>
                            </div>

                            <div className="card-buttons">
                                <button className="edit-button" onClick={() => {
                                    setEditingUser(user);
                                    setEditData({ username: user.username, gmail: user.gmail, password: "" });
                                }}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(user.userId)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {editingUser && (
                    <div className="modal-overlay">
                        <div className="edit-modal">
                            <h2>Edit User</h2>
                            
                            <div className="edit-form">
                                <label>
                                    Username:
                                    <input type="text" value={editData.username} onChange={(e) => setEditData({ ...editData, username: e.target.value })} />
                                </label>
                                <label>
                                    Gmail:
                                    <input type="email" value={editData.gmail} onChange={(e) => setEditData({ ...editData, gmail: e.target.value })} />
                                </label>
                                <label>
                                    Password:
                                    <input type="password" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
                                </label>
                            </div>

                            <div className="modal-buttons">
                                <button onClick={handleEditUser}>Save</button>
                                <button onClick={() => setEditingUser(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}