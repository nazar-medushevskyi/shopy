'use client'
//@ts-ignore
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { GeneralRegistration } from '../Components/GeneralRegistration';
import { useIsRegistered } from '../hooks/useRegistrationStatus';

const Create = () => {
  const isRegistered = useIsRegistered().isRegistered;

  useEffect(() => {
   
    if(isRegistered === null || false) {
      window.location.href = '/login';
    }
  }, [isRegistered])

  // useEffect(() => {
  
  //   if(isRegistered === null || false) {
  //     window.location.href = '/login';
  //   }
  // }, [])

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

export default Create;
