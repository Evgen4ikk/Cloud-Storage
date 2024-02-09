import { FileUploader } from 'features/FileUploader';
import { FC } from 'react';
import { FaFolderPlus, FaPlus } from 'react-icons/fa';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './MainPage.module.scss';

const MainPage: FC = () => {
  const { isShow, ref, setIsShow } = useOutside(false);
  return (
    <div className={cls.main}>
      <div className={cls.content}>
        <h1>My Cloud</h1>
        <div className={cls.create}>
          <div className={cls.file} onClick={() => setIsShow(true)}>
            <div className={cls.bg}>
              <FaPlus className={cls.icon} size={18} />
            </div>
            <span>Add File</span>
          </div>
          <div className={cls.folder}>
            <FaFolderPlus className={cls.icon} size={24} />
            <span>Add Folder</span>
          </div>
        </div>
      </div>
      <FileUploader />
      {/* {isShow && (
        <div ref={ref}>
          <Modal>
            <div>asd</div>
          </Modal>
        </div>
      )} */}
    </div>
  );
};

export default MainPage;
