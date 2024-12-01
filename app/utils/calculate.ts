import { pricePerUnit, extraCosts } from '@/app/constants/constants';
import { QuantityType , BumperPosition } from '@/app/types/types';

// Calculate base price
export const calculateBasePrice = (quantityTypes: { [key in QuantityType]: number }, position: BumperPosition) => {
  const unitPrice = position === 'front' ? pricePerUnit.frontBumper : pricePerUnit.rearBumper;
  const totalQuantity = Object.values(quantityTypes).reduce((sum, qty) => sum + qty, 0);
  return totalQuantity * unitPrice;
};

// Calculate mold cost
export const calculateMoldCost = (quantityTypes: { [key in QuantityType]: number }, position: BumperPosition) => {
  return extraCosts[position].reduce((acc, { cost, types }) => {
    const applicable = types.some((type) => quantityTypes[type] > 0);
    return applicable ? acc + cost : acc;
  }, 0);
};

// Calculate shipping cost
export const calculateShippingCost = (quantityTypes: { [key in QuantityType]: number }, position: BumperPosition) => {
  if (position === 'front' && Object.values(quantityTypes).some((qty) => qty > 0)) {
    return 35; // Front shipping cost for at least one front
  }
  if (position === 'rear' && Object.values(quantityTypes).some((qty) => qty > 0)) {
    return 50; // Rear shipping cost for at least one rear
  }
  return 0;
};
