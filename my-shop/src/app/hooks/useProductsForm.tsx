'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { useAppContext } from '../Core/Context';
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

  const selectedShopId = localStorage.getItem('storeId');
  const accessToken = localStorage.getItem(`accessToken`);
  const [errors, setErrors] = useState({});
  const [productsDetails, setProductsDetails] = useState(null);
  const [productsDetailsEdit, setProductsDetailsEdit] = useState(null)


  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [quantity, setQuantity] = useState()
  const { selectedIdProduct, axiosInstance } = useAppContext();
  const [productIdTake, setProductIdTake] = useState(null);

  const API = `shop/${selectedShopId}/products/`;
  const API_DELETE = `shop/${selectedShopId}/products`;
  const API_GET = `shop/${selectedShopId}/products/${selectedIdProduct}/`;
  const API_PATCH = `shop/${selectedShopId}/products/${selectedIdProduct}/`;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [countProducts] = useState(7);
  const lastProductsIndex = currentPage * countProducts
  const firstProductsIndex = lastProductsIndex - countProducts
  const currentProduct = products.slice(firstProductsIndex, lastProductsIndex)


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
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      
      const response = await axiosInstance.post(`${API}`, formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = response.data;
      console.log(responseData.id);
      router.push('/admin/products');
      await fetchProducts();

    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const paginate = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`${API}`, {
        params: {
          page: currentPage,
          page_size: countProducts,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = response.data;
      setQuantity(responseData.count);
      setProductsDetails(responseData);
      setProductIdTake(responseData.results[0].id);

      const simplifiedProducts = responseData.results.map((result: any) => ({
        name: result.name,
        description: result.description,
        price: result.price,
        id: result.id,
      }));

      setProducts(prevProducts => [...prevProducts, ...simplifiedProducts.filter((newProduct: { id: number; }) => !prevProducts.some(prevProduct => prevProduct.id === newProduct.id))]);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    console.log('lalalaaLALALAL')
    fetchProducts();
  }, [currentPage]);


  const handleGet = async () => {
    try {
      const response = await axiosInstance.get(`${API_GET}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, description, price } = response.data;
      setProductData({ name, description, price });


      const responseEditDetails = response.data;
      setProductsDetailsEdit(responseEditDetails)

    } catch {
      return null;
    }
  };

  //@ts-ignore
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`${API_PATCH}`, productData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { name, description, price } = response.data;
      setProductData({ name, description, price });
      router.push('/admin/products/')
    } catch {
      return null;
    }
  }

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting product with ID:', id);
      await axiosInstance.delete(`${API_DELETE}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));

    } catch (error) {
      console.log(error)
      return null
    }
  }

  return {
    formData,
    errors,
    errorMessages,
    products,
    productIdTake,
    productData,
    productsDetails,
    productsDetailsEdit,
    countProducts,
    currentProduct,
    quantity,

    paginate,
    handleChange,
    handleSubmit,
    handleGet,
    handleSubmitEdit,
    handleDelete,
    fetchProducts,
    handleChangeEdit,
  };
};

