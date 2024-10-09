'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useAuthSelected } from '@/store/AuthSelectedContext';
import { useRouter } from 'next/navigation';

const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
});

export const SocketProvider = ({ children }) => {
  const { currentState } = useAuthSelected();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const token =
    typeof window !== 'undefined' && window.localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    if (currentState === 'loggedIn') {
      console.log('Frontend Token:', token);
      // Retrieve the token from the cookie
      const socket = io('http://localhost:8000', {
        query: {
          token, // Pass the token as part of the socket handshake
        },
        withCredentials: true,
      });

      setSocket(socket);

      socket.on('online-users', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [currentState, token]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
