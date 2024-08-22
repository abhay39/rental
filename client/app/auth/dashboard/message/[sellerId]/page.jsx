"use client"
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;

const SendingPersonalMessage = ({ params }) => {
  const userDetails = useSelector(state => state.userDetails);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (userDetails && params?.sellerId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/messages/direct/${userDetails._id}/${params.sellerId}`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error("Error fetching previous messages:", error);
        }
      }
    };

    fetchPreviousMessages();

    socket = io(`${process.env.NEXT_PUBLIC_API_KEY_SOCKET}`);

    socket.on('connect', () => {
      // console.log('connected to server');
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

      // If the chat is not focused, increase the unread message count
      if (!document.hasFocus()) {
        setUnreadCount((prevCount) => prevCount + 1);
        // showBrowserNotification(msg.content); // Show browser notification
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userDetails, params.sellerId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit('chat message', {
        content: message,
        sender: userDetails?._id,
        recipient: params?.sellerId,
      });
      setMessage('');
    } else {
      console.error('Socket is not initialized');
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Reset unread count when the chat is focused
    const handleFocus = () => {
      setUnreadCount(0);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className=' w-full'>
      {/* <h1>{unreadCount}</h1> */}
      <ul className="space-y-2 h-[640px] p-4 overflow-auto scroll-smooth">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`flex ${msg.sender === userDetails._id ? "justify-end" : "justify-start"
              }`}
          >
            <span
              className={`${msg.sender === userDetails._id
                  ? "bg-slate-600 text-right text-white"
                  : "bg-slate-600 text-left text-white"
                } p-2 rounded-md max-w-xs`}
            >
              {msg.content}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative z-50">
        <div className="absolute inset-x-0 bottom-1 flex items-center p-2 bg-white">
          <form className="flex w-full bottom-1  justify-between" onSubmit={sendMessage}>
            <input
              value={message}
              className="w-full p-2 outline-none border-none"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="bg-slate-200 p-2 rounded-sm" type="submit">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SendingPersonalMessage;
