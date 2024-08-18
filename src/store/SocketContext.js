'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { getToken } from '@/utils/getToken';
import { useAuthSelected } from '@/store/AuthSelectedContext';

const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
});

export const SocketProvider = ({ children }) => {
  const { currentState, token } = useAuthSelected();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (currentState === 'loggedIn') {
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
  }, [currentState]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
