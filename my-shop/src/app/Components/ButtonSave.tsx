//@ts-ignore
import { Button } from '@chakra-ui/react';

interface ButtonSaveProps {
  btnText: string;
}

export const ButtonSave: React.FC<ButtonSaveProps> = (
  {
    btnText
  }) => {

  const modalocation = window.location.pathname === '/admin/products';
  return (
    <>
      <Button type="submit"
        className={`create-button save-button ${modalocation ? 'btnSaveModal' : ''}`}
        colorScheme='purple'>
        {btnText}
      </Button>
    </>
  )
}
