'use client'

//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'

const Categories = () => {

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />
        <AdminCategoriesComponent title={'Category'} />

        <Link href='/admin/categories/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default Categories;
