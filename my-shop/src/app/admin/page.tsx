'use client'

import { useEffect } from "react";


const Admin = () => {

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) {
      window.location.href = '/login';
    }
  }, [])

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default Admin;
