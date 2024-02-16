'use client'
import { AdminHeader } from './AdminHeader';
import { InputComponent } from './InputComponent';
import { ButtonRegistration } from './ButtonRegistration';
//@ts-ignore
import { Heading, Box, Select } from '@chakra-ui/react';
import { useGeneralForm } from '../hooks/useGeneralForm';
import '../main.scss';
import { useIsRegistered } from '../hooks/useRegistrationStatus';
import { useEffect, useState } from 'react';

interface GeenralInfoProps {
  title: string;
  storName: string;
  storNameEmailShopy: string;
  currency: string[];
  btnText: string;
}

export const GeneralRegistration: React.FC<GeenralInfoProps> = (
  { title,
    storName,
    storNameEmailShopy,
    btnText,
  }) => {


  const isRegistered = useIsRegistered().selectedShopId;
  const { handleChange, handleSubmit, formData, adminPage } = useGeneralForm();
  const [pageAdmin, setPageAdmin] = useState(adminPage);

  useEffect(() => {
    setPageAdmin(adminPage || (isRegistered === true));
  }, [adminPage, isRegistered])


  return (
    <>
      {pageAdmin ? (
        <>
          <AdminHeader />
        </>
      ) : (
        <>
          <Box className='container-form'>

            <Heading as='h3' size='lg'>{title}</Heading>

            <form className='form-container-adminGeneral' onSubmit={handleSubmit}>
              <InputComponent
                storName={storName}
                storNameEmailShopy={storNameEmailShopy}
                handleChange={handleChange}
                formData={formData}
              />

              <Select
                className='input-bg-color-general'
                value={formData.currency}
                variant='filled'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                name="currency"
              >
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
              </Select>

              <ButtonRegistration btnText={btnText} />
            </form>
          </Box>
        </>
      )}
    </>
  )
}
