import { FC } from 'react';
import { FaFile } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { bytesToKB } from 'shared/lib/utils/bytesToKB';
import { UploadedFile } from '../../types/file';
import cls from './FileItem.module.scss';

interface IFileItem {
  file: UploadedFile;
}

export const FileItem: FC<IFileItem> = ({ file }) => {
  return (
    <div className={cls.item}>
      <div className={cls.fileIcon}>
        <FaFile size={48} />
      </div>
      <button className={cls.moreBtn}>
        <IoMdMore size={28} />
      </button>
      <div className={cls.fileName}>{file.name}</div>
      <div className={cls.fileSize}>{bytesToKB(file.size)} KB</div>
    </div>
  );
};
