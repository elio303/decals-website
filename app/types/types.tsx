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
export type Sport = 'baseball' | 'football';

export type IFormInput = IContactInput & IFootballInput & IBaseballInput;

export interface IContactInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface IBaseSportInput {
  sport: Sport,
  textColor: string;
  outlineColor: string;
}

export type IFootballInput = {
  frontBumperType: BumperType;
  rearBumperType: BumperType;
  frontQuantityTypes: { [key in QuantityType]: number };
  rearQuantityTypes: { [key in QuantityType]: number };
  frontBumperColor: string;
  rearBumperColor: string;
} & IBaseSportInput;

export type IBaseballInput = {
  bumperType: BumperType;
  bumperQuantity: number;
  bumperColor: string;
} & IBaseSportInput;