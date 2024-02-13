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

  const { selectedIdCategory } = useAppContext()
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [categoriesIdTake, setCategoriesTake] = useState(null)
  const updatedAccessToken = localStorage.getItem(`accessToken`);

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
      console.error('Error deleting category:', error);
    }
  }

  const handleGet = async () => {
    try {
      const response = await axios.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });
      const { name } = response.data;
      setCategoryData({ name });
      await fetchCetegories();
    } catch {
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
      const { name } = response.data;
      setCategoryData({ name });
      await fetchCetegories();
      router.push('/admin/categories/');
    } catch {
      return null;
    }
  }

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
