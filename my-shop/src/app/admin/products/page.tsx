'use client'

//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'

const Products = () => {

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />
        <AdminCategoriesComponent title={'Product'} imageUrl="/images/category/categories/defaultIcon.svg" />

        <Link href='/admin/products/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default Products;
