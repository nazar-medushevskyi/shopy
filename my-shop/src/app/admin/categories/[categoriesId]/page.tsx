'use client'

import { AdminHeader } from "@/app/Components/AdminHeader";
//@ts-ignore
import { Box } from '@chakra-ui/react';
import { useAppContext } from "@/app/Core/Context";
import { SpinnerComponent } from "@/app/Components/Spinner";
import { AdminInputName } from "@/app/Components/AdminInputName";
import { ButtonSave } from "@/app/Components/ButtonSave";
import { useCategoriesForm } from "@/app/hooks/useCategoriesForm";
import { useEffect } from "react";

const CategoryPageEdit = () => {
  const { formData,
    handleSubmitEdit,
    categoriesDetailsEdit,
    categoryData,
    handleGet,
    handleChangeEdit
  } = useCategoriesForm(false);

  const { selectedIdCategory } = useAppContext()
  console.log(selectedIdCategory)

  useEffect(() => {
    handleGet();
  }, []);

  if (!categoriesDetailsEdit) {
    return <SpinnerComponent />
  }

  return (
    <>
      <AdminHeader />

      <Box className='container-form adminPagesBox'>

        ID: {selectedIdCategory}

        <form className='form-container-adminGeneral' onSubmit={handleSubmitEdit}>
          <AdminInputName
            name={categoryData.name}
            handleChange={handleChangeEdit}
            formData={formData}
            isValueComponent={true}
          />
          <ButtonSave btnText='Save' />
        </form>
      </Box>
    </>
  );
};

export default CategoryPageEdit;
