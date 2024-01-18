'use client'

import { useState } from 'react';
import { Icon, Input, Heading, Box, Text, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import './main.scss'
import { MdVisibility as ViewIcon, MdVisibilityOff as ViewOffIcon } from 'react-icons/md';

export default function Home() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: 'string',
    last_name: 'string',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setErrorMessages([]);

    try {
      const response = await fetch('https://485c-37-46-231-110.ngrok-free.app/api/auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');

        const errorData = await response.json();
        console.error('Server error:', errorData);

        setErrorMessages([errorData.detail || 'Registration failed. Please try again.']);

      }

      const responseData = await response.json();
      console.log('User registered successfully');
      console.log('Response data:', responseData);
    } catch (error) {
      console.error('Error during registration:', error);

      setErrorMessages(['An error occurred. Please try again.']);

    }
  };


  return (
    <>
      <Box className='container-form'>
        <Heading as='h3' size='lg'>Create a Shopy account</Heading>
        <form className='form-container' onSubmit={handleSubmit}>
          <Input
            variant='filled'
            className={`input-bg-color ${errorMessages.length > 0 ? 'isInvalid' : ''}`}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={errorMessages.length > 0}
            errorBorderColor='crimson'
          />
          <InputGroup size='md'>
            <Input
              className={`input-bg-color ${errorMessages.length > 0 ? 'isInvalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={errorMessages.length > 0}
              errorBorderColor='crimson'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}

              </Button>
            </InputRightElement>
          </InputGroup>
          {errorMessages.length > 0 && (
            <p className='error-message'>
              {errorMessages.map((message, index) => (
                <span key={index}>{message}<br /></span>
              ))}
            </p>
          )}
          <Button type="submit" className='create-button' colorScheme='purple'>Create Shopy account</Button>
        </form>
        <Text fontSize='sm'>By creating an account, I agree to Shopy’s <span className='create-span-link'>Terms of Service</span> and <span className='create-span-link'>Privacy Policy</span></Text>

        <div className='create-box-button'>
          <Text fontSize='md'> Already have a Shopy account? <span className='create-span-link bold-link'>Log in</span></Text>
        </div>
      </Box>
    </>
  );
}
