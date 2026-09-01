const API_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const users = await response.json();

  if (!response.ok) {
    throw new Error(users.message || "Failed to fetch users");
  }

  return users;
};