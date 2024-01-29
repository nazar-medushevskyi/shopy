'use client'
//@ts-ignore
import cn from 'classnames';
import { Link, Text, CloseButton, Image, Button } from '@chakra-ui/react';
import '../main.scss';
//@ts-ignore
import { HamburgerIcon } from '@chakra-ui/icons';

export const AdminHeader = () => {

  const CONFIG_ADMIN = '/admin/'

  const generalLink = `${CONFIG_ADMIN}general`;
  const categories = `${CONFIG_ADMIN}categories`;
  const products = `${CONFIG_ADMIN}products`;
  const orders = `${CONFIG_ADMIN}orders`

  const data = {
    categories: [
      { id: 1, name: 'General', image: '/images/category/settings.svg', link: generalLink },
      { id: 2, name: 'Categories', image: '/images/category/mod.svg', link: categories },
      { id: 3, name: 'Products', image: '/images/category/mod.svg', link: products },
      { id: 4, name: 'Orders', image: '/images/category/ul.svg', link: orders},
    ],
  };

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

        <div className="menu-container">
          {data.categories.map((category) => (
            <Link href={category.link}>
              <Button
                key={category.id}
                colorScheme='white'
                className='menu-button-content'
                size='lg'
              >
                <div className="menu-button-container">

                  <Image
                    className='image-logo-header'
                    src={category.image}
                    width={50}
                    height={30}
                    alt="Picture of the author"
                  />
                  <Text className="menu-button-container__text">{category.name}</Text>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
