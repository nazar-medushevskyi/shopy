'use client'

import { useCategoriesForm } from "./useCategoriesForm";

export const useGetCategoriesLOgic = () => {

  const { fetchCetegories, } = useCategoriesForm()

  const handleGetCategoryList = async () => {
    await fetchCetegories()
  };


  return {
    handleGetCategoryList,
  }
}
