import { Button, Upload, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { UploadedFile } from '../types/file';
import cls from './FileUploader.module.scss';

const MAX_FILE_SIZE_MB = 1;
const FORBIDDEN_FILE_EXTENSIONS = ['.php', '.json', '.js', '.ts'];

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

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const handleUploadChange = (info: any) => {
    const file = info.file.originFileObj;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (FORBIDDEN_FILE_EXTENSIONS.includes(`.${fileExtension}`)) {
      message.error(
        `Uploading ${file.name} is not allowed. Please upload a different file.`
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      message.error(`File size should be less than ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const newUploadedFile: UploadedFile = {
          id: generateUniqueId(),
          name: info.file.name,
          size: info.file.size,
          dataUrl: dataUrl,
        };
        setUploadedFiles(prevFiles => [...prevFiles, newUploadedFile]);
      };
      reader.readAsDataURL(file);
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
