import { useState } from 'react';
import { useAppContext } from '../Core/Context';
//@ts-ignore
import axios, { AxiosError } from 'axios';
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
  const { handleTokenRefresh } = useAppContext();
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);

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

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        if (formType === 'registration') {
          console.log('User registered successfully');
          const accessToken = response.data.access;
          const refreshToken = response.data.refresh
          console.log('Token received successfully:', accessToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          router.push('/admin');
        } else if (formType === 'login') {
          console.log('User logged in successfully');
          const token = response.data.access;
          const refreshToken = response.data.refresh
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessToken', token);
          router.push('/admin');
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error(`Error during ${formType}:`, error);
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response?.status === 401) {
          const refreshSuccessful = await handleTokenRefresh();
          if (refreshSuccessful) {
            await handleSubmit(e);
          }
        }
      }
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
  };
};
