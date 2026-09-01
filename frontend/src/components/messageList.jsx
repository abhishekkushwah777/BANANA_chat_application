import "../styles/messageList.css";
import { useAppContext } from "../appContexts";

function MessageList() {
  const { messages } = useAppContext();
  const me = localStorage.getItem("user");

  if (!messages) {
    return (
      <p>No messages to display.</p>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => {
        const isMine =
          String(message.senderId?._id || message.senderId) ===
          String(me.id);

        return (
          <div
            key={message._id}
            className={
              isMine
                ? "message my-msg"
                : "message other-msg"
            }
          >
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;