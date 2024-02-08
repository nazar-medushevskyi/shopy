import React, { createContext, useState, useContext, useEffect } from 'react';

interface AppContextType {
  selectedIdProduct: string | null;
  setSelectedIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
  selectedIdCategory: string | null;
  setSelectedIdCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'selectedIdCategory'; // Ключ для сохранения в LocalStorage

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

  const contextValue = {
    selectedIdProduct,
    setSelectedIdProduct,
    selectedIdCategory,
    setSelectedIdCategory,
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
