'use client'
//@ts-ignore
import { useRouter } from 'next/navigation'
import { AdminHeader } from '../Components/AdminHeader';
import { useEffect, useState } from 'react';
import { GeneralRegistration } from '../Components/GeneralRegistration';

const Admin = () => {
  const router = useRouter();

  const [state, setState] = useState(false)
  const selectedShopId = localStorage.getItem(`storeId`)
  const isRegistered = selectedShopId;
  console.log('isRegistered')
  console.log(isRegistered)


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken ? setState(!!isRegistered) : router.push('/login');
  }, [isRegistered]);

  return (
    <>

      {(state) ? (
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
