import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dummyMessages from '../data/dummy.json'; // Adjust the path to your JSON file

function MessagePage() {
    const { jobId } = useParams();
    const [messages, setMessages] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);

    useEffect(() => {
        // Load message history from dummy data (you can replace this with an API call later)
        const jobMessages = dummyMessages.messages.filter(message => message.receiverId === jobId || message.senderId === jobId);
        setMessageHistory(jobMessages);

        // Simulating fetching job data
        const job = {
            id: jobId,
            title: `Job Title ${jobId}`,
            userId: jobId, // Simulated job user
        };
        setCurrentJob(job);
    }, [jobId]);

    const sendMessage = () => {
        const newMessage = {
            senderId: 'hirer_id', // Replace with actual hirer ID
            receiverId: currentJob.userId, // Replace with job seeker ID
            message: messages,
            timestamp: new Date().toLocaleString(),
        };

        // Update message history in memory
        const updatedHistory = [...messageHistory, newMessage];
        setMessageHistory(updatedHistory);

        // Optionally, store it in localStorage or in the backend
        // localStorage.setItem(`messages_${jobId}`, JSON.stringify(updatedHistory));

        setMessages(''); // Clear input
    };

    const renderMessages = () => {
        if (messageHistory.length === 0) return <div>No messages yet.</div>;

        return (
            <div className="message-list">
                {messageHistory.map((msg, index) => (
                    <div key={index} className="message-item">
                        <p><strong>{msg.senderId === 'hirer_id' ? 'You' : 'Job Seeker'}:</strong> {msg.message}</p>
                        <small>{msg.timestamp}</small>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container py-5">
            <h1>Messages for {currentJob?.title}</h1>
            {renderMessages()}

            <div className="message-input">
                <textarea 
                    className="form-control" 
                    rows="4" 
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage} className="btn btn-primary mt-3">
                    Send Message
                </button>
            </div>
        </div>
    );
}

export default MessagePage;
