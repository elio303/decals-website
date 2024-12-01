export type QuantityType =
  | 'Riddell Flex'
  | 'Riddell Speed'
  | 'Riddell Axiom'
  | 'Schutt XP/DNA'
  | 'Schutt F7'
  | 'Xenith X2E'
  | 'Xenith Shadow'
  | 'Xenith Orbit'
  | 'Light'
  | 'Vicis Zero 2'
  | 'Vicis Trench';

export type ExtraCost = {
  cost: number;
  types: QuantityType[];
};
  
export type ExtraCosts = { [key in BumperPosition]: ExtraCost[] };

export type BumperPosition = 'front' | 'rear';

export type BumperType = 'Logo' | 'Text';

export interface FormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  frontBumperType: BumperType;
  rearBumperType: BumperType;
  frontQuantityTypes: { [key in QuantityType]: number };
  rearQuantityTypes: { [key in QuantityType]: number };
  frontBumperColor: string;
  rearBumperColor: string;
  textColor: string;
  outlineColor: string;
}
