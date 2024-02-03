'use client'
import { useProductsForm } from '@/app/hooks/useProductsForm';
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader';
import { AdminInputProducts } from '@/app/Components/AdminInputProducts';
import { ButtonSave } from '@/app/Components/ButtonSave';
//@ts-ignore
import { Box } from '@chakra-ui/react';
import '../../../main.scss';

const ProductsAdd = () => {

  const {handleSubmit, handleChange, formData} = useProductsForm()

//@ts-ignore
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <>
      <AdminHeader />
      <Box className='container-form adminPagesBox'>

        <form className='form-container-adminGeneral' onSubmit={handleFormSubmit}>
          <AdminInputProducts
            name='Name'
            description={'Description'}
            sum={'0.00'}
            handleChange={handleChange}
            formData={formData}
          />

          <ButtonSave btnText={'Save'} />
        </form>
      </Box>
    </>
  )
}

export default ProductsAdd;
