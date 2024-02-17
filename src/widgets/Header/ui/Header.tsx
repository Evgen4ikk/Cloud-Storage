import { Avatar } from '@mui/material';
import { getUserAuthData } from 'entities/user';
import { FC, useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { RiAccountBoxFill } from 'react-icons/ri';
import { TbLogout2 } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { TotalMemory } from 'widgets/TotalMemory';
import cls from './Header.module.scss';

export const Header: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const user = getUserAuthData();

  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem('AccessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <div className={cls.header}>
        <div className=''></div>
        <div className={cls.logo}>
          <Link to={'/'}>
            <IoCloudUploadSharp size={36} />
          </Link>
        </div>
        <div className={cls.info}>
          <div className={cls.totalMemory}>
            <span>Storage Usage: </span>
            <TotalMemory />
            <span>/ 5 Mb</span>
          </div>
          <div className={cls.profile}>
            {user && (
              <>
                <span>{user.name}</span>
                <Avatar alt='ava' src={user.picture} />
              </>
            )}
          </div>
          <div className={cls.burgerMenu}>
            {isShow ? (
              <>
                <IoMdClose size={24} onClick={() => setIsShow(!isShow)} />
                <div className={cls.menu}>
                  <div className={cls.container}>
                    <div className={cls.profile}>
                      {user && (
                        <>
                          <span>{user.name}</span>
                          <Avatar alt='image' src={user.picture} />
                        </>
                      )}
                    </div>
                    <div className={cls.totalMemory}>
                      <span>Storage Usage: </span>
                      <div>
                        <TotalMemory />
                        <span>/ 5 Mb</span>
                      </div>
                    </div>
                    <ul className={cls.list}>
                      <Link to={'/'}>
                        <li className={cls.item}>
                          <FaFolder className={cls.icon} />
                          <span>My cloud</span>
                        </li>
                      </Link>
                      <Link to={'/profile'}>
                        <li className={cls.item}>
                          <RiAccountBoxFill className={cls.icon} size={22} />
                          <span>Profile</span>
                        </li>
                      </Link>
                    </ul>

                    <div className={cls.logout} onClick={Logout}>
                      <TbLogout2 className={cls.icon} size={22} />
                      <span>Log out</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <IoMdMenu size={24} onClick={() => setIsShow(!isShow)} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
