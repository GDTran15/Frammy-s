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

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.gmail}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}