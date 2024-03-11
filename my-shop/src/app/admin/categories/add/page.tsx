'use client'

import { useCategoriesForm } from '@/app/hooks/useCategoriesForm';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { SpinnerComponent } from '@/app/Components/Spinner';
import { AdminInputName } from '@/app/Components/AdminInputName';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const CategoriesAdd = () => {

  const {
    handleSubmit,
    handleChange,
    formData
  } = useCategoriesForm(false)


  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <AdminInputName
            name='Name'
            handleChange={handleChange}
            formData={formData}
            isValueComponent={false}
          />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default CategoriesAdd;
