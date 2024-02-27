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
  const accessToken = localStorage.getItem('accessToken');

  const handlelogout = () => {
    localStorage.removeItem('storeId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    router.push('/login');
  }


  useEffect(() => {
    accessToken ? setState(!!isRegistered) : router.push('/login');
  }, [isRegistered]);


  return (
    <>

      {(state) ? (
        <>
          <AdminHeader />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          
          <button onClick={handlelogout}>Logout</button>
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
