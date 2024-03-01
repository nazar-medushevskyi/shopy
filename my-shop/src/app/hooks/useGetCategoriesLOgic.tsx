'use client'

import { useState } from "react";
import { useCategoriesForm } from "./useCategoriesForm";

export const useGetCategoriesLOgic = () => {

  const { fetchCetegories, } = useCategoriesForm()
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [images, setImages] = useState<File[]>([]);


  const handleGetCategoryList = async () => {
    await fetchCetegories()
  };

  const handleCategoriesChange = (categoriesId: any) => {
    console.log(`categoriesId ${categoriesId}`);
    setSelectedCategories(categoriesId);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: File[] = Array.from(files);
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return {
    selectedCategories,
    images,

    handleCategoriesChange,
    handleGetCategoryList,
    handleImageUpload,
    handleRemoveImage,
  }
}
