"use client"
import { Send } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;

const SendingPersonalMessage = ({ params }) => {
  const userDetails = useSelector(state => state.userDetails);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchUnreadCount = useCallback(async () => {
    if (userDetails?._id) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/messages/unread-message-count/${userDetails._id}`);
        const data = await response.json();
        setUnreadCount(data.totalUnread);
      } catch (error) {
        console.error('Error fetching unread message count:', error);
      }
    }
  }, [userDetails?._id]);

  const fetchPreviousMessages = useCallback(async () => {
    if (userDetails && params?.sellerId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/messages/direct/${userDetails._id}/${params.sellerId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    }
  }, [userDetails, params.sellerId]);

  const markMessagesAsRead = useCallback(async () => {
    if (userDetails && params?.sellerId) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/messages/mark-as-read/${userDetails._id}/${params.sellerId}`, {
          method: 'PUT'
        });
        fetchUnreadCount(); // This will work correctly now
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    }
  }, [userDetails, params?.sellerId, fetchUnreadCount]);

  useEffect(() => {
    fetchPreviousMessages();
    socket = io(`${process.env.NEXT_PUBLIC_API_KEY_SOCKET}`);

    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

      // If the chat is not focused, increase the unread message count
      if (!document.hasFocus()) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchPreviousMessages]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const handleFocus = () => {
      setUnreadCount(0);
      markMessagesAsRead();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [markMessagesAsRead]);

  useEffect(() => {
    if (userDetails?._id) {
      fetchUnreadCount();
    }
  }, [userDetails, fetchUnreadCount]);

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

  return (
    <div className="w-full h-full flex flex-col">
      {/* Message List */}
      <div className="h-[650px] p-4 overflow-y-auto mb-11">
        <ul className="space-y-2">
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
          <div ref={messageEndRef} />
        </ul>
      </div>

      {/* Input Form */}
      <div className="w-full p-2 mt-10 bg-white fixed bottom-0 left-0">
        <form className="flex w-full justify-between" onSubmit={sendMessage}>
          <input
            value={message}
            className="w-full p-2 outline-none border-none"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="bg-slate-600 p-2 h-8 text-white w-8 rounded-full flex items-center justify-center " type="submit">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendingPersonalMessage;
