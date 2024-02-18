'use client'
import { useOrders } from '@/app/hooks/useOrders'
//@ts-ignore
import { Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { SpinnerComponent } from '@/app/Components/Spinner'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import { title } from 'process'
import { useEffect } from 'react'

const Orders = () => {

  const { fetchOrders, ordersDetails } = useOrders()

  useEffect(() => {
    fetchOrders()
  }, []);

  if (!ordersDetails) {
    return <SpinnerComponent />
  }

  return (
    <>
      <Box className='adminPagesBox'>
        <AdminHeader />
        <AdminCategoriesComponent
          //@ts-ignore
          handleDelete={() => { }}
          title={title} />
      </Box>
    </>
  )
}

export default Orders;
