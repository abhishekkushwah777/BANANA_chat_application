import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import "../styles/userList.css";
import { useAppContext } from "../appContexts";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setSelectedUser } = useAppContext();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data.users || data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserClick(user) {

    try {
      setError("");
      setSelectedUser(user);
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>

      {error && <p className="error">{error}</p>}

      {users.length === 0 ? (
        <p>No other users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="user-item"
            onClick={() => handleUserClick(user)}
          >
            <div>
              <strong>{user.username}</strong>
            </div>
            <span>{user.status === "online" ? "Online" : "Offline"}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;