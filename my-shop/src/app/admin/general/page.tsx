'use client'
import { AdminHeader } from '../../Components/AdminHeader';
import { HeadingComponent } from '@/app/Components/Heading';
import { InputComponent } from '@/app/Components/InputComponent';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../main.scss'
import { useShopDetails } from '@/app/hooks/useGeneralChangeForm';

const General = () => {
  const { shopDetails, formData, handleChange, handleSubmit } = useShopDetails();

  if (!shopDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>
        {/* <HeadingComponent title={'General'} /> */}

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <InputComponent
            storName={formData.name}
            storNameEmailShopy={formData.subdomain_name}
            handleChange={handleChange}
            formData={formData}
          />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default General;
