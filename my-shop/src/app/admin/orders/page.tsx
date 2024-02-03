'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm'
//@ts-ignore
import { Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import { title } from 'process'

const Orders = () => {

  const { handleDelete } = useProductsForm()

  return (
    <>
      <Box className='adminPagesBox'>
        <AdminHeader />
        <AdminCategoriesComponent handleDelete={handleDelete} title={title} />
      </Box>
    </>
  )
}

export default Orders;
