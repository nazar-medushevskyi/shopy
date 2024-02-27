'use client'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} //@ts-ignore
  from '@chakra-ui/react'

//@ts-ignore
import { Text, CloseButton, Image, Button } from '@chakra-ui/react';
//@ts-ignore
import Link from 'next/link'
import { useAppContext } from '../Core/Context';
import { useFormData } from '../hooks/useFormData';
//@ts-ignore

import { useRouter } from 'next/navigation'
import '../main.scss';
//@ts-ignore
import { HamburgerIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon } from '../../../node_modules/@chakra-ui/icons/dist/ChevronDown';

export const AdminHeader = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { handleShopId } = useFormData('login')
  const { axiosInstance } = useAppContext();
  const accessToken = localStorage.getItem(`accessToken`);
  const [shopsCount, setShopsCount] = useState<[]>([])
  const [selectedShop, setSelectedShop] = useState(localStorage.getItem('storeId') || '');

  const handleGetShops = async () => {
    try {
      const response = await axiosInstance.get(`shop/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = response.data;
      setShopsCount(responseData.results.map((shop: { id: any; }) => shop.id));
      console.log(`CHECK: ${responseData}`);
    } catch (error) {
      console.log(`errorAAA: ${error}`)
    }
  }

  const handleStoreChange = (shopId: any) => {
    console.log(`idShop ${shopId}`);
    setSelectedShop(shopId);
    localStorage.setItem('storeId', shopId);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (link: string) => {
    return currentPath.startsWith(link);
  };

  const CONFIG_ADMIN = '/admin/'

  const generalLink = `${CONFIG_ADMIN}general`;
  const categories = `${CONFIG_ADMIN}categories`;
  const products = `${CONFIG_ADMIN}products`;
  const orders = `${CONFIG_ADMIN}orders`

  const data = {
    categories: [
      {
        id: 1,
        name: 'General',
        image: `/images/category/settingBlack.svg`,
        defaultImage: '/images/category/settingWhile.svg',
        link: generalLink
      },

      {
        id: 2,
        name: 'Categories',
        image: `/images/category/ListBlack.svg`,
        defaultImage: '/images/category/ListWhite.svg',
        link: categories
      },

      {
        id: 3,
        name: 'Products',
        image: `/images/category/ListBlack.svg`,
        defaultImage: '/images/category/ListWhite.svg',
        link: products
      },

      {
        id: 4,
        name: 'Orders',
        image: `/images/category/GoFileBlack.svg`,
        defaultImage: '/images/category/GoFileWhite.svg',
        link: orders
      },
    ],
  };

  //@ts-ignore
  const handleSubmitAddStore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    localStorage.removeItem('storeId');
    router.push('/admin');
  }

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return (
    <>
      <header className='admin-header'>
        <div className="admin-header__logo">
          <Image
            className='image-logo-header'
            src='/images/shopyLogo.png'
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>

        <a className='menu-container-burger' href="#menu">
          <button type="button" aria-label="Close" className="css-172cj4q">
            <HamburgerIcon className='menu-burger' boxSize={6} />
          </button>
        </a>
      </header>

      <div className="menu" id="menu">
        <div className="menu__top">
          <Image
            className='image-logo-header'
            src='/images/shopyLogo.png'
            width={50}
            height={50}
            alt="Picture of the author"
          />

          <a href="#home">
            <CloseButton size='lg' />
          </a>
        </div>

        <div className="">
          <div className="selectMenu">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} onClick={handleGetShops}>
                {selectedShop ? `My Shop #${selectedShop}` : 'Actions'}
              </MenuButton>
              <MenuList className="menuList-container-List">
                <MenuItem className="menuButtonSelect" onClick={handleSubmitAddStore}>+ Add new shop</MenuItem>
                {shopsCount.map((shop, index) => (
                  <MenuItem onClick={() => handleStoreChange(shop)} key={index}>My Shop # {index + 1}</MenuItem>

                ))}
              </MenuList>
            </Menu>

          </div>

          <div className='menu-container'>
            {data.categories.map((category) => (
              <Link key={category.id} href={category.link}>
                <Button
                  colorScheme='white'
                  className={`menu-button-content ${isActive(category.link) ? 'active-adminPage-link' : ''}`}
                  size='lg'
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >

                  <div className="menu-button-container">
                    {isActive(category.link) || hoveredCategory === category.id ? (
                      <Image
                        className='image-logo-header'
                        src={category.defaultImage}
                        width={50}
                        height={30}
                        alt="Picture of the author"
                      />
                    ) : (
                      <Image
                        className='image-logo-header'
                        src={category.image}
                        width={50}
                        height={30}
                        alt="Picture of the author"
                      />
                    )}

                    <Text
                      className={`menu-button-container__text ${isActive(category.link) ? 'active-adminPageText' : ''}`}
                    >
                      {category.name}
                    </Text>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
