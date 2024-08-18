'use client';
import { createContext, useReducer, useContext } from 'react';

const Context = createContext({
  currentState: '',
  token: '',
  profilePic: '',
  selectedChat: null,
  handleCurrentChat: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentState: 'loggedIn',
        token: action.payload.token,
        profilePic: action.payload.profilePic,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentState: 'loggedOut',
        token: '',
        profilePic: '',
      };
    case 'CURRENT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      };
    default:
      return state;
  }
}

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    currentState: 'loggedOut',
    selectedChat: null,
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

  const ctxValue = {
    currentState: state.currentState,
    selectedChat: state.selectedChat,
    profilePic: state.profilePic,
    token: state.token, // Fixed this line
    handleCurrentChat,
    handleLogin,
    handleLogout,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}

export const useAuthSelected = () => useContext(Context);
