'use client'

import { useProductsForm } from '@/app/hooks/useProductsForm'
import { useAppContext } from '@/app/Core/Context'
//@ts-ignore
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
//@ts-ignore
import { Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { SpinnerComponent } from '@/app/Components/Spinner'
import { Pagination } from '@/app/Components/Pagination'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { Products } from '@/app/typesProduct'
import { useState } from 'react';

const Productss = () => {

  const {
    products,
    paginate,
    quantity,
    currentProduct,
    countProducts,
    productsDetails,
    handleDelete
  } = useProductsForm(true)

  const goToPagination = products.length > 10;

  if (!productsDetails) {
    return <SpinnerComponent />
  }
  console.log(`products: ${quantity}`)




  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {products ? (
          currentProduct.map((product: Products) => (
            <AdminCategoriesComponent
              product={product}
              key={product.id}
              title={product.name.length > 40 ? `${product.name.slice(0, 40)}...` : product.name}
              // handleDeleteProduct={() => handleDelete(product.id)}
              // handleDeleteCategory={() => { }}
              imageUrl="/images/category/categories/defaultIcon.svg"
              handleDeleteOrder={() => handleDelete(product.id)}
            />
          ))
        ) : (
          <span>ЛАЛАЛАFKKKFFK</span>
        )}


        {goToPagination && (
          <Pagination
            countProducts={countProducts}
            totalProducts={quantity}
            paginate={paginate}
          />
        )}

        <Link href='/admin/products/add'>
          <Button
            className='buttonAddProduct'
            colorScheme='purple'
          >
            +
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default Productss;
