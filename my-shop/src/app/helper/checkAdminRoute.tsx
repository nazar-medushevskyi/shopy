'use client'
//@ts-ignore
import { useEffect } from 'react';

export const useAdminRouteChecker = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/') && !accessToken) {
      window.location.href = '/login';
    }
  }, []);
};