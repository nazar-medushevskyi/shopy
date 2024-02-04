'use client'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import { Products } from '@/app/typesProduct'
import '../main.scss'
import Link from '../../../node_modules/next/link'

interface ProductsList {
  products: Products[];
  handleDelete: (id: number) => void;
}


export const RenderingProductsList: React.FC<ProductsList> = (
  {products, handleDelete}
  ) => {

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {products.map((el: Products) => (
          <AdminCategoriesComponent
            product={el}
            handleDelete={handleDelete}
            key={el.id}
            title={el.name}
            imageUrl="/images/category/categories/defaultIcon.svg"
          />
        ))}

        <Link href='/admin/products/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}
