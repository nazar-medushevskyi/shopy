//@ts-ignore
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
//@ts-ignore
import { FaDollarSign } from 'react-icons/fa';

interface AdminInputProductsProps {
  name: string;
  description: string;
  sum: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: { name: string; description: string; price: string };
  isValueComponent?: boolean;
}

export const AdminInputProducts: React.FC<AdminInputProductsProps> = ({
  name,
  description,
  sum,
  handleChange,
  formData,
  isValueComponent = false,
}) => {

  return (
    <>
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={name}
        name='name'
        errorBorderColor='crimson'
        onChange={handleChange}
        value={formData.name || (isValueComponent ? name : '')}      />
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={description}
        name='description'
        errorBorderColor='crimson'
        onChange={handleChange}
        value={formData.description || (isValueComponent ? description : '')}      />

      <InputGroup className='input-bg-color-general'>
        <Input
          variant='filled'
          className='input-bg-color-general'
          pr='2.5rem'
          placeholder={sum}
          name='price'
          onChange={handleChange}
          value={formData.price || (isValueComponent ? sum : '')}
        />
        <InputRightElement
          className='input-bg-color-general'
          variant='filled'
          width='4.5rem'
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children={<FaDollarSign />}
        />
      </InputGroup>
    </>
  )
}
