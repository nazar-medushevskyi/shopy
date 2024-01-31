import { AdminInputName } from "./AdminInputName";
import { Input, InputGroup, InputRightAddon, CheckIcon, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa';

interface AdminInputProductsProps {
  name: string;
  description: string;
  sum: string
}

export const AdminInputProducts: React.FC<AdminInputProductsProps> = ({
  name,
  description,
  sum
}) => {
  return (
    <>
      <AdminInputName name={name} />
      <AdminInputName name={description} />

      <InputGroup className='input-bg-color-general'>
        <Input
          variant='filled'
          className='input-bg-color-general'
          pr="2.5rem"
          placeholder={sum}
        />
        <InputRightElement
          className='input-bg-color-general'
          variant='filled'
          width="4.5rem"
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<FaDollarSign />}
        />
      </InputGroup>
    </>
  )
}
