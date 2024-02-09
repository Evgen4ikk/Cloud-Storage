import { FC } from 'react';
import { FaFolder } from 'react-icons/fa';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { RiAccountBoxFill } from 'react-icons/ri';
import { TbLogout2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import cls from './Sidebar.module.scss';

export const Sidebar: FC = () => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.content}>
        <div className={cls.logo}>
          <Link to={'/'}>
            <IoCloudUploadSharp size={36} />
          </Link>
        </div>
        <div>
          <ul className={cls.list}>
            <li className={cls.item}>
              <FaFolder className={cls.icon} />
              <span>My cloud</span>
            </li>
            <li className={cls.item}>
              <RiAccountBoxFill className={cls.icon} size={22} />
              <span>Profile</span>
            </li>
          </ul>
        </div>
        <div className={cls.logout}>
          <TbLogout2 className={cls.icon} size={22} />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
};
