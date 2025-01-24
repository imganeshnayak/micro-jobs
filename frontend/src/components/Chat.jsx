import React, { useState, useEffect, useRef } from "react";

const Chat = ({ chatRoomId, senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/chat/${chatRoomId}/messages`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/chat/${chatRoomId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId,
            receiverId,
            message: newMessage.trim(),
          }),
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDownloadChat = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString()}] ${
            msg.senderId === senderId ? "You" : "Partner"
          }: ${msg.message}`
      )
      .join("\n");
    const blob = new Blob([chatContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chat-history-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
            }}
          >
            ⬅️
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#d1e7ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "#004085",
              }}
            >
              U
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "16px", color: "#333333" }}>
                User Name
              </h2>
              <p style={{ margin: 0, fontSize: "12px", color: "#888888" }}>
                Online
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDownloadChat}
          style={{
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download Chat
        </button>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: "center", color: "#888888" }}>
            Loading...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888888" }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.senderId === senderId ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor:
                    msg.senderId === senderId ? "#007bff" : "#f1f1f1",
                  color: msg.senderId === senderId ? "#ffffff" : "#333333",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <span
                  style={{
                    fontSize: "10px",
                    color: msg.senderId === senderId ? "#d1e7ff" : "#888888",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        style={{
          display: "flex",
          padding: "16px",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #cccccc",
            marginRight: "8px",
          }}
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          style={{
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
