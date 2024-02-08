'use client'

import { useState } from 'react';
import { CONFIG_URL } from '../helper/config';
import { useIsRegistered } from './useRegistrationStatus';
import { Products } from '../typesProduct';

export const useProductsForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [productIdTake, setProductIdTake] = useState(null)
  const [addedProductIds, setAddedProductIds] = useState<number[]>([]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
      const accessToken = localStorage.getItem(`accessToken`);
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.id);

        setAddedProductIds([...addedProductIds, responseData.id]);

        await console.log(addedProductIds);
      } else {
        console.log('not good query with post method');

        const errorData = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);
      }
    } catch (error) {

    }
  };

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem(`accessToken`);
    try {
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/products/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setProductIdTake(responseData.results[0].id)
        const simplifiedProducts = responseData.results.map((result: any) => ({
          name: result.name,
          description: result.description,
          price: result.price,

        }));
        setProducts(simplifiedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  const handleDelete = async (productId: number) => {
    try {
      const initialProductIds = [...addedProductIds];
      const updatedProductIds = addedProductIds.filter(id => id !== productId);
      const deletedProductId = initialProductIds.find(id => !updatedProductIds.includes(id));


      const accessToken = localStorage.getItem(`accessToken`);
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/products/${deletedProductId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        setAddedProductIds(updatedProductIds);

      } else {
        console.log('Error deleting product');
        const errorData = await response.json();
        console.error('Server error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return {
    formData,
    errors,
    errorMessages,
    handleChange,
    handleSubmit,
    handleDelete,
    products,
    productIdTake,
    fetchProducts,
    addedProductIds,

  };
};
