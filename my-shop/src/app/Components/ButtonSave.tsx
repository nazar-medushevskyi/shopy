//@ts-ignore
import { Button } from '@chakra-ui/react';
//@ts-ignore
import { useRouter } from 'next/navigation'


interface ButtonSaveProps {
  btnText: string;
}

export const ButtonSave: React.FC<ButtonSaveProps> = (
  {
    btnText
  }) => {

  const router = useRouter();
  const modalocation = router.pathname === '/admin/products';
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
