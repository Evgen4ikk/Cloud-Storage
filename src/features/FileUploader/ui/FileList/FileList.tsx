import { UploadedFile } from 'features/FileUploader/types/file';
import { FC, useEffect, useState } from 'react';
import { FileItem } from '../FileItem/FileItem';
import cls from './FileList.module.scss';

interface IFileList {}

export const FileList: FC<IFileList> = ({}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const uploadedFiles = localStorage.getItem('uploadedFiles');

    if (uploadedFiles) {
      const parsedFiles = JSON.parse(uploadedFiles);
      setFiles(parsedFiles);
    }
  }, []);

  const handleDeleteFile = (filename: string) => {
    const updatedFiles = files.filter((f: UploadedFile) => f.name !== filename);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleRenameFile = (filename: string, newName: string) => {
    const updatedFiles = files.map((f: UploadedFile) => {
      if (f.name === filename) {
        return { ...f, name: newName };
      }
      return f;
    });
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleDownloadFile = (filename: string) => {
    const file = files.find(f => f.name === filename);
    if (file) {
      const downloadLink = document.createElement('a');
      downloadLink.href = file.dataUrl;
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <h2>Files:</h2>
      <div className={cls.fileList}>
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            onDelete={() => {
              handleDeleteFile(file.name);
            }}
            onRename={(newName: string) => {
              handleRenameFile(file.name, newName);
            }}
            onDownload={() => {
              handleDownloadFile(file.name);
            }}
          />
        ))}
      </div>
    </div>
  );
};
