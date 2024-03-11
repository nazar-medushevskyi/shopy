'use client'
import { useCategoriesForm } from '@/app/hooks/useCategoriesForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { SpinnerComponent } from '@/app/Components/Spinner'
import { Pagination } from '@/app/Components/Pagination'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import { Categories } from '@/app/typesCategory'

const CategoriesPage = () => {

  const { categories,
    paginate,
    quantity,
    countCategories,
    categoriesDetails,
    handleDelete
  } = useCategoriesForm(true)
  const goToPagination = categories.length > 7;

  if (!categoriesDetails) {
    return <SpinnerComponent />
  }


  return (
    <>
      <Box className='adminPagesBox categoriesBox '>

        <AdminHeader />

        {categories && categories.map((category: Categories) => (
          <AdminCategoriesComponent
            category={category}
            key={category.id}
            title={category.name}
            handleDeleteOrder={() => handleDelete(category.id)}
          />
        ))}

        {goToPagination && (
          <Pagination
            countProducts={countCategories}
            totalProducts={quantity}
            paginate={paginate}
          />
        )}

        <Link href='/admin/categories/add'>
          <Button className='buttonAddProduct' colorScheme='purple'>+</Button>
        </Link>
      </Box>
    </>
  )
}

export default CategoriesPage;
