'use client'
//@ts-ignore
import { usePathname } from 'next/navigation'
//@ts-ignore
import { HeadingComponent } from './Heading';
import { ButtonRegistration } from './ButtonRegistration';
import { useFormData } from '../hooks/useFormData';
//@ts-ignore
import { Icon, Input, Button, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
//@ts-ignore
import { MdVisibility as ViewIcon, MdVisibilityOff as ViewOffIcon } from 'react-icons/md';
import '../main.scss';
//@ts-ignore

interface FormInputProps {
  title: string;
  email: string;
  password: string
  description?: string
  isFormInvalid?: boolean;
}

export const FormInput: React.FC<FormInputProps> = (
  {
    title,
    email,
    password,
    description,
    isFormInvalid
  }
) => {

  const pathname = usePathname()
  console.log(pathname);
  const isLogin = pathname === '/login';
  console.log(isLogin);

  const registrationForm = useFormData('registration');
  const loginForm = useFormData('login');

  const {
    handleChange,
    handleClick,
    errorMessages,
    errors,
    show,
    formData,
    handleSubmit
  } = isLogin ? loginForm : registrationForm;

  return (
    <>
      <HeadingComponent title={title} />

      <form className='form-container' onSubmit={handleSubmit}>
        <Input
          variant='filled'
          className={`input-bg-color ${errors.email || isFormInvalid ? 'isInvalid' : ''}`}
          placeholder={email}
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={errors.email || isFormInvalid}
          errorBorderColor='crimson'
        />

        {errors.email && (
          <p className='error-message'>
            {errorMessages.map((message, index) => (
              <span key={index}>{message}<br /></span>
            ))}
          </p>
        )}

        <InputGroup size='md' variant='filled'>
          <Input
            className={`input-bg-color ${errors.password || isFormInvalid ? 'isInvalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={errors.password || isFormInvalid}
            errorBorderColor='crimson'
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder={password}
          />
          <InputRightElement width='4.5rem'>

            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
            </Button>

          </InputRightElement>
        </InputGroup>
        
        {errors.password && (
          <p className='error-message'>
            {errorMessages.map((message, index) => (
              <span key={index}>{message}<br /></span>
            ))}
          </p>
        )}

        {description && (
          <Text fontSize='sm' dangerouslySetInnerHTML={{ __html: description }} />
        )}

        {isLogin && (
          <p className='error-message'>{errorMessages}</p>
        )}

        <ButtonRegistration btnText={isLogin ? 'Log in to Shopy account' : 'Create Shopy account'} />
      </form>
    </>
  )
}
