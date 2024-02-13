import React, { createContext, useState, useContext, useEffect } from 'react';
import { CONFIG_URL } from '../helper/config';

interface AppContextType {
  selectedIdProduct: string | null;
  setSelectedIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
  selectedIdCategory: string | null;
  setSelectedIdCategory: React.Dispatch<React.SetStateAction<string | null>>;
  refreshAccessToken: () => Promise<string>;

}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'selectedIdCategory';

//@ts-ignore
const AppProvider: React.FC = ({ children }) => {
  const [selectedIdProduct, setSelectedIdProduct] = useState<string | null>(null);
  const [selectedIdCategory, setSelectedIdCategory] = useState<string | null>(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedValue !== null ? storedValue : null;
  });

  useEffect(() => {
    if (selectedIdCategory !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedIdCategory);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [selectedIdCategory]);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await fetch(`${CONFIG_URL}auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const responseData = await response.json();
      const newToken = responseData.access;
      if (newToken !== undefined) {
        localStorage.setItem('accessToken', newToken);
      }

      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  const contextValue = {
    selectedIdProduct,
    setSelectedIdProduct,
    selectedIdCategory,
    setSelectedIdCategory,
    refreshAccessToken
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
