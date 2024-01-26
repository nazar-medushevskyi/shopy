//@ts-ignore
import { Heading } from '@chakra-ui/react';


interface HeadingProps {
  title: string;
}

export const HeadingComponent: React.FC<HeadingProps> = (
  {
    title
  }) => {
  return (
    <>
      <Heading as='h3' size='lg'>{title}</Heading>
    </>
  )
}
