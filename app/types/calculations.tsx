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
