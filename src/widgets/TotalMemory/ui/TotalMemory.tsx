import { FC, useEffect, useState } from 'react';
import { bytesToKB } from 'shared/lib/utils/bytesToKB';

type Folders = {
  [key: string]: {
    name: string;
    size: number;
  }[];
};

type UploadedFile = {
  name: string;
  size: number;
};

export const TotalMemory: FC = () => {
  const [totalMemory, setTotalMemory] = useState<number>(0);

  useEffect(() => {
    const folders: Folders = JSON.parse(
      localStorage.getItem('Folders') || '{}'
    );
    const uploadedFiles: UploadedFile[] = JSON.parse(
      localStorage.getItem('uploadedFiles') || '[]'
    );

    let totalSize = 0;

    Object.values(folders).forEach(folderFiles => {
      folderFiles.forEach(file => {
        totalSize += file.size;
      });
    });

    uploadedFiles.forEach(file => {
      totalSize += file.size;
    });

    setTotalMemory(totalSize);
    localStorage.setItem('totalMemory', totalSize.toString());
  }, []);

  console.log(totalMemory);

  return <div>{bytesToKB(totalMemory)}</div>;
};
