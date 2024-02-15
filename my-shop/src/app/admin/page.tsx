'use client'
//@ts-ignore
import { useRouter } from 'next/navigation'
import { useAppContext } from '../Core/Context';
import { AdminHeader } from '../Components/AdminHeader';
import { useEffect, useState } from 'react';
import { GeneralRegistration } from '../Components/GeneralRegistration';
import { useIsRegistered } from '../hooks/useRegistrationStatus';

const Admin = () => {
  const router = useRouter();

  const isRegistered = useIsRegistered().selectedShopId;
  const [text, setState] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/login');
    } else {
      if (isRegistered === null || isRegistered === false) {
      } else {
        setState(true)

      }
    }
  }, [isRegistered]);

  const { handleTokenRefresh } = useAppContext()

  useEffect(() => {
    handleTokenRefresh();
  }, [])

  console.log(`refreshFunc: ${handleTokenRefresh()}`)

  return (
    <>

      {(text) ? (
        <>
          <AdminHeader />
        </>
      ) : (

        <GeneralRegistration
          title={'Your general store info'}
          storName={'Store name'}
          storNameEmailShopy={'storename'}
          currency={['USD', 'UAH']}
          btnText={'Complete'}
        />
      )
      }
    </>
  )
}

export default Admin;
