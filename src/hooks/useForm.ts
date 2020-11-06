import { useState } from "react";

export const useForm = <T>(callback: () => void, initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues
  };
};
