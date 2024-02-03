import { Products } from '../typesProduct';
//@ts-ignore
import { Text, Image } from '@chakra-ui/react'

interface AdminCategoriesComponentProps {
  title: string;
  imageUrl?: string;
  handleDelete: (id: number) => void;
}


export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  imageUrl,
  title,
  handleDelete,
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
                <Image
                  className='adminCategoriesBlock-content__actions-edit'
                  src='/images/category/categories/edit.svg'
                  width={20}
                  height={20}
                  alt="Picture of the author"
                />

                <Image
                  className='adminCategoriesBlock-content__actions-delete'
                  src='/images/category/categories/basket.svg'
                  width={20}
                  height={20}
                  alt="Picture of the author"
                  onClick={handleDelete}
                />
              </div>
            </div>
            <div className="adminCategoriesBlock-line" />
      </div>

    </>
  )
}
