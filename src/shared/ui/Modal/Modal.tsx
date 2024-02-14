import { ReactNode } from 'react';
import cls from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  width: string;
  height: string;
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen, onClose, width, height } = props;
  return (
    <div className={cls.modal} style={{ width: width, height: height }}>
      <div className={cls.container}>{children}</div>
    </div>
  );
};
