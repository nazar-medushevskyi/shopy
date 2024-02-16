//@ts-ignore
import { Input} from '@chakra-ui/react';

interface AdminInputNameProps {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: { name: string; };
}

export const AdminInputName: React.FC<AdminInputNameProps> = (
  {
    name,
    handleChange,
    formData,
  }
) => {
  return (
    <>
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={name}
        onChange={handleChange}
        name="name"
        errorBorderColor='crimson'
        value={formData.name || name}
      />
    </>
  )
}
