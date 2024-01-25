'use client'


import { Box, Text } from '@chakra-ui/react';
import { FormInput } from '../Components/FormRegistration';
import Link from '../../../node_modules/next/link';

const Create = () => {
  return (
    <>
      <Box className='container-form'>
        <FormInput
          title='Create a Shopy account'
          email='Email'
          password='Password'
          description='By creating an account, I agree to Shopy’s <span class="create-span-link">Terms of Service</span> and <span class="create-span-link">Privacy Policy</span>'
        />

        <div className='create-box-button'>
          <Text fontSize='md'> Already have a Shopy account?
            <Link href='./login'>
              <span className='create-span-link bold-link'>Log in</span>
            </Link>
          </Text>
        </div>
      </Box>
    </>
  )
}

export default Create;
