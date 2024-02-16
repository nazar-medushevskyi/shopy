import { useState, useEffect } from 'react';
import { useAppContext } from '../Core/Context';

export const useIsRegistered = () => {
  const { axiosInstance } = useAppContext()
  const [error, setError] = useState<string | null>(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const accessToken = localStorage.getItem(`accessToken`);
  const ApiAuth = 'auth/me/';

  useEffect(() => {
    const fetchIsRegistered = async () => {
      try {
        const response = await axiosInstance.get(`${ApiAuth}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
    
        //@ts-ignore
        setSelectedShopId(response.data.shops[0].id);
    
      } catch (error) {
        setError(`Error during is_registered fetch: ${error}`);
      }
    };
    
    fetchIsRegistered();
  }, []);

  return {
    error,
    selectedShopId,
  };
};
