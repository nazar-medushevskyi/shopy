'use client'

import { AdminHeader } from "@/app/Components/AdminHeader"
import { useAppContext } from "@/app/Core/Context"
import { AdminInputProducts } from "@/app/Components/AdminInputProducts"
import { ButtonSave } from "@/app/Components/ButtonSave"
//@ts-ignore
import { Box } from '@chakra-ui/react';
import { useCategoriesForm } from "@/app/hooks/useCategoriesForm"
import { useGetCategoriesLOgic } from "@/app/hooks/useGetCategoriesLOgic"
import { SpinnerComponent } from "@/app/Components/Spinner";
import { useProductsForm } from "@/app/hooks/useProductsForm";
import { useEffect } from "react";
import '../../../main.scss';


const ProductsIdContent = () => {

  const {
    productData,
    formData,
    productsDetailsEdit,
    handleChangeEdit,
    handleSubmitEdit,
    handleGet,
    handleRemoveImage,
    handleImageUpload,
    images,
    handleCategoriesChange,
  } = useProductsForm(true)

  const { categories } = useCategoriesForm(true)

  const selectedShopId = localStorage.getItem('storeId');
  const API = `shop/${selectedShopId}/products/`;

  const {
    handleGetCategoryList,
  } = useGetCategoriesLOgic()

  const { selectedIdProduct } = useAppContext()


  useEffect(() => {
    handleGet();
  }, [selectedIdProduct]);

  if (!productsDetailsEdit) {
    return <SpinnerComponent />
  }

  console.log(selectedIdProduct);

  return (
    <>

      <AdminHeader />

      <Box className='container-form adminPagesBox'>

        ID: {selectedIdProduct}

        <form className='form-container-adminGeneral' onSubmit={handleSubmitEdit}>
          <AdminInputProducts
            handleRemoveImage={handleRemoveImage}
            handleGetCategoryList={handleGetCategoryList}
            handleImageUpload={handleImageUpload}
            images={images}
            handleCategoriesChange={handleCategoriesChange}
            name={String(productData.name)}
            description={String(productData.description)}
            sum={String(productData.price)}
            formData={formData}
            handleChange={handleChangeEdit}
            isValueComponent={true}
            categories={categories}
          />
          <ButtonSave btnText='Save' />
        </form>
      </Box>
    </>
  )
}

export default ProductsIdContent
