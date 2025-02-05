


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


const Chat = ({ chatRoomId, senderId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [chatName, setChatName] = useState(receiverName || 'Chat');
  const [isRenaming, setIsRenaming] = useState(false);
  const messagesEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch initial messages from the database
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/chat/${chatRoomId}/messages`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId]);

  // Join the chat room and listen for new messages
  useEffect(() => {
    if (chatRoomId) {
      // Join the chat room
      socket.emit('joinRoom', chatRoomId);

      // Listen for new messages
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [chatRoomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const messageData = {
        chatRoomId,
        senderId,
        receiverId,
        message: newMessage.trim(),
      };

      // Emit the message to the server
      socket.emit('sendMessage', messageData);

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle downloading chat history
  const handleDownloadChat = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString()}] ${
            msg.senderId === senderId ? 'You' : 'Partner'
          }: ${msg.message}`
      )
      .join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f4f4f9',
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/chatlist')} // Navigate to ChatList
            className="back-button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
            }}
          >
            ⬅️
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {!isRenaming ? (
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  color: '#333333',
                  cursor: 'pointer',
                }}
                onClick={() => setIsRenaming(true)}
              >
                {chatName}
              </h2>
            ) : (
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                onBlur={() => setIsRenaming(false)} // Stop renaming on blur
                style={{
                  padding: '4px',
                  fontSize: '14px',
                  border: '1px solid #cccccc',
                  borderRadius: '4px',
                }}
              />
            )}
          </div>
        </div>
        <button
          onClick={handleDownloadChat}
          style={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Download Chat
        </button>
      </div>

      {/* Note for User (Dismissible) */}
      {showWarning && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            padding: '12px',
            margin: '16px',
            borderRadius: '8px',
            border: '1px solid #ffeeba',
            textAlign: 'center',
            fontSize: '14px',
            color: '#856404',
            position: 'relative', // For positioning the close button
          }}
        >
          <button
            onClick={() => setShowWarning(false)} // Hide the warning on click
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#856404',
            }}
          >
            ×
          </button>
          <strong>Note:</strong> Please avoid sharing sensitive information such
          as passwords, bank details, or personal identification with strangers.
        </div>
      )}

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#888888' }}>
            Loading...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888888' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent:
                  msg.senderId === senderId ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  backgroundColor:
                    msg.senderId === senderId ? '#007bff' : '#f1f1f1',
                  color: msg.senderId === senderId ? '#ffffff' : '#333333',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <span
                  style={{
                    fontSize: '10px',
                    color: msg.senderId === senderId ? '#d1e7ff' : '#888888',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
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
          display: 'flex',
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '20px',
            border: '1px solid #cccccc',
            marginRight: '8px',
          }}
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          style={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>

      <style>
        {`
          .back-button {
            display: block;
          }

          @media (min-width: 768px) {
            .back-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Chat;

