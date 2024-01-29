'use client'
//@ts-ignore
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { GeneralRegistration } from '../Components/GeneralRegistration';
import { useIsRegistered } from '../hooks/useRegistrationStatus';

const Admin = () => {
  const isRegistered = useIsRegistered().isRegistered;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      window.location.href = '/login'; // Если токен отсутствует, перенаправляем на страницу входа
    } else {
      if (isRegistered === null || isRegistered === false) {
        // Если пользователь не зарегистрирован, ничего не делаем, оставляем на текущей странице
      } else {
        window.location.href = '/admin'; // Если пользователь зарегистрирован, перенаправляем на страницу администратора
      }
    }
  }, [isRegistered]);

  return (
    <>
        <GeneralRegistration
          title={'Your general store info'}
          storName={'Store name'}
          storNameEmailShopy={'storename'}
          currency={['USD', 'UAH']}
          btnText={'Complete'}
        />
        
    </>
  )
}

export default Admin;
