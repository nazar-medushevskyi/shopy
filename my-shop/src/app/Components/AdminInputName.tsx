//@ts-ignore
import { Input} from '@chakra-ui/react';

interface AdminInputNameProps {
  name: string;
}

export const AdminInputName: React.FC<AdminInputNameProps> = (
  {
    name
  }
) => {
  return (
    <>
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={name}
        name="name"
        errorBorderColor='crimson'
      />
    </>
  )
}
