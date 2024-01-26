'use client'
import { AdminHeader } from '../../Components/AdminHeader';
import { HeadingComponent } from '@/app/Components/Heading';
import { InputComponent } from '@/app/Components/InputComponent';
import { ButtonRegistration } from '@/app/Components/ButtonRegistration';
//@ts-ignore
import { Link, Heading, Box } from '@chakra-ui/react';
import '../../main.scss';




const Nazar = () => {

  return (
    <>
      <AdminHeader />
      <Box className='container-form general-content'>
      <HeadingComponent title={'General'} />

        <form className='form-container-adminGeneral'>
          <InputComponent
            storName={'Store name'}
            storNameEmailShopy={'.shopy.com'} />

          <ButtonRegistration btnText={'Save'} />
        </form>
      </Box>

      <Link href='/nazarTwo'>Link</Link>
    </>
  )
}

export default Nazar;
