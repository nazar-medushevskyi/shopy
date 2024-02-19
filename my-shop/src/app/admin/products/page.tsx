'use client'

import { useProductsForm } from '@/app/hooks/useProductsForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { useAppContext } from '@/app/Core/Context'
import { SpinnerComponent } from '@/app/Components/Spinner'
import { Pagination } from '@/app/Components/Pagination'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { useEffect } from 'react'
import { Products } from '@/app/typesProduct'

const Productss = () => {

  const { products, paginate, currentProduct, countProducts, productsDetails, fetchProducts, handleDelete } = useProductsForm()
  const { selectedIdProduct } = useAppContext()
  const goToPagination = products.length > 8;

  useEffect(() => {
    fetchProducts();
  }, [selectedIdProduct]);

  if (!productsDetails) {
    return <SpinnerComponent />
  }

  console.log(`products: ${products.length}`)

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {products ? (
          currentProduct.map((product: Products) => (
            <AdminCategoriesComponent
              product={product}
              key={product.id}
              title={product.name}
              handleDeleteProduct={() => handleDelete(product.id)}
              handleDeleteCategory={() => { }}
              imageUrl="/images/category/categories/defaultIcon.svg"
            />
          ))
        ) : (
          <span>ЛАЛАЛАFKKKFFK</span>
        )}


        {goToPagination && (
          <Pagination
            countProducts={countProducts}
            totalProducts={products.length}
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
