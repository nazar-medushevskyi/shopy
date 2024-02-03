'use client'

//@ts-ignore
import { useRouter } from 'next/navigation'
//@ts-ignore
import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FormInput } from '../Components/FormRegistration';
import { useIsRegistered } from '../hooks/useRegistrationStatus';

const Login = () => {
  const router = useRouter();

  const isRegistered = useIsRegistered().selectedShopId;

  useEffect(() => {
    console.log(isRegistered)
    if (isRegistered === true) {
      if (!window.location.pathname.startsWith('/admin')) {
        router.push('/admin');
      }
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

export default Login;
