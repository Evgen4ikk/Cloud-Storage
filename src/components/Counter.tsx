import { FC, useState } from 'react';
import cls from './Counter.module.scss';

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div className={cls.btn}>
      <h1>Count: {count}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};
