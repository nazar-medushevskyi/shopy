import { useState, useEffect } from 'react';
import { CONFIG_URL } from '../helper/config';

interface AuthResponse {
  is_registered: boolean;
}

export const useIsRegistered = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIsRegistered = async () => {
      try {
        const accessToken = localStorage.getItem(`accessToken`);
        const response = await fetch(`${CONFIG_URL}auth/me/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (response.ok) {
          const responseData: AuthResponse = await response.json();
          setIsRegistered(responseData.is_registered);
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
    isRegistered,
    error,
  };
};
