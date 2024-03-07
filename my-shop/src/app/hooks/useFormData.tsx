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
  const [accountNotFound, setAccountNotFound] = useState<boolean>(false);


  const handleShopId = async () => {
    try {
      const response = await axiosInstance.get(`${ApiAuth}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      });

      const newIdStoreItem = response.data.shops[0].id;
      localStorage.setItem('storeId', newIdStoreItem);

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
    setIsFormInvalid(false);
    setErrors({});
    setAccountNotFound(false);

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

      if (response.status >= 200 && response.status < 300) {
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
      } else if (response.status === 401 || response.status === 404) {
        setAccountNotFound(true);
      }

    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 401 || status === 404) {
          setAccountNotFound(true);
        }
  
        if (data && typeof data === 'object') {
          let emailError = data.email && Array.isArray(data.email) ? data.email[0] : null;
          let passwordError = data.password && Array.isArray(data.password) ? data.password[0] : null;
  
          const combinedErrors: string[] = [];
  
          if (emailError) {
            combinedErrors.push(emailError);
            setErrors(prevErrors => ({ ...prevErrors, email: [emailError] }));
          }
          if (passwordError) {
            combinedErrors.push(passwordError);
            setErrors(prevErrors => ({ ...prevErrors, password: [passwordError] }));
          }
  
          setErrorMessages(prevErrors => [...prevErrors, ...combinedErrors]);
        }
        
        
      } else if (error.message) {
        setErrorMessages([error.message]);
      }
      setIsFormInvalid(true);
    }
  };

  return {
    formData,
    errors,
    errorMessages,
    show,
    isFormInvalid,
    accountNotFound,
    
    handleChange,
    handleClick,
    handleSubmit,
    handleShopId,
  };
};
