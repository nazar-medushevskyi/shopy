'use client'

import { useState } from 'react';
import { useAppContext } from '../Core/Context';
import { CONFIG_URL } from '../helper/config';
import { useIsRegistered } from './useRegistrationStatus';
import { Categories } from '../typesCategory';
import { useRouter } from '../../../node_modules/next/navigation';
import axios from '../../../node_modules/axios/index';

//@ts-ignore
export const useCategoriesForm = () => {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    id: '',
  });

  const { selectedIdCategory, handleTokenRefresh } = useAppContext()
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [categoriesIdTake, setCategoriesTake] = useState(null)
  const updatedAccessToken = localStorage.getItem(`accessToken`);
  const refreshToken = localStorage.getItem('refreshToken')
  const API = `${CONFIG_URL}shop/${selectedShopId}/categories/`
  const API_DELETE = `${CONFIG_URL}shop/${selectedShopId}/categories`
  const API_GET = `${CONFIG_URL}shop/${selectedShopId}/categories/${selectedIdCategory}/`
  const API_PATCH = `${CONFIG_URL}shop/${selectedShopId}/categories/${selectedIdCategory}/`


  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  //@ts-ignore
  const handleChangeEdit = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCategoryData(prevCategoryData => ({
      ...prevCategoryData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
      const response = await fetch(`${API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.id);
        router.push('/admin/categories');
      } else if (response.status === 401) {
        const refreshSuccessful = await handleTokenRefresh();
        if (refreshSuccessful) {
          const newAccessToken = localStorage.getItem('accessToken');
          const newResponse = await fetch(`${API}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
            body: JSON.stringify(formData),
          });

          if (newResponse.ok) {
            const responseData = await response.json();
            console.log(responseData.id);
            router.push('/admin/categories');
          }
        } else {
          console.error('Failed to refresh token');
        }
      }

      else {
        console.log('not good query with post method');

        const errorData = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);
      }
    } catch (error) {

    }
  };

  const fetchCetegories = async () => {
    try {
      const response = await fetch(`${API}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
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
      } else if (response.status === 401) {
        const refreshSuccessful = await handleTokenRefresh();
        if (refreshSuccessful) {
          const newAccessToken = localStorage.getItem('accessToken');
          const newResponse = await fetch(`${API}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          if (newResponse.ok) {
            const newResponseData = await newResponse.json();
            setCategoriesTake(newResponseData.results[0].id);
            const simplifiedCategories = newResponseData.results.map((result: any) => ({
              name: result.name,
              id: result.id,
            }));
            setCategories(simplifiedCategories);
          } else {
            console.error('Failed to fetch Categories with new token');
          }
        }
      } else {
        console.error('Failed to fetch Categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting category with ID:', id);
      await axios.delete(`${API_DELETE}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });
      fetchCetegories();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const refreshSuccessful = await handleTokenRefresh();
        if (refreshSuccessful) {
          const newAccessToken = localStorage.getItem('accessToken');
          const newResponse = await axios.delete(`${API_DELETE}/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        }
      } else {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });

      if (response.status === 401) {
        const refreshSuccessful = await handleTokenRefresh();
        if (refreshSuccessful) {
          const newAccessToken = localStorage.getItem('accessToken');
          const newResponse = await axios.get(`${API_GET}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          if (newResponse.status === 200 || newResponse.status === 201) {
            const { name } = response.data;
            setCategoryData({ name });
            await fetchCetegories();
          }
        }
      } else {
        const { name } = response.data;
        setCategoryData({ name });
        await fetchCetegories();
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  };

  //@ts-ignore
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const accessTokenN = localStorage.getItem(`accessToken`);
    try {
      const response = await axios.patch(`${API_PATCH}`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenN}`,
        },
      });

      if (response.status === 401) {
        const refreshSuccessful = await handleTokenRefresh();
        if (refreshSuccessful) {
          const newAccessToken = localStorage.getItem('accessToken');
          const newResponse = await axios.patch(`${API_PATCH}`, categoryData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          if (newResponse.status === 200 || newResponse.status === 201) {
            const { name } = response.data;
            setCategoryData({ name });
            await fetchCetegories();
            router.push('/admin/categories/');
          }
        }
      } else {
        const { name } = response.data;
        setCategoryData({ name });
        await fetchCetegories();
        router.push('/admin/categories/');
      }
    } catch (error) {
      console.error('Error submitting edited category:', error);
      return null;
    }
  };


  return {
    formData,
    errors,
    errorMessages,
    categories,
    categoriesIdTake,
    categoryData,

    fetchCetegories,
    handleDelete,
    handleGet,
    handleChange,
    handleSubmit,
    handleChangeEdit,
    handleSubmitEdit,
  };
};
