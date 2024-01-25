'use client'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic';
import { useRegistration } from '../hooks/useRegistrationForm';
import { useLogin } from '../hooks/useLoginForm';
import { Icon, Input, Button, InputGroup, InputRightElement, Text, Heading } from '@chakra-ui/react';
import { MdVisibility as ViewIcon, MdVisibilityOff as ViewOffIcon } from 'react-icons/md';
import '../main.scss';

const useRouter = dynamic(() => import('next/router'), { ssr: false });


interface FormInputProps {
  title: string;
  email: string;
  password: string
  description?: string
  isRegistration?: boolean;
}

export const FormInput: React.FC<FormInputProps> = (
  {
    title,
    email,
    password,
    description,
    isRegistration = true,
  }
) => {

  const pathname = usePathname()
  console.log(pathname);
  const isLogin = pathname === '/login';
  console.log(isLogin);



  const {
    handleChange,
    handleClick,
    handleSubmit,
    errorMessages,
    errors,
    show,
    formData
  } = isLogin ? useLogin() : useRegistration();

  const errorCheck = isLogin && errorMessages.length > 1

  return (
    <>
      <Heading as='h3' size='lg'>{title}</Heading>

      <form className='form-container' onSubmit={handleSubmit}>
        <Input
          variant='filled'
          className={`input-bg-color ${errors.email ? 'isInvalid' : '' || (errorCheck ? 'isInvalid' : '')}`}
          placeholder={email}
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={errors.email || errorCheck}
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
            className={`input-bg-color ${errors.password ? 'isInvalid' : '' || (errorCheck ? 'isInvalid' : '')}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={errors.password || errorCheck}
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

        <Button type="submit" className='create-button' colorScheme='purple'>Create Shopy account</Button>
      </form>
    </>
  )
}
