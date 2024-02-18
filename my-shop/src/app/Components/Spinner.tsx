//@ts-ignore
import { Spinner, Box } from '@chakra-ui/react'
import '../main.scss';

export const SpinnerComponent = () => {
  return (
    <Box className='spinnetContent'>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#805ad5"
      size="xl"
      style={{ width: '100px', height: '100px' }}
    />
    </Box>
  )
}
