
//@ts-ignore
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

interface InputComponentProps {
  storName: string;
  storNameEmailShopy: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Объявляем функцию handleChange как пропс
  formData: any;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  storName,
  storNameEmailShopy,
  handleChange,
  formData,
}) => {

  return (
    <>
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={storName}
        name="name"
        errorBorderColor='crimson'
        onChange={handleChange}
        value={formData.name}
      />

      <InputGroup
        variant='filled'
      >
        <Input
          placeholder={storNameEmailShopy}
          className='input-bg-color-general'
          style={{
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
          }}
          value={formData.subdomain_name}
          onChange={handleChange}
          name="subdomain_name"
        />
        <InputRightAddon
          className='input-bg-color-general'
          style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px', fontSize: '18px' }}
        >
          .shopy.com
        </InputRightAddon>
      </InputGroup>
    </>
  )
}
