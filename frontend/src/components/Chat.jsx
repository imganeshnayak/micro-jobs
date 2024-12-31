import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const userId = JSON.parse(localStorage.getItem('user'))?._id;


  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${chatId}`);
        setChat(response.data);
      } catch (error) {
        console.error('Error fetching chat:', error);
        toast.error('Unable to load chat history.');
      }
    };

    fetchChat();
  }, [chatId]);

  const handleSendMessage = async () => {
    try {
      if (!chatId) {
        console.error("Chat ID is undefined");
        return;
      }
  
      const response = await axios.post(`http://localhost:5000/chat/${chatId}/message`, {
        sender: userId,  // Ensure userId is correctly set
        content: message,
      });
  
      console.log('Message sent successfully', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <div>
      <ToastContainer />
      <h2>Chat with {chat && chat.users.find((user) => user._id !== userId).name}</h2>
      <div>
        {chat && chat.messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender.name}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
