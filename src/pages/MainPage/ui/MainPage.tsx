import { FileList } from 'features/FileUploader';
import { FC } from 'react';
import cls from './MainPage.module.scss';

const MainPage: FC = () => {
  return (
    <div className={cls.main}>
      <div className={cls.content}>
        <h1>My Cloud</h1>
      </div>
      <div className=''>
        <FileList />
      </div>
    </div>
  );
};

export default MainPage;
