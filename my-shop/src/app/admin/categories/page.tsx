'use client'
import { useCategoriesForm } from '@/app/hooks/useCategoriesForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { useEffect } from 'react'
import { Categories } from '@/app/typesCategory'
import { useAppContext } from '@/app/Core/Context'

const CategoriesPage = () => {

  const { categories, fetchCetegories, handleDelete } = useCategoriesForm()
  const { selectedIdCategory } = useAppContext()

  useEffect(() => {
    fetchCetegories(); 
  }, [selectedIdCategory]);

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />


        {categories && categories.map((category: Categories) => (
          <AdminCategoriesComponent
            category={category}
            key={category.id}
            title={category.name}
            handleDeleteCategory={() => handleDelete(category.id)}
            handleDeleteProduct={() => {}}
          />
        ))}

        <Link href='/admin/categories/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default CategoriesPage;
