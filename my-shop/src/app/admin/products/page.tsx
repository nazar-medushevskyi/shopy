'use client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

import { useEditProductsForm } from '@/app/hooks/useEditProductsForm'
import { useProductsForm } from '@/app/hooks/useProductsForm'
//@ts-ignore
import { Button, Box } from '@chakra-ui/react'
//@ts-ignore
import { AdminHeader } from '@/app/Components/AdminHeader'
import { AdminCategoriesComponent } from '@/app/Components/AdminCategories'
import '../../main.scss'
import Link from '../../../../node_modules/next/link'
import axios from '../../../../node_modules/axios/index'
import { ButtonSave } from '@/app/Components/ButtonSave'
import { CONFIG_URL } from '@/app/helper/config'
import { useIsRegistered } from '@/app/hooks/useRegistrationStatus'
import { useEffect, useState } from 'react'
import { Products } from '@/app/typesProduct'
import { AdminInputProducts } from '@/app/Components/AdminInputProducts';

const Productss = () => {

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { products, formData, fetchProducts } = useProductsForm()
  const selectedShopId = useIsRegistered().selectedShopId
  const API = `${CONFIG_URL}shop/${selectedShopId}/products`
  const accessToken = localStorage.getItem(`accessToken`);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const [selectedId, setSelectedId] = useState();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',

  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting product with ID:', id);
      await axios.delete(`${API}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchProducts()
    } catch {

      return null
    }
  }

  const handleGet = async (id: number) => {
    try {
      const response = await axios.get(`${API}/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, description, price } = response.data;
      setProductData({ name, description, price });
      fetchProducts();
    } catch {
      return null;
    }
  };

  const handlePath = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();

    console.log('12345');
    try {
      await axios.patch(`${API}/${id}/`, productData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      fetchProducts()
    } catch(error) {
      console.log('error', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Box className='adminPagesBox categoriesBox '>
        <AdminHeader />

        {products && products.map((product: Products) => (
          <AdminCategoriesComponent
            onckickModal={() => {
              setOverlay(<OverlayTwo />)
              onOpen()
              handleGet(product.id);
            }}
            setSelectId={setSelectedId}
            product={product}
            key={product.id}
            title={product.name}
            handleEdit={() => handleGet(product.id)}
            handleDelete={() => handleDelete(product.id)}
            imageUrl="/images/category/categories/defaultIcon.svg"
          />
        ))}

        <Link href='/admin/products/add'>
          <Button className='buttonAdd button-position-categories' colorScheme='purple'>+</Button>
        </Link>
      </Box>


      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <form className='form-container-adminGeneral' onSubmit={(e) => handlePath(e, selectedId)}>
                <AdminInputProducts
                  name={String(productData.name)}
                  description={String(productData.description)}
                  sum={String(productData.price)}
                  formData={formData}
                  handleChange={handleChange}
                />
          <ModalFooter>
            <ButtonSave btnText='Save' />
          </ModalFooter>
          </form>
          </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Productss;
