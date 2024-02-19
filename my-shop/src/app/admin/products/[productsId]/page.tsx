'use client'

import { AdminHeader } from "@/app/Components/AdminHeader"
import { useAppContext } from "@/app/Core/Context"
import { ButtonSave } from "@/app/Components/ButtonSave"
//@ts-ignore
import { Box } from '@chakra-ui/react';
import { AdminInputProducts } from "@/app/Components/AdminInputProducts";
import { SpinnerComponent } from "@/app/Components/Spinner"; 
import { useProductsForm } from "@/app/hooks/useProductsForm";
import { useEffect } from "react";
import '../../../main.scss';


const ProductsIdContent = () => {

  const { productData, formData, productsDetailsEdit, handleChangeEdit, handleSubmitEdit, handleGet } = useProductsForm()
  const { selectedIdProduct } = useAppContext()

  useEffect(() => {
    handleGet();
  }, []);

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
            name={String(productData.name)}
            description={String(productData.description)}
            sum={String(productData.price)}
            formData={formData}
            handleChange={handleChangeEdit}
          />
          <ButtonSave btnText='Save' />
        </form>
      </Box>
    </>
  )
}

export default ProductsIdContent
