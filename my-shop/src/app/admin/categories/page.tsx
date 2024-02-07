'use client'
import { useCategoriesForm } from '@/app/hooks/useCategoriesForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { useEffect, useState } from 'react'
import { Categories } from '@/app/typesCategory'
import { CONFIG_URL } from '@/app/helper/config'
import { useIsRegistered } from '@/app/hooks/useRegistrationStatus'
import axios from '../../../../node_modules/axios/index'

const Categories = () => {

  const { categories, fetchCetegories } = useCategoriesForm()
  const [selectedId, setSelectedId] = useState();
  const selectedShopId = useIsRegistered().selectedShopId
  const accessToken = localStorage.getItem(`accessToken`);

  const API = `${CONFIG_URL}shop/${selectedShopId}/categories`

  useEffect(() => {
    fetchCetegories()
  }, []);

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting category with ID:', id);
      await axios.delete(`${API}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchCetegories()
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }


  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {categories && categories.map((category: Categories) => (
          <AdminCategoriesComponent
            category={category}
            key={category.id}
            //@ts-ignore
            setSelectId={setSelectedId}
            handleDeleteCategory={() => handleDelete(category.id)}
            handleDeleteProduct={() => {}}
            title={category.name}
          />
        ))}

        <Link href='/admin/categories/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default Categories;
