import { Products } from '../typesProduct';
import { useAppContext } from '../Core/Context';
import Link from '../../../node_modules/next/link';
//@ts-ignore
import { Text, Image } from '@chakra-ui/react';
import { Categories } from '../typesCategory';

interface AdminCategoriesComponentProps {
  title: string;
  imageUrl?: string;
  handleDeleteProduct?: () => void;
  handleDeleteCategory?: () => void;
  product?: Products;
  category?: Categories;
  onckickModal?: () => void;
}

export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  product,
  category,
  imageUrl,
  title,
  handleDeleteProduct,
  handleDeleteCategory,
  onckickModal,

}) => {

  const { setSelectedIdCategory, setSelectedIdProduct } = useAppContext()

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

            <button type="button" className='css-172cj4q'>
              <Image
                className='adminCategoriesBlock-content__actions-delete css-172cj4q'
                src='/images/category/categories/basket.svg'
                width={20}
                height={20}
                alt="Picture of the author"
                onClick={() => {
                  //@ts-ignore
                  handleDeleteProduct(product?.id);
                  //@ts-ignore
                  handleDeleteCategory(category?.id);

                  console.log('Product:', product);

                }} />
            </button>
          </div>
        </div>
        <div className="adminCategoriesBlock-line" />
      </div>
    </>
  )
}
