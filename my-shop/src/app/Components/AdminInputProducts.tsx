'use client'

import React from 'react';
//@ts-ignore
import Select from 'react-select';

//@ts-ignore
import makeAnimated from 'react-select/animated';

//@ts-ignore
const animatedComponents = makeAnimated();

//@ts-ignore
import { Input, InputGroup, Image, InputRightElement } from '@chakra-ui/react';
//@ts-ignore
import { FaDollarSign } from 'react-icons/fa';
import { Categories } from '../typesCategory';
//@ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} //@ts-ignore
  from '@chakra-ui/react'
import { ChevronDownIcon } from '../../../node_modules/@chakra-ui/icons/dist/ChevronDown';
import { useState } from 'react';

interface AdminInputProductsProps {
  name: string;
  description: string;
  sum: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  formData: {
    name: string;
    description: string;
    price: string,
    categories: any,
    uploaded_images: File[]
  };

  isValueComponent?: boolean;
  handleGetCategoryList: () => void;
  handleCategoriesChange: (categories: Categories[]) => void;
  categories: Categories[];
  images: File[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (indexToRemove: number) => void;
}

export const AdminInputProducts: React.FC<AdminInputProductsProps> = ({
  name,
  description,
  sum,
  formData,
  isValueComponent = false,
  categories,
  images,

  handleRemoveImage,
  handleImageUpload,
  handleChange,
  handleGetCategoryList,
  handleCategoriesChange,
}) => {

  const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);

  return (
    <>
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={name}
        name='name'
        errorBorderColor='crimson'
        onChange={handleChange}
        value={formData.name || (isValueComponent ? name : '')} />
      <Input
        className='input-bg-color-general'
        variant='filled'
        placeholder={description}
        name='description'
        errorBorderColor='crimson'
        onChange={handleChange}
        value={formData.description || (isValueComponent ? description : '')} />


      <Select
        options={categories.map(category => ({
          value: category,
          label: category.name,
        }))}
        isMulti
        onChange={(selectedOptions: { value: Categories; label: string }[] | null) => {
          if (selectedOptions) {
            const selectedCategories = selectedOptions.map(option => option.value);
            setSelectedCategories(selectedCategories); 
            handleCategoriesChange(selectedCategories); 
          }
        }}
        value={selectedCategories.map(category => ({
          value: category,
          label: category.name,
        }))}
      />

      <InputGroup className='input-bg-color-general'>
        <Input
          variant='filled'
          className='input-bg-color-general'
          pr='2.5rem'
          placeholder={sum}
          name='price'
          onChange={handleChange}
          value={formData.price || (isValueComponent ? sum : '')}
        />
        <InputRightElement
          className='input-bg-color-general'
          variant='filled'
          width='4.5rem'
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children={<FaDollarSign />}
        />
      </InputGroup>

      <div className='main-container-sliderProducts'>

        <label htmlFor="imageUpload" className="image-upload">
          <Image
            className='imageUploadProducts'
            src='/images/category/container.svg'
            width={200}
            height={130}
            alt="Picture of the author"
          />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        <Swiper
          className="swiper-container"
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: any) => console.log(swiper)}
        >
          {images.map((image, index) => (
            <>
              <SwiperSlide className="swiperElement" key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="image-slider-product"
                />

                <Image
                  className='imageUploadProducts-close'
                  src='/images/category/close.svg'
                  width={20}
                  height={20}
                  alt="Picture of the author"
                  onClick={() => handleRemoveImage(index)}
                />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  )
}
