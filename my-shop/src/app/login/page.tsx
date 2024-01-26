'use client'

//@ts-ignore
import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FormInput } from '../Components/FormRegistration';
import { useIsRegistered } from '../hooks/useRegistrationStatus';

const Create = () => {

  const isRegistered = useIsRegistered().isRegistered;

  useEffect(() => {
    console.log(isRegistered);
    if (isRegistered !== null && isRegistered) {
      window.location.href = '/admin';
    }
  }, [isRegistered]);

  return (
    <>
      <Box className='container-form'>
        <FormInput
        title='Log in to Shopy account'
        email='Email'
        password='Password'
        />

        <div className='create-box-button'>
          <Text fontSize='md'><span className='create-span-link bold-link'>Forgot your password?</span></Text>
        </div>
      </Box>
    </>
  )
}

export default Create;
