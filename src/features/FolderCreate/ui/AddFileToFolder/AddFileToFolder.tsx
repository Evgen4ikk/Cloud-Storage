import { Button, Upload, message } from 'antd';
import { UploadedFile } from 'features/FileUploader';
import { IFolder } from 'features/FolderCreate/types/folder';
import { FC, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDelete, MdDownload, MdEdit } from 'react-icons/md';
import { useOutside } from 'shared/lib/hooks/useOutside';
import cls from './AddFileToFolder.module.scss';

interface IAddFileToFolder {
  folder: IFolder;
}

export const AddFileToFolder: FC<IAddFileToFolder> = ({ folder }) => {
  const [showList, setShowList] = useState(true);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const {
    isShow: isRenamingShow,
    ref: renamingRef,
    setIsShow: setIsRenamingShow,
  } = useOutside(false);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  useEffect(() => {
    const storedFoldersString = localStorage.getItem('Folders');
    const storedFolders = storedFoldersString
      ? JSON.parse(storedFoldersString)
      : {};
    const storedFiles = storedFolders[folder.name] || [];
    setFiles(storedFiles);
  }, [showList]);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const newUploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        dataUrl: dataUrl,
      };

      if (file.size > 1000000) {
        message.error('The file size must be less than 1 MB');
        return;
      }

      const allowedExtensions = [
        '.pdf',
        '.doc',
        '.docx',
        '.txt',
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
      ];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        message.error(
          'Only files with .pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .gif extensions are allowed'
        );
        return;
      }

      folder.files.push(newUploadedFile);
      message.success(`${file.name} file uploaded successfully`);
    };
    reader.readAsDataURL(file);
  };

  const handleOkClick = () => {
    const storedFoldersString = localStorage.getItem('Folders');
    const storedFolders = storedFoldersString
      ? JSON.parse(storedFoldersString)
      : {};
    const updatedFolders = { ...storedFolders };
    updatedFolders[folder.name] = folder.files;
    localStorage.setItem('Folders', JSON.stringify(updatedFolders));
    message.success(`file was successfully added to the folder ${folder.name}`);
    setShowList(false);
  };

  const handleDelete = (file: UploadedFile) => {
    const updatedFiles = files.filter(f => f.name !== file.name);
    const updatedFolders = {
      ...JSON.parse(localStorage.getItem('Folders') || '{}'),
    };
    updatedFolders[folder.name] = updatedFiles;
    localStorage.setItem('Folders', JSON.stringify(updatedFolders));
    setFiles(updatedFiles);
    message.success(`${file.name} file deleted successfully`);
  };

  const handleDownloadFile = (filename: string) => {
    const file = folder.files.find(f => f.name === filename);
    if (file) {
      const downloadLink = document.createElement('a');
      downloadLink.href = file.dataUrl;
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleRename = () => {
    const updatedFiles = files.map(file => {
      if (file.name === selectedFile?.name) {
        return { ...file, name: newFileName };
      }
      return file;
    });
    const updatedFolders = {
      ...JSON.parse(localStorage.getItem('Folders') || '{}'),
    };
    updatedFolders[folder.name] = updatedFiles;
    localStorage.setItem('Folders', JSON.stringify(updatedFolders));
    setFiles(updatedFiles);
    setIsRenamingShow(false);
    setNewFileName('');
    message.success(`File renamed successfully`);
  };

  const handleEdit = (file: UploadedFile) => {
    setSelectedFile(file);
    setIsRenamingShow(true);
    setNewFileName(file.name);
  };

  const props = {
    showUploadList: showList,
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false;
    },
    accept: '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif',
  };
  return (
    <div className={cls.fileUpload}>
      <div className={cls.upload}>
        <Upload {...props}>
          <Button onClick={() => setShowList(true)}>Select File</Button>
        </Upload>
        <div className={cls.btn}>
          <Button className={cls.btn} onClick={handleOkClick}>
            Upload File
          </Button>
        </div>
      </div>
      <div className={cls.list}>
        {files.map((file, index) => (
          <div key={index} className={cls.item}>
            {isRenamingShow ? (
              <div ref={renamingRef} className={cls.rename}>
                <input
                  type='text'
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                />
                <FaCheck
                  className={cls.icon}
                  color='green'
                  onClick={() => handleRename()}
                />
              </div>
            ) : (
              <>
                <div className={cls.fileName}>{file.name}</div>
                <div className={cls.icons}>
                  <MdDownload onClick={() => handleDownloadFile(file.name)} />
                  <MdEdit onClick={() => handleEdit(file)} />
                  <MdDelete onClick={() => handleDelete(file)} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
