import React from "react";
//@ts-ignore

import { ChakraProvider, Skeleton, SkeletonCircle, SkeletonText, Box, Heading, Text, Button, Flex, Link, Spacer } from "@chakra-ui/react";

function Home() {

  return (
    <>

      <ChakraProvider>
        <Box>
          {/* Меню */}
          <Flex backgroundColor="gray.900" padding="4" alignItems="center">
            <Box>
              <Heading as="h1" size="lg" color="white">Shopy</Heading>
            </Box>
            <Spacer />
            <Link href="./login" marginRight="4">
              <Button colorScheme="blue" color="white">Log in</Button>
            </Link>
            <Link href="./signup">
              <Button colorScheme="blue" color="white">Sign Up</Button>
            </Link>
          </Flex>

          {/* Первая секция */}
          <Box
            backgroundImage="url('https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg')"
            height="600px"
            backgroundSize="cover"
            backgroundPosition="center"
            textAlign="center"
            color="white"
            paddingTop="200px"
          >
            <Heading as="h1" size="2xl" marginBottom="6">
              Create Your Online Store with Ease!
            </Heading>
            <Text fontSize="xl" marginBottom="8">
              A simple and intuitive builder for your business.
            </Text>
            <Button colorScheme="blue" size="lg">
              Get Started for Free
            </Button>
          </Box>

          {/* Вторая секция */}
          <Box padding="8" backgroundColor="gray.800" color="white">
            <Heading as="h2" size="xl" marginBottom="4">
              Features of Our Builder
            </Heading>
            <Flex justifyContent="space-around">
              <Feature icon="💼" title="Easy to Use">
                User-friendly interface and intuitive design.
              </Feature>
              <Feature icon="🚀" title="Powerful Functionality">
                Extensive set of tools for your business needs.
              </Feature>
              <Feature icon="🛡️" title="Security">
                High level of data protection and security.
              </Feature>
            </Flex>
          </Box>

          {/* Пятая секция */}
          <Box padding="8" backgroundColor="gray.800" color="white">
            <Heading as="h2" size="xl" marginBottom="4">
              Contact Us
            </Heading>
            <Text fontSize="lg" marginBottom="4">
              Get in touch with us to learn more.
            </Text>
            <Flex justifyContent="center">
              <Link href='./login' marginRight="4">
                <Button colorScheme="blue">Support</Button>
              </Link>
              <Link href="#">
                <Button colorScheme="blue">Feedback</Button>
              </Link>
            </Flex>
          </Box>


          <Skeleton startColor='#1a202c' endColor='#3182ce' height='20px' />
          <Box padding="8" backgroundColor="gray.800" color="white">
            <Box padding='6' boxShadow='lg'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
          </Box>

          <Box padding="8" backgroundColor="gray.800" color="white">
            <Box padding='6' boxShadow='lg'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
          </Box>


          <Box padding="8" backgroundColor="gray.800" color="white">
            <Box padding='6' boxShadow='lg'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
          </Box>
          <Skeleton startColor='#1a202c' endColor='#3182ce' height='20px' />

          {/* Футер */}
          <Box bg="gray.800" color="white" p={4}>
            <Text>© 2024 Shopy. All rights reserved.</Text>
          </Box>
        </Box>

      </ChakraProvider>
    </>
  );
}

//@ts-ignore
const Feature = ({ icon, title, children }) => (
  <Box textAlign="center">
    <Text fontSize="4xl" marginBottom="4">{icon}</Text>
    <Heading as="h3" size="lg" marginBottom="2">{title}</Heading>
    <Text>{children}</Text>
  </Box>
);

export default Home;
