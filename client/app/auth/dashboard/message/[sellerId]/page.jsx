"use client"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;

const SendingPersonalMessage = ({ params }) => {
  const [isOnline, setIsOnline] = useState(false);

  const userDetails = useSelector(state => state.userDetails);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish connection with the server
    socket = io('http://localhost:5000/');

    socket.on('connect', () => {
      socket.emit('user connected', userId); // Notify server that this user is online

      console.log('connected to server');
    });

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('user status', ({ userId: id, status }) => {
      if (id === userId) {
        setIsOnline(status === 'online');
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    // Emit the message to the server
    socket.emit('chat message', {
      content: message,
      sender: userDetails?._id, // Replace 'user_id' with the actual user ObjectId
      recipient: userDetails?._id, // Replace 'recipient_id' with the actual recipient ObjectId
      chatRoom: 'abhay', // Optional: Replace with the actual chat room name or ID
    });
    // Clear the input field
    setMessage('');
  };

  return (
    <div>
          <p>{userId} is {isOnline ? 'Online' : 'Offline'}</p>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}</strong>: {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendingPersonalMessage;
