'use client'
import { AdminHeader } from '../../Components/AdminHeader';
import { HeadingComponent } from '@/app/Components/Heading';
import { InputComponentGeneral } from '@/app/Components/InputComponentGeneral';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../main.scss'

const General = () => {

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>
      {/* <HeadingComponent title={'General'} /> */}

        <form className='form-container-adminGeneral'>
          <InputComponentGeneral
            storName={'Store name'}
            storNameEmailShopy={'storename'} />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default General;
