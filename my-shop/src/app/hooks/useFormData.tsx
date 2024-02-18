import { useState } from 'react';
import { useAppContext } from '../Core/Context';
//@ts-ignore
import axios from 'axios';
//@ts-ignore
import { useRouter } from 'next/navigation';
import { CONFIG_URL } from '../helper/config';

interface Errors {
  email?: string[];
  password?: string[];
}

interface FormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const useFormData = (formType: 'registration' | 'login') => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    first_name: 'string',
    last_name: 'string',
  });

  const { axiosInstance } = useAppContext();
  const [errors, setErrors] = useState<Errors>({});
  const ApiAuth = 'auth/me/';
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleShopId = async () => {
    try {
      const response = await axiosInstance.get(`${ApiAuth}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      });

      const IdStoreItem = response.data.shops[0].id;
      localStorage.setItem('storeId', IdStoreItem);

    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessages([]);
  
    try {
      let endpoint = '';
      if (formType === 'registration') {
        endpoint = `${CONFIG_URL}auth/registration/`;
      } else if (formType === 'login') {
        endpoint = `${CONFIG_URL}auth/token/`;
      }
  
      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const responseData = response.data;
      console.log(responseData);
  
      console.log(Object.keys(responseData));
  
      if (response.status === 200 || response.status === 201) {
        if (formType === 'registration') {
          console.log('User registered successfully');
          const tokenResponse = await axios.post(`${CONFIG_URL}auth/token/`, {
            email: formData.email,
            password: formData.password,
          });
  
          if (tokenResponse.status === 200 || tokenResponse.status === 201) {
            const tokenData = tokenResponse.data;
            console.log('Token received successfully:', tokenData);
            const accessToken = tokenData.access;
            const refreshToken = tokenData.refresh;
            console.log('Access token:', accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            handleShopId()
            router.push('/admin');
          } else {
            console.error('Token retrieval failed');
          }
        } else if (formType === 'login') {
          console.log('User logged in successfully');
          const token = responseData.access;
          const refreshToken = responseData.refresh;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          handleShopId()
          router.push('/admin');
        }
      }
    } catch (error) {
      console.error(`Error during ${formType}:`, error);
    }
  };
  
  return {
    formData,
    errors,
    errorMessages,
    show,
    isFormInvalid,
    handleChange,
    handleClick,
    handleSubmit,
    handleShopId,
  };
};
