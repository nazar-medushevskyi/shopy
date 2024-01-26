//@ts-ignore
import { Button } from '@chakra-ui/react';

interface ButtonRegistrationProps {
  btnText: string;
}


export const ButtonRegistration: React.FC<ButtonRegistrationProps> = (
  {
    btnText
  }) => {
  return (
    <>
      <Button type="submit" className='create-button' colorScheme='purple'>{btnText}</Button>
    </>
  )
}