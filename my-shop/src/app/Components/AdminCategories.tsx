//@ts-ignore
import { Text, Image } from '@chakra-ui/react'

interface AdminCategoriesComponentProps {
  title: string
  imageUrl?: string;
}


export const AdminCategoriesComponent: React.FC<AdminCategoriesComponentProps> = ({
  title,
  imageUrl,
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
            />
          </div>
        </div>
        <div className="adminCategoriesBlock-line" />
      </div>
    </>
  )
}
