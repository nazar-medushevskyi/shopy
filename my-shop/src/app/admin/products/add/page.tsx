'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { useAppContext } from '@/app/Core/Context';
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
    handleCategoriesChange,
    handleImageUpload,
    formData,
    images,
    handleRemoveImage
  } = useProductsForm()

  const selectedShopId = localStorage.getItem('storeId');
  const API = `shop/${selectedShopId}/products/`;

  const {
    handleGetCategoryList,
  } = useGetCategoriesLOgic()

  const { axiosInstance } = useAppContext()

  const accessToken = localStorage.getItem(`accessToken`);

  // test
  const handleGetButtonCheck = async () => {
    try {
      await axiosInstance.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch(error) {
      console.log(error)
      return null
    }
  }

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

      <button onClick={handleGetButtonCheck}>Test Button</button>
    </>
  )
}

export default ProductsAdd;
