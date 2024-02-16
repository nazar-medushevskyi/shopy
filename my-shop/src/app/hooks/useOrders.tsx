'use client'

import { useState } from 'react';
import { useAppContext } from '../Core/Context';
import { CONFIG_URL } from '../helper/config';
import { useIsRegistered } from './useRegistrationStatus';

export const useOrders = () => {
  const { axiosInstance } = useAppContext()
  const accessToken = localStorage.getItem(`accessToken`);
  const selectedShopId = useIsRegistered().selectedShopId;
  const [ordersIdTake, setOrdersIdTake] = useState(null)

  const API = `shop/${selectedShopId}/orders/`

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`${API}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
        const responseData = await response.json();
        setOrdersIdTake(responseData.results[0].id)
        const simplifiedCategories = responseData.results.map((result: any) => ({
          products: result.products,
          id: result.id,
        }));
        setOrdersIdTake(simplifiedCategories);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return {
    fetchOrders,
    ordersIdTake,
  };
};
