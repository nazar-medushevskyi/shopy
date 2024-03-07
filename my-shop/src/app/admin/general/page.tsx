'use client'
import { AdminHeader } from '../../Components/AdminHeader';
import { InputComponent } from '@/app/Components/InputComponent';
import { ButtonSave } from '@/app/Components/ButtonSave';
import { SpinnerComponent } from '@/app/Components/Spinner';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../main.scss'
import { useShopDetails } from '@/app/hooks/useGeneralChangeForm';

const General = () => {
  const { shopDetails, formData, handleChange, handleSubmit } = useShopDetails();

  if (!shopDetails) {
    return <SpinnerComponent />
  }

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <InputComponent
            storName={formData.name}
            storNameEmailShopy={formData.subdomain_name}
            //@ts-ignore
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
