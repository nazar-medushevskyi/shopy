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

  const { axiosInstance } = useAppContext()
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [adminPage, setAdminPage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log('Input changed:', e.target.name, e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
