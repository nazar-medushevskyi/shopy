'use client'

import { useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { CONFIG_URL } from '../helper/config';
import { useAppContext } from '../Core/Context';
import { useIsRegistered } from './useRegistrationStatus';
import { Products } from '../typesProduct';
import { useRouter } from '../../../node_modules/next/navigation';

interface ProductData {
  name: string;
  description: string;
  price: string;
  id: string;
  categories?: boolean
}

export const useProductsForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductData>(
    {
      name: '',
      description: '',
      price: '',
      id: '',

    });

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const accessToken = localStorage.getItem(`accessToken`);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [productIdTake, setProductIdTake] = useState(null)
  const { selectedIdProduct } = useAppContext()
  const API = `${CONFIG_URL}shop/${selectedShopId}/products/`
  const API_DELETE = `${CONFIG_URL}shop/${selectedShopId}/products`
  const API_GET = `${CONFIG_URL}shop/${selectedShopId}/products/${selectedIdProduct}/`
  const API_PATCH = `${CONFIG_URL}shop/${selectedShopId}/products/${selectedIdProduct}/`



  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
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
        router.push('/admin/products');
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
    try {
      const response = await fetch(`${API}`, {
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
          id: result.id,
        }));
        setProducts(simplifiedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  //@ts-ignore

  const handleGet = async () => {
    try {
      const response = await axios.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, description, price } = response.data;
      setProductData({ name, description, price });
      fetchProducts();
    } catch {
      return null;
    }
  };

  //@ts-ignore
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${API_PATCH}`, productData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, description, price } = response.data;
      setProductData({ name, description, price });
      await fetchProducts();
      router.push('/admin/products/')
    } catch {
      return null;
    }
  }

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting product with ID:', id);
      await axios.delete(`${API_DELETE}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchProducts();
    } catch {

      return null
    }
  }


  return {
    formData,
    handleGet,
    handleSubmitEdit,
    handleDelete,
    errors,
    errorMessages,
    handleChange,
    handleSubmit,
    products,
    productIdTake,
    fetchProducts,
    handleChangeEdit,
    productData,
  };
};
