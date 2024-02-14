import { FC, ReactNode } from 'react';
import cls from './Grid.module.scss';

interface IGrid {
  children?: ReactNode;
}

const Grid: FC<IGrid> = ({ children }) => {
  return <div className={cls.grid}>{children}</div>;
};

export default Grid;
