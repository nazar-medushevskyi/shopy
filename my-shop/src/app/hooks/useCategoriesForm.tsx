'use client'

import { useEffect, useState } from 'react';
import { useAppContext } from '../Core/Context';
import { Categories } from '../typesCategory';
import { useRouter } from '../../../node_modules/next/navigation';

//@ts-ignore
export const useCategoriesForm = () => {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    id: '',
  });

  const selectedShopId = localStorage.getItem(`storeId`)
  const { selectedIdCategory, axiosInstance } = useAppContext()
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoriesIdTake, setCategoriesTake] = useState(null);
  const [categoriesDetails, setCategoriesDetails] = useState(null)
  const [categoriesDetailsEdit, setCategoriesDetailsEdit] = useState(null)

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

  useEffect(() => {
    console.log('blablabla');
    fetchCetegories();
  }, []);

  const fetchCetegories = async () => {
    console.log('check')
    try {
      const response = await axiosInstance.get(`${API}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${updatedAccessToken}`,
        },
      });

      const responseData = response.data;
      setCategoriesDetails(responseData);
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

    } catch (error) {
      console.log(error);
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

      const responseEditDetails = response.data;
      setCategoriesDetailsEdit(responseEditDetails)

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
    categoriesDetails,
    categoriesDetailsEdit,

    fetchCetegories,
    handleDelete,
    handleGet,
    handleChange,
    handleSubmit,
    handleChangeEdit,
    handleSubmitEdit,
  };
};
