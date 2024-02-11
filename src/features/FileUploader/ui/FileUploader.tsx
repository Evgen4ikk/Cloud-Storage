import { Button, Upload, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import cls from './FileUploader.module.scss';
import { UploadedFile } from '../types/file'

interface FileProps {
  onCloseModal: () => void;
}

export const FileUploader: FC<FileProps> = ({ onCloseModal }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem('uploadedFiles');
    if (storedFiles) {
      setUploadedFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const newUploadedFile: UploadedFile = {
        name: info.file.name,
        size: info.file.size,
      };
      setUploadedFiles(prevFiles => [...prevFiles, newUploadedFile]);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleOkClick = () => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    handleCloseModal();
  };

  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: handleUploadChange,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: any) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <div className={cls.content}>
      <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload>
      <Button className={cls.btn} onClick={handleOkClick}>
        Upload File
      </Button>
    </div>
  );
};
