import { Products } from '../typesProduct';
//@ts-ignore
import { Text, Image } from '@chakra-ui/react'

interface AdminCategoriesComponentProps {
  title: string;
  imageUrl?: string;
  handleDelete: () => void;
  handleEdit: () => void;
  product: Products
  onckickModal: () => void;
  setSelectId: () => void;
}


export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  product,
  imageUrl,
  title,
  handleDelete,
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
                  onClick={() => {setSelectId(product.id), handleEdit(product.id)} }
                  
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
                    console.log('Product ID:', product.id);
                    handleDelete(product.id);
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
