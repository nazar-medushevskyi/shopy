'use client'

import { SetStateAction, useEffect, useState } from 'react';
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

  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  const selectedShopId = localStorage.getItem(`storeId`)

  // const [selectedShopId, setSelectedShopId] = useState<string | null>(localStorage.getItem('storeId'));


  // useEffect(() => {
  //   const storedShopId = localStorage.getItem('storeId');
  //   setSelectedShopId(storedShopId);
  // }, []);


  const accessToken = localStorage.getItem(`accessToken`);
  const [errors, setErrors] = useState({});
  const [categoriesDetails, setCategoriesDetails] = useState(null)
  const [categoriesDetailsEdit, setCategoriesDetailsEdit] = useState(null)

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [quantity, setQuantity] = useState()
  const { selectedIdCategory, axiosInstance } = useAppContext()
  const [categoriesIdTake, setCategoriesTake] = useState(null);

  const API = `shop/${selectedShopId}/categories/`
  const API_DELETE = `shop/${selectedShopId}/categories`
  const API_GET = `shop/${selectedShopId}/categories/${selectedIdCategory}/`
  const API_PATCH = `shop/${selectedShopId}/categories/${selectedIdCategory}/`

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [countCategories] = useState(7);
  const lastCategoriesIndex = currentPage * countCategories
  const firstProductsIndex = lastCategoriesIndex - countCategories
  const currentCategory = categories.slice(firstProductsIndex, lastCategoriesIndex)




  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = response.data;
      console.log(responseData.id);
      router.push('/admin/categories');
      await fetchCetegories();

    } catch (error) {
      console.log(`error: ${error}`)
    }
  };

  const paginate = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };


  const fetchCetegories = async () => {
    console.log('check')
    try {
      const response = await axiosInstance.get(`${API}`, {
        params: {
          page: currentPage,
          page_size: countCategories,
        },

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = response.data;
      setQuantity(responseData.count);
      setCategoriesDetails(responseData);
      setCategoriesTake(responseData.results[0].id);

      const simplifiedCategories = responseData.results.map((result: { name: any; id: any; }) => ({
        name: result.name,
        id: result.id,
      }));

      setCategories(prevCategories => [...prevCategories, ...simplifiedCategories.filter((newCategory: { id: number; }) => !prevCategories.some(prevProduct => prevProduct.id === newCategory.id))]);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    console.log('BLablablalbalba')
    fetchCetegories();
  }, [currentPage]);


  const handleGet = async () => {
    try {
      const response = await axiosInstance.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { name } = response.data;
      setCategoryData({ name });

      const responseEditDetails = response.data;
      setCategoriesDetailsEdit(responseEditDetails)

    } catch {
      return null;
    }
  };

  //@ts-ignore
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`${API_PATCH}`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { name } = response.data;
      setCategoryData({ name });
      await fetchCetegories();
      router.push('/admin/categories/');

    } catch {
      return null;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting category with ID:', id);
      await axiosInstance.delete(`${API_DELETE}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));

    } catch (error) {
      console.log(error);
      return null
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
    countCategories,
    currentCategory,
    quantity,

    paginate,
    handleChange,
    handleSubmit,
    handleGet,
    handleChangeEdit,
    handleDelete,
    fetchCetegories,
    handleSubmitEdit,
  };
};
