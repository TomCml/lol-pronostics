import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  username: string | null;
  userId: number | null;
  setUser: (username: string, id: number) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(() => 
    localStorage.getItem('username')
  );
  const [userId, setUserId] = useState<number | null>(() => {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  });

  const setUser = (username: string, id: number) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id.toString());
    setUsername(username);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUsername(null);
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ username, userId, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
