import React from 'react';
import Editor from './Editor';
import { createDataUrlAsync, imageResourcePromise } from './Editor/utils/elementLoadPromise';
import { uniqueId } from './Editor/utils/uniqueId';

interface EditorImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const MAX_MERCHANT_IMAGE = 3;

let imageList: Array<EditorImage> = [];

async function getImageList(): Promise<EditorImage[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(imageList);
    }, 60);
  });
}

async function uploadImage(formData: FormData) {
  const files = [...formData.values()] as File[];
  const addImageList: EditorImage[] = await Promise.all(
    files.map(async (file) => {
      const fileUrl = await createDataUrlAsync(file);
      const element = await imageResourcePromise(fileUrl);
      return {
        id: uniqueId(),
        width: element.width,
        height: element.height,
        url: fileUrl,
      };
    }),
  );
  imageList = [...imageList, ...addImageList];
}

async function deleteImage(id: string) {
  imageList = imageList.filter((image) => image.id !== id);
}

export default function App() {
  return (
    <Editor
      imageAction={{
        async getImageList() {
          const imageInfoList = await getImageList();
          return imageInfoList || [];
        },
        uploadImage,
        deleteImage,
        maxCountImage: MAX_MERCHANT_IMAGE,
      }}
    />
  );
}
