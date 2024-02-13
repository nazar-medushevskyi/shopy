import { useIsRegistered } from './useRegistrationStatus';
import { CONFIG_URL } from '../helper/config';
import { useEffect, useState } from 'react';

//@ts-ignore
import { useRouter } from 'next/navigation'

interface ShopData {
  name: string;
  subdomain_name: string;
}

export const useShopDetails = () => {
  const router = useRouter();
  const [shopDetails, setShopDetails] = useState<ShopData | null>(null);
  const [formData, setFormData] = useState<ShopData>({ name: '', subdomain_name: '' });
  const selectedShopId = useIsRegistered().selectedShopId;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchShopDetails = async () => {
      try {
        const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch shop details');
        }

        const shopData: ShopData = await response.json();
        setShopDetails(shopData);
        setFormData(shopData);

      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShopDetails();
  }, [selectedShopId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update shop details');
      }

      if (response.ok) {
        router.push('/admin/')        
      }

      const updatedShopData: ShopData = await response.json();
      setShopDetails(updatedShopData);

    } catch (error) {
      console.error('Error updating shop details:', error);
    }
  };

  return { shopDetails, formData, handleChange, handleSubmit };
};
