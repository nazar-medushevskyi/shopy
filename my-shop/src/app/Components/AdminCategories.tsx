import { Products } from '../typesProduct';
//@ts-ignore
import { Text, Image } from '@chakra-ui/react'
import { Categories } from '../typesCategory';

interface AdminCategoriesComponentProps {
  title: string;
  imageUrl?: string;
  handleDeleteProduct?: () => void;
  handleDeleteCategory?: () => void;
  handleEdit: () => void;
  product?: Products;
  category?: Categories;
  onckickModal?: () => void;
  setSelectId: () => void;
}


export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  product,
  category,
  imageUrl,
  title,
  handleDeleteProduct,
  handleDeleteCategory,
  handleEdit,
  onckickModal,
  setSelectId,
}) => {

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

              <button onClick={onckickModal} type="button" className='css-172cj4q'>
                <Image
                  className='adminCategoriesBlock-content__actions-edi'
                  src='/images/category/categories/edit.svg'
                  width={20}
                  height={20}
                  alt="Picture of the author"
                    //@ts-ignore
                  onClick={() => {setSelectId(product.id || category?.id), handleEdit(product.id || category.id)} }
                  
                />
                </button>

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

                  }}/>
                  </button>
              </div>
            </div>
            <div className="adminCategoriesBlock-line" />
      </div>

    </>
  )
}
