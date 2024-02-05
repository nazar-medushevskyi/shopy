'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm';
import { useRouter } from '../../../../../node_modules/next/navigation';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { AdminInputProducts } from '@/app/Components/AdminInputProducts';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const ProductsAdd = () => {
  const { handleChange, handleSubmit, formData } = useProductsForm()

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
          <AdminInputProducts
            name='Name'
            description={'Description'}
            sum={'0.00'}
            formData={formData}
            handleChange={handleChange}
          />

            <ButtonSave  btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default ProductsAdd;
