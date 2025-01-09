'use client';
import { createContext, useContext } from 'react';

export const defectValue = {
  name: '',
  setName: (name: string) => (defectValue.name = name),
};

export const UserNameContext = createContext(defectValue);

export const useUserContext = () => {
  const user = useContext(UserNameContext);
  if (user === undefined) {
    throw new Error('Error');
  }

  return user;
};
