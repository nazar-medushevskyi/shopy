import React, { createContext, useState, useContext, useEffect } from 'react';
import { CONFIG_URL } from '../helper/config';
//@ts-ignore
import axios from 'axios';

interface AppContextType {
  selectedIdProduct: string | null;
  setSelectedIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
  selectedIdCategory: string | null;
  setSelectedIdCategory: React.Dispatch<React.SetStateAction<string | null>>;
  handleTokenRefresh: () => Promise<string>;

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

  const handleTokenRefresh = async () => {
    const refreshEndpoint = `${CONFIG_URL}auth/token/refresh/`;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
  
      if (!refreshToken) {
        console.error('Рефреш токен не найден');
        return false;
      }
  
      const response = await axios.post(refreshEndpoint, {
        refresh: refreshToken,
      });
  
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access);
        return true;
      }
    } catch (error) {
      console.error('Ошибка во время обновления токена:', error);
      return false; 
    }
  };
  

  const contextValue = {
    selectedIdProduct,
    setSelectedIdProduct,
    selectedIdCategory,
    setSelectedIdCategory,
    handleTokenRefresh
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
