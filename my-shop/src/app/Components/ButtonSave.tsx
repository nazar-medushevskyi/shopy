//@ts-ignore
import { Button } from '@chakra-ui/react';

interface ButtonSaveProps {
  btnText: string;
}


export const ButtonSave: React.FC<ButtonSaveProps> = (
  {
    btnText
  }) => {
  return (
    <>
      <Button type="submit" className='create-button save-button' colorScheme='purple'>{btnText}</Button>
    </>
  )
}
