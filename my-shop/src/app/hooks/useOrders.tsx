'use client'

import { useState } from 'react';
import { useAppContext } from '../Core/Context';

export const useOrders = () => {
  const selectedShopId = localStorage.getItem(`storeId`)
  const { axiosInstance } = useAppContext()
  const [ordersDetails, setOrdersDetails] = useState(null)
  const accessToken = localStorage.getItem(`accessToken`);
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
  
      const responseData = response.data;
      setOrdersDetails(responseData)
      setOrdersIdTake(responseData.results[0].id);
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
    ordersDetails,
  };
};
