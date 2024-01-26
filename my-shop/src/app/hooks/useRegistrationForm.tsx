import { useState } from 'react';
import { CONFIG_URL } from '../helper/config'

interface Errors {
  email?: string[];
  password?: string[];
}

interface RegistrationFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const useRegistration = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    first_name: 'string',
    last_name: 'string',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    setErrorMessages([]);
  
    try {
      const response = await fetch(`${CONFIG_URL}auth/registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        console.log('User registered successfully');
        
        const tokenResponse = await fetch(`${CONFIG_URL}auth/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
  
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          console.log(tokenData);
          const accessToken = tokenData.access;
          console.log('Token received successfully:', accessToken);
          localStorage.setItem('accessToken', accessToken);

          window.location.href = '/admin'
        } else {
          console.error('Token retrieval failed');
        }
      } else {
        console.error('Registration failed');
  
        const errorData: Errors = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);
  
        setErrorMessages([`${errorData.email?.[0] || ''}`, `${errorData.password?.[0] || ''}`]);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  return {
    formData,
    errors,
    errorMessages,
    show,
    handleChange,
    handleClick,
    handleSubmit,
  };
};
