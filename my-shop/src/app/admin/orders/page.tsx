'use client'

//@ts-ignore
import { Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'

const Orders = () => {

  return (
    <>
      <Box className='adminPagesBox'>
        <AdminHeader />
        <AdminCategoriesComponent title={'Order'} />
      </Box>
    </>
  )
}

export default Orders;
