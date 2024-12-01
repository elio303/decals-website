// context/GlobalStateContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  frontBumperType: string;
  rearBumperType: string;
  frontQuantityTypes: Record<string, number>;
  rearQuantityTypes: Record<string, number>;
  frontBumperColor: string;
  rearBumperColor: string;
  textColor: string;
  outlineColor: string;
}

interface GlobalState {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    frontBumperType: 'Text',
    rearBumperType: 'Text',
    frontQuantityTypes: {},
    rearQuantityTypes: {},
    frontBumperColor: '#FF0000',
    rearBumperColor: '#0000FF',
    textColor: '#FFFFFF',
    outlineColor: '#000000',
  });

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
