import { Box, Text } from '@chakra-ui/react';
import { FormInput } from '../Components/FormRegistration';

const Create = () => {
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
