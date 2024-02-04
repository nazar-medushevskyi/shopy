'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import { Products } from '@/app/typesProduct'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { useEffect, useState } from 'react'

const Productss = () => {

  const { products, handleDelete } = useProductsForm()

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {products.map((product) => (
          <AdminCategoriesComponent
            key={product.id}
            title={product.name}
            imageUrl="/images/category/categories/defaultIcon.svg" handleDelete={function (): void {
              throw new Error('Function not implemented.')
            } }          />
        ))}

        <Link href='/admin/products/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default Productss;
