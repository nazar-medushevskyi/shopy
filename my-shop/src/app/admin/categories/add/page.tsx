'use client'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { AdminInputName } from '@/app/Components/AdminInputName';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const CategoriesAdd = () => {

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral'>
          <AdminInputName
            name='Name'
          />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default CategoriesAdd;
