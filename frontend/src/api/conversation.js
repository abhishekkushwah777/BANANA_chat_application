import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api";

export async function getConversation(userId) {
  const token = getToken();

  const response = await fetch(`${API_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create conversation");
  }

  return ({
    conversation: data.conversation,
    messages: data.messages,
  });
}