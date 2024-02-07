'use client'

import { useState } from 'react';
import { CONFIG_URL } from '../helper/config';
import { useIsRegistered } from './useRegistrationStatus';

export const useOrders = () => {

  const selectedShopId = useIsRegistered().selectedShopId;
  const [ordersIdTake, setOrdersIdTake] = useState(null)

  const API = `${CONFIG_URL}shop/${selectedShopId}/orders/`

  const fetchOrders = async () => {
    const accessToken = localStorage.getItem(`accessToken`);
    try {
      const response = await fetch(`${API}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setOrdersIdTake(responseData.results[0].id)
        const simplifiedCategories = responseData.results.map((result: any) => ({
          products: result.products,
          id: result.id,
        }));
        setOrdersIdTake(simplifiedCategories);
      } else {
        console.error('Failed to fetch Orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return {
    fetchOrders,
    ordersIdTake,
  };
};
