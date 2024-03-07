import { useFormData } from './useFormData';
import { useState } from 'react';
import { useAppContext } from '../Core/Context';


interface Errors {
  name?: string[];
  subdomain_name?: string[];
  currency?: string;
  user?: string;
}

interface LoginFormData {
  name: string;
  subdomain_name: string;
  currency: string;
}

export const useGeneralForm = () => {
  const accessToken = localStorage.getItem(`accessToken`);

  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    subdomain_name: '',
    currency: 'USD',
  });

  const { handleShopId } = useFormData('registration')

  const { axiosInstance } = useAppContext()
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [adminPage, setAdminPage] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'subdomain_name' && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }

    console.log('Input changed:', name, value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    setErrorMessages([]);
  
    try {
       await axiosInstance.post(`shop/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      setAdminPage(true);
      handleShopId();
  
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return {
    formData,
    errors,
    errorMessages,
    adminPage,
    handleChange,
    handleSubmit,
  };
};