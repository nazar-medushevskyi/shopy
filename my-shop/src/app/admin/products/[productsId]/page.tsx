'use client'

import { AdminHeader } from "@/app/Components/AdminHeader"
import { useAppContext } from "@/app/Core/Context"
import { Categories } from "@/app/typesCategory"
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
    handleChangeCategorySelect,
    selectedCategories,
  } = useProductsForm(true)

  console.log(`selectedCategories111: ${selectedCategories}`)

  const { categories, mapCategories } = useCategoriesForm(true);

  const {
    handleGetCategoryList,
  } = useGetCategoriesLOgic()


  const { selectedIdProduct } = useAppContext()


  useEffect(() => {
    handleGetCategoryList();
  }, []);


  useEffect(() => {
    handleGet();
  }, [selectedIdProduct]);

  if (!productsDetailsEdit) {
    return <SpinnerComponent />
  }

  const filterCatogies = mapCategories(selectedCategories).map(category => ({
    value: category.id,
    label: category.name
  }))

  console.log(selectedIdProduct);

  const categoriesString = String(productData.categories);
  const categoriesArray = Array.isArray(categoriesString) ? categoriesString : categoriesString.split(',').map(categoryId => parseInt(categoryId.trim()));

  const handleButtonCheckConsole = () => {
    console.log(`categories ${productData.categories}`);
    console.log(`uploaded_images ${productData.uploaded_images}`);
    console.log(`categoriesArray: ${categoriesArray}`)
  }

  return (
    <>

      <AdminHeader />

      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmitEdit}>
          <AdminInputProducts
            handleChangeCategorySelect={handleChangeCategorySelect}
            //@ts-ignore
            selectedCategories={filterCatogies}
            handleRemoveImage={handleRemoveImage}
            handleGetCategoryList={handleGetCategoryList}
            handleImageUpload={handleImageUpload}
            images={images}
            handleCategoriesChange={handleCategoriesChange}
            name={String(productData.name)}
            description={String(productData.description)}
            categories={categories}
            sum={String(productData.price)}
            formData={formData}
            handleChange={handleChangeEdit}
            isValueComponent={true}
            productData={productData}
          />
          <ButtonSave btnText='Save' />
          <button onClick={handleButtonCheckConsole}>click</button>
        </form>
      </Box>
    </>
  )
}

export default ProductsIdContent