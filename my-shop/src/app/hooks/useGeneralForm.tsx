import { useState } from 'react';
import { CONFIG_URL } from '../helper/config'

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

  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    subdomain_name: '',
    currency: 'USD',
  });

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
      const accessToken = localStorage.getItem(`accessToken`);
      const response = await fetch(`${CONFIG_URL}shop/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAdminPage(true);
        
      } else {
        console.error('General failed');

        const errorData: Errors = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);

        setErrorMessages([`No active account found with the given credentials`]);

      }
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
