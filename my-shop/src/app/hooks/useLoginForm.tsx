import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { CONFIG_URL } from '../helper/config'

interface Errors {
  email?: string[];
  password?: string[];
}

interface LoginFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const useLogin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    first_name: 'string',
    last_name: 'string',
  });

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


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
      const response = await fetch(`${CONFIG_URL}auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.access;
        console.log(token)
        localStorage.setItem('accessToken', token);

        console.log('User logged in successfully');

        router.push('/admin');

      } else {
        console.error('Login failed');

        const errorData: Errors = await response.json();
        setErrors(errorData);
        console.error('Server error:', errorData);

        const errorka = [`${errorData}`]

        setErrorMessages([`No active account found with the given credentials`]);
        setIsFormInvalid(true);

      }
    } catch (error) {
      console.error('Error during login:', error);
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
    isFormInvalid,
  };
};
