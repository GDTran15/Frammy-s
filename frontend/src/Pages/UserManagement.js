import "../CSS/usermanagement.css"
import NavBar from "../Components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserManagement(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8081/user/getUsers")
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
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    setError("No response from server.");
                } else {
                    console.error("Error setting up request:", error.message);
                    setError("Request error: " + error.message);
                }
            })
            .finally(() => {    
                setLoading(false)
            });
    }, []);

    return(
        <>
            <NavBar children={""} isNotLogin={false}/>

            <div className="user-management-container">
                <h1>User Management</h1>

                {loading && <p>Loading users...</p>}
                {error && <p className="error">{error}</p>}

                <div className="user-cards-wrapper">
                    {users.map((user) => (
                        <div key={user.id} className="user-card">
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
                                <button className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}