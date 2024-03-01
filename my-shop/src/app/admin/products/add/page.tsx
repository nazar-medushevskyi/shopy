'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { useGetCategoriesLOgic } from '@/app/hooks/useGetCategoriesLOgic';
import { useCategoriesForm } from '@/app/hooks/useCategoriesForm';
import { AdminInputProducts } from '@/app/Components/AdminInputProducts';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const ProductsAdd = () => {
  const {
    handleChange,
    handleSubmit,
    formData,
  } = useProductsForm()

  const {
    selectedCategories,
    handleCategoriesChange,
    handleGetCategoryList,
    handleImageUpload,
    handleRemoveImage,
    images
  } = useGetCategoriesLOgic()

  const { categories } = useCategoriesForm()

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <AdminInputProducts
            handleRemoveImage={handleRemoveImage}
            images={images}
            handleImageUpload={handleImageUpload}
            name='Name'
            description={'Description'}
            sum={'0.00'}
            formData={formData}
            handleChange={handleChange}
            isValueComponent={false}
            handleCategoriesChange={handleCategoriesChange}
            handleGetCategoryList={handleGetCategoryList}
            categories={categories}
          />
          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default ProductsAdd;
