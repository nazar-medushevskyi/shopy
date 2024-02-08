'use client'

import { useCategoriesForm } from '@/app/hooks/useCategoriesForm';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { AdminInputName } from '@/app/Components/AdminInputName';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const CategoriesAdd = () => {

  const { handleSubmit, categories, handleChange, formData } = useCategoriesForm()

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <AdminInputName
            name='Name'
            handleChange={handleChange}
            formData={formData}
          />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default CategoriesAdd;
