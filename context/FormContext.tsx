'use client'

import { createContext, useContext, ReactNode, useState } from 'react';
import { IFormInput } from '@/app/types/types';

const FormContext = createContext<{
  formInput: IFormInput;
  setFormInput: React.Dispatch<React.SetStateAction<IFormInput>>;
} | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formInput, setFormInput] = useState<IFormInput>({
    sport: 'baseball',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    bumperQuantity: 15,
    bumperType: 'Text',
    bumperColor: '#FF0000',
    frontBumperType: 'Text',
    rearBumperType: 'Text',
    frontQuantityTypes: {
      'Riddell Flex': 0,
      'Riddell Speed': 0,
      'Riddell Axiom': 0,
      'Schutt XP/DNA': 0,
      'Schutt F7': 0,
      'Xenith X2E': 0,
      'Xenith Shadow': 0,
      'Xenith Orbit': 0,
      'Light': 0,
      'Vicis Zero 2': 0,
      'Vicis Trench': 0,
    },
    rearQuantityTypes: {
      'Riddell Flex': 0,
      'Riddell Speed': 0,
      'Riddell Axiom': 0,
      'Schutt XP/DNA': 0,
      'Schutt F7': 0,
      'Xenith X2E': 0,
      'Xenith Shadow': 0,
      'Xenith Orbit': 0,
      'Light': 0,
      'Vicis Zero 2': 0,
      'Vicis Trench': 0,
    },
    frontBumperColor: '#FF0000',
    rearBumperColor: '#0000FF',
    textColor: '#FFFFFF',
    outlineColor: '#000000',
  });

  return (
    <FormContext.Provider value={{ formInput, setFormInput }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
};
