import { useIsRegistered } from './useRegistrationStatus';
import { CONFIG_URL } from '../helper/config';
import { useEffect, useState } from 'react';

interface ProductData {
  name: string;
  description: string;
  price: string;
  id: string;
  categories?: boolean
}

export const useEditProductsForm = () => {
  const selectedShopId = useIsRegistered().selectedShopId;
  const [productDetails, setProductDetails] = useState<ProductData | null>(null);
  const [formData, setFormData] = useState<ProductData>(
    {
      name: '',
      description: '',
      price: '',
      id: '',
      categories?: '',
    });

    const API = `${CONFIG_URL}shop/${selectedShopId}/products`


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchProductDetails = async (id: number) => {
      try {
        const response = await fetch(`${API}/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const ProductData: ProductData = await response.json();
        setProductDetails(ProductData);
        setFormData(ProductData);

      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

      //@ts-ignore
    fetchProductDetails();
  }, [selectedShopId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProductsEdit = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${API}/${id}`, {
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

      const updatedShopData: ProductData = await response.json();
      setProductDetails(updatedShopData);

    } catch (error) {
      console.error('Error updating shop details:', error);
    }
  };

  return { productDetails, formData, handleChange, handleSubmitProductsEdit };
};
