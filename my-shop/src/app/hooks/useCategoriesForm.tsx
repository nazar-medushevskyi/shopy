'use client'

import { useState } from 'react';
import { CONFIG_URL } from '../helper/config';
import { useIsRegistered } from './useRegistrationStatus';
import { Categories } from '../typesCategory';
import { useRouter } from '../../../node_modules/next/navigation';

export const useCategoriesForm = () => {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    id: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [categoriesIdTake, setCategoriesTake] = useState(null)

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
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/categories/`, {
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
        router.push('/admin/categories');
      } else {
        console.log('not good query with post method');

        const errorData = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);
      }
    } catch (error) {

    }
  };

  const fetchCetegories = async () => {
    const accessToken = localStorage.getItem(`accessToken`);
    try {
      const response = await fetch(`${CONFIG_URL}shop/${selectedShopId}/categories/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setCategoriesTake(responseData.results[0].id)
        const simplifiedCategories = responseData.results.map((result: any) => ({
          name: result.name,
          id: result.id,
        }));
        setCategories(simplifiedCategories);
      } else {
        console.error('Failed to fetch Categories');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return {
    formData,
    errors,
    errorMessages,
    handleChange,
    handleSubmit,
    categories,
    categoriesIdTake,
    fetchCetegories,
  };
};
