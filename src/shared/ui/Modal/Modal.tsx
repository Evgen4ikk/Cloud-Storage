import { ReactNode } from 'react';
import cls from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen, onClose } = props;
  return (
    <div className={cls.modal}>
      <div className={cls.container}>{children}</div>
    </div>
  );
};
