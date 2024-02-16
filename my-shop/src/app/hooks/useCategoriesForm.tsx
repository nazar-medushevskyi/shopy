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

  const { selectedIdCategory, handleTokenRefresh, axiosInstance } = useAppContext()
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [categoriesIdTake, setCategoriesTake] = useState(null)
  const updatedAccessToken = localStorage.getItem(`accessToken`);
  const API = `shop/${selectedShopId}/categories/`
  const API_DELETE = `shop/${selectedShopId}/categories`
  const API_GET = `shop/${selectedShopId}/categories/${selectedIdCategory}/`
  const API_PATCH = `shop/${selectedShopId}/categories/${selectedIdCategory}/`


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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
      const response = await axiosInstance.post(`${API}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });

      const responseData = response.data;
      console.log(responseData.id);
      router.push('/admin/categories');

    } catch (error) {
      console.log(`error: ${error}`)
    }
  };

  const fetchCetegories = async () => {
    try {
      const response = await axiosInstance.get(`${API}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });

        const responseData = response.data;
        setCategoriesTake(responseData.results[0].id);
        const simplifiedCategories = responseData.results.map((result: { name: any; id: any; }) => ({
          name: result.name,
          id: result.id,
        }));
        setCategories(simplifiedCategories);
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting category with ID:', id);
      await axiosInstance.delete(`${API_DELETE}/${id}`, {
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
      const response = await axiosInstance.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });

      const { name } = response.data;
      setCategoryData({ name });

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
      const response = await axiosInstance.patch(`${API_PATCH}`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenN}`,
        },
      });

      const { name } = response.data;
      setCategoryData({ name });
      await fetchCetegories();
      router.push('/admin/categories/');

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
