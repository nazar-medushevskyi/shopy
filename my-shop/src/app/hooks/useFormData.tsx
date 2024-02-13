//@ts-ignore
import { useRouter } from 'next/navigation'
import { useAppContext } from '../Core/Context';
import { useState } from 'react';
import { CONFIG_URL } from '../helper/config'

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

  const { refreshAccessToken } = useAppContext()
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
    e.preventDefault();
    setErrorMessages([]);
  
    try {
      let endpoint = '';
      if (formType === 'registration') {
        endpoint = `${CONFIG_URL}auth/registration/`;
      } else if (formType === 'login') {
        endpoint = `${CONFIG_URL}auth/token/`;
      }
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        if (formType === 'registration') {
          console.log('User registered successfully');
          const tokenData = await response.json();
          const accessToken = tokenData.access;
          console.log('Token received successfully:', accessToken);
          localStorage.setItem('accessToken', accessToken);
          router.push('/admin');
        } else if (formType === 'login') {
          console.log('User logged in successfully');
          const responseData = await response.json();
          const token = responseData.access;
          localStorage.setItem('accessToken', token);
          router.push('/admin');
        }
      } else {
        if (response.status === 401) {
          console.log('Token expired, refreshing...');
          const newToken = await refreshAccessToken();
          if (newToken) {
            console.log('Token refreshed successfully, retrying...');
   
            return handleSubmit(e);
          } else {
            console.error('Failed to refresh token');
            setErrorMessages(['Failed to refresh token']);
            setIsFormInvalid(true);
            return;
          }
        }
  
        console.error(`${formType} failed`);
        const errorData: Errors = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);
        setErrorMessages([`No active account found with the given credentials`]);
        setIsFormInvalid(true);
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
  };
};
