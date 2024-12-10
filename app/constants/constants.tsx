import { ExtraCosts } from "../types/types";

export const extraCosts: ExtraCosts = {
  front: [
    { cost: 50, types: ['Riddell Flex'] },
    {
      cost: 50,
      types: [
        'Riddell Speed',
        'Riddell Axiom',
        'Schutt XP/DNA',
        'Schutt F7',
        'Xenith X2E',
        'Xenith Shadow',
        'Light',
      ],
    },
    { cost: 35, types: ['Vicis Zero 2'] },
    { cost: 35, types: ['Vicis Trench'] },
  ],
  rear: [
    { cost: 50, types: ['Riddell Flex', 'Riddell Speed', 'Riddell Axiom', 'Light'] },
    { cost: 50, types: ['Schutt XP/DNA', 'Xenith X2E', 'Vicis Zero 2', 'Vicis Trench'] },
    { cost: 50, types: ['Schutt F7'] },
    { cost: 35, types: ['Xenith Shadow', 'Xenith Orbit'] },
  ],
};

export const baseballConstants = {
  moldCost: 50,
  pricePerLogo: 3.75,
  minLogos: 15,
  shipping: {
    base: 30, 
    additionalPer25: 5,
  },
};

export const hockeyConstants = {
  moldCost: 50,
  pricePerLogo: 3.75,
  minLogos: 15,
  shipping: {
    base: 30, 
    additionalPer25: 5,
  },
};


export const pricePerUnit = {
  frontBumper: 2.5,
  rearBumper: 3.5,
};
