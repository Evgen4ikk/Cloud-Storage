import { IFolder } from 'features/FolderCreate/types/folder';
import { FC, useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { bytesToKB } from 'shared/lib/utils/bytesToKB';
import { Modal } from 'shared/ui/Modal/Modal';
import { FolderModal } from '../FolderModal/FolderModal';
import cls from './FolderItem.module.scss';

interface IFolderItemProps {
  folder: IFolder;
}

export const FolderItem: FC<IFolderItemProps> = ({ folder }) => {
  const { isShow, ref, setIsShow } = useOutside(false);

  const {
    isShow: isShowModal,
    ref: modalRef,
    setIsShow: setIsShowModal,
  } = useOutside(false);

  const [totalSize, setTotalSize] = useState<number>(0);

  useEffect(() => {
    let size = 0;
    folder.files.forEach(file => {
      size += file.size;
    });
    setTotalSize(size);
  }, [folder.files]);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <div className={cls.item} onClick={() => setIsShowModal(true)}>
        <div className={cls.fileIcon}>
          <FaFolder size={48} />
        </div>
        <div className={cls.fileName}>{folder.name}</div>
        <div className={cls.fileCount}>{folder.files.length} files</div>
        <div className={cls.folderSize}>{bytesToKB(totalSize)}</div>
      </div>
      {isShowModal && (
        <>
          <div className={cls.backdrop} onClick={handleCloseModal} />
          <Modal height='550px' width='50%'>
            <FolderModal onClose={handleCloseModal} folder={folder} />
          </Modal>
        </>
      )}
    </>
  );
};
