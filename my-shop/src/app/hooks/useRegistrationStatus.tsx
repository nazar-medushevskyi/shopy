import { useState, useEffect } from 'react';
import { CONFIG_URL } from '../helper/config';

interface AuthResponse {
  is_registered: boolean;
}

export const useIsRegistered = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const accessToken = localStorage.getItem(`accessToken`);

  useEffect(() => {
    const fetchIsRegistered = async () => {
      try {
        const response = await fetch(`${CONFIG_URL}auth/me/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (response.ok) {
          const responseData: AuthResponse = await response.json();
          //@ts-ignore
          setSelectedShopId(responseData.shops[0].id)
        } else {
          const errorData = await response.json();
          setError(`Failed to fetch is_registered: ${errorData.message}`);
        }
      } catch (error) {
        setError(`Error during is_registered fetch`);
      }
    };

    fetchIsRegistered();
  }, []);

  return {
    error,
    selectedShopId,
  };
};
