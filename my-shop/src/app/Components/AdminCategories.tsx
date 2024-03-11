'use client'


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} //@ts-ignore
  from '@chakra-ui/react'

import { Products } from '../typesProduct';
import { useAppContext } from '../Core/Context';
import Link from '../../../node_modules/next/link';
//@ts-ignore
import { Text, Image } from '@chakra-ui/react';
import { Categories } from '../typesCategory';
import { useState } from 'react';

interface AdminCategoriesComponentProps {
  title: string;
  imageUrl?: string;
  product?: Products;
  category?: Categories;
  onckickModal?: () => void;
  handleDeleteOrder: () => void
}

export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  product,
  category,
  imageUrl,
  title,
  handleDeleteOrder,
  onckickModal,

}) => {

  const {
    setSelectedIdCategory,
    setSelectedIdProduct,

  } = useAppContext()

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const linkCategory = `categories/${category?.id}/`
  const linkProduct = `products/${product?.id}/`

  return (
    <>
      <div className="adminCategoriesBlock">

        <div className="adminCategoriesBlock-content">
          <div className='adminCategoriesBlock-content__info'>
            {imageUrl && (
              <Image
                className='adminCategoriesBlock-content__info-image'
                src={imageUrl}
                width={50}
                height={50}
                alt="Category Image"
              />
            )}
            <Text fontSize='md'>{title}</Text>
          </div>

          <div className="adminCategoriesBlock-content__actions">

            <Link href={`/admin/${window.location.pathname === '/admin/categories' ? linkCategory : linkProduct}`}>
              <button onClick={() => {
                //@ts-ignore
                setSelectedIdProduct(product?.id);
                //@ts-ignore
                setSelectedIdCategory(category?.id);
                onckickModal;
              }}
                type="button"
                className='css-172cj4q'
              >
                <Image
                  className='adminCategoriesBlock-content__actions-edi'
                  src='/images/category/categories/edit.svg'
                  width={20}
                  height={20}
                  alt="Picture of the author"
                />
              </button>
            </Link>

            <button type="button" className='css-172cj4q' onClick={handleOpenModal}>
              <Image
                className='adminCategoriesBlock-content__actions-delete css-172cj4q'
                src='/images/category/categories/basket.svg'
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </button>
          </div>
        </div>
        <div className="adminCategoriesBlock-line" />

        <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete My order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure? You can’t undo this <br /> action afterwards.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={handleCloseModal} width="40%">
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteOrder} width="40%">Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
