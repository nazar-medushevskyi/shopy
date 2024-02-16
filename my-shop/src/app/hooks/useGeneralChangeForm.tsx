import { useIsRegistered } from './useRegistrationStatus';
import { useAppContext } from '../Core/Context';
import { useEffect, useState } from 'react';

//@ts-ignore
import { useRouter } from 'next/navigation'

interface ShopData {
  name: string;
  subdomain_name: string;
}

export const useShopDetails = () => {
  const { axiosInstance } = useAppContext()
  const router = useRouter();
  const [shopDetails, setShopDetails] = useState<ShopData | null>(null);
  const [formData, setFormData] = useState<ShopData>({ name: '', subdomain_name: '' });
  const selectedShopId = useIsRegistered().selectedShopId;
  const ApiShop = `shop/${selectedShopId}/`;
  const accessToken = localStorage.getItem('accessToken');


  useEffect(() => {

    const fetchShopDetails = async () => {
      try {
        const response = await axiosInstance.get(`${ApiShop}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });

        const shopData: ShopData = response.data;
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

    try {
      const response = await axiosInstance.patch(`${ApiShop}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      router.push('/admin/')
      const updatedShopData: ShopData = response.data;
      setShopDetails(updatedShopData);

    } catch (error) {
      console.error('Error updating shop details:', error);
    }
  };

  return {
    shopDetails,
    formData,

    handleChange,
    handleSubmit
  };
};
