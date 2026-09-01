import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api";

export async function getMessages(conversationId) {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/messages/${conversationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const messages = await response.json();

  if (!response.ok) {
    throw new Error(messages.message || "Failed to fetch messages");
  }

  return messages;
}