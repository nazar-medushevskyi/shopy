'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { useAppContext } from '../Core/Context';
import { Categories } from '../typesCategory';
import { Products } from '../typesProduct';
import { useRouter } from '../../../node_modules/next/navigation';

interface ProductData {
  name: string;
  description: string;
  price: string;
  id: string;
  categories: any;
  uploaded_images: File[];
}

export const useProductsForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductData>(
    {
      name: '',
      description: '',
      price: '',
      id: '',
      categories: '',
      uploaded_images: [],
    });

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    categories: '',
    uploaded_images: [],
  });

  const selectedShopId = localStorage.getItem('storeId');
  const accessToken = localStorage.getItem(`accessToken`);
  const [errors, setErrors] = useState({});
  const [productsDetails, setProductsDetails] = useState(null);
  const [productsDetailsEdit, setProductsDetailsEdit] = useState(null)
  // const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);

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
  const [images, setImages] = useState<File[]>([]);

  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleCategoriesChange = (selectedCategories: Categories[]) => {
    if (selectedCategories) {
      const categoryIdsTest = selectedCategories.map(category => category.id);
      setCategoryIds(categoryIdsTest)
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: File[] = Array.from(files);
      const formDataToSend = new FormData();

      newImages.forEach(file => {
        formDataToSend.append('uploaded_images', file);
      });

      setFormData(prevFormData => ({
        ...prevFormData,
        uploaded_images: [...prevFormData.uploaded_images, ...newImages]
      }));

      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
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
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);

      categoryIds.forEach(categoryId => {
        formDataToSend.append('categories', categoryId.toString());
      });

      if (formData.uploaded_images.length > 0) {
        formData.uploaded_images.forEach((file) => {
          formDataToSend.append(`uploaded_images`, file);
        });
      }

      const response = await axiosInstance.post(API, formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
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
        categories: result.categories,
        uploaded_images: result.uploaded_images,
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
      const { name, description, price, categories, uploaded_images } = response.data;
      setProductData({ name, description, price, categories, uploaded_images });


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

      const { name, description, price, categories, uploaded_images } = response.data;
      setProductData({ name, description, price, categories, uploaded_images });
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
    images,

    setImages,
    handleRemoveImage,
    handleImageUpload,
    handleCategoriesChange,
    setFormData,
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

