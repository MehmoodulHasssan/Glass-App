'use client';
// import { profile } from 'console';
import { createContext, useReducer, useContext } from 'react';

const Context = createContext({
  // token: '',
  currentState: '',
  selectedChat: null,
  openChatContainer: false,
  handleCurrentChat: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  handleOpenChatContainer: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentState: 'loggedIn',
        // token: action.payload,
        // profilePic: action.payload.pr,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentState: 'loggedOut',
      };
    case 'CURRENT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      };
    case 'OPEN_CHAT_CONTAINER':
      return {
        ...state,
        openChatContainer: action.payload,
      };
    default:
      return state;
  }
}

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    currentState: 'loggedOut',
    selectedChat: null,
    openChatContainer: false,
  });

  const handleCurrentChat = (chat) => {
    dispatch({ type: 'CURRENT_CHAT', payload: chat });
  };

  const handleLogin = (token) => {
    dispatch({ type: 'LOGIN', payload: token });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleOpenChatContainer = (state) => {
    dispatch({ type: 'OPEN_CHAT_CONTAINER', payload: state });
  };

  const ctxValue = {
    token: state.token,
    currentState: state.currentState,
    selectedChat: state.selectedChat,
    openChatContainer: state.openChatContainer,
    handleCurrentChat,
    handleLogin,
    handleLogout,
    handleOpenChatContainer,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}

export const useAuthSelected = () => useContext(Context);
