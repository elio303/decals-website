'use client';

import styles from '@/app/components/FootballCustomization.module.css';
import ColorInput from '@/app/components/ColorInput';
import BumperPreview from '@/app/components/BumperPreview';
import QuantitySection from '@/app/components/QuantitySection';
import PricingSection from '@/app/components/PricingSection';
import { IFormInput, QuantityType } from '@/app/types/types';
import {
  calculateBasePrice,
  calculateMoldCost,
  calculateShippingCost,
} from '@/app/utils/calculate';
import { useFormContext } from '@/context/FormContext';

const FootballCustomization = () => {
  const { formInput, setFormInput } = useFormContext();

  // Calculations
  const frontBasePrice = calculateBasePrice(formInput.frontQuantityTypes, 'front');
  const rearBasePrice = calculateBasePrice(formInput.rearQuantityTypes, 'rear');
  const frontMoldCost = calculateMoldCost(formInput.frontQuantityTypes, 'front');
  const rearMoldCost = calculateMoldCost(formInput.rearQuantityTypes, 'rear');
  const frontShippingCost = calculateShippingCost(formInput.frontQuantityTypes, 'front');
  const rearShippingCost = calculateShippingCost(formInput.rearQuantityTypes, 'rear');

  // Totals
  const baseSubTotal = frontBasePrice + rearBasePrice;

  const moldSubTotal = frontMoldCost + rearMoldCost;

  const totalShippingCost = frontShippingCost + rearShippingCost;

  const totalEstimate = baseSubTotal + moldSubTotal + totalShippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('front-') || name.startsWith('rear-')) {
      const [position, type] = name.split('-') as ['front' | 'rear', QuantityType];

      setFormInput((prevState: IFormInput) => ({
        ...prevState,
        [`${position}QuantityTypes`]: {
          ...(prevState[`${position}QuantityTypes`] as { [key in QuantityType]: number }),
          [type]: parseInt(value, 10) || 0,
        },
      }));
    } else {
      setFormInput((prevState: IFormInput) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Customize Your Football Bumper</h1>
    
      {/* Bumper Type Selection */}
      <div className={styles.card}>
        <div className={styles.inputRow}>
          <label htmlFor="frontBumperType">Front Bumper Type:</label>
          <select
            id="frontBumperType"
            name="frontBumperType"
            value={formInput.frontBumperType}
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="Text">Text</option>
            <option value="Logo">Logo</option>
          </select>
        </div>

        <div className={styles.inputRow}>
          <label htmlFor="rearBumperType">Rear Bumper Type:</label>
          <select
            id="rearBumperType"
            name="rearBumperType"
            value={formInput.rearBumperType}
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="Text">Text</option>
            <option value="Logo">Logo</option>
          </select>
        </div>
      </div>

      {/* Color Customization Section */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Color Customization</h2>
        <ColorInput id="frontBumperColor" label="Front Bumper Color" value={formInput.frontBumperColor} onChange={handleInputChange} />
        <ColorInput id="rearBumperColor" label="Rear Bumper Color" value={formInput.rearBumperColor} onChange={handleInputChange} />
        <ColorInput id="textColor" label="Text Color" value={formInput.textColor} onChange={handleInputChange} />
        <ColorInput id="outlineColor" label="Outline Color" value={formInput.outlineColor} onChange={handleInputChange} />
      </div>

      {/* Preview Section */}
      <div className={styles.card}>
        <BumperPreview bumperType={formInput.frontBumperType} bumperColor={formInput.frontBumperColor} textColor={formInput.textColor} outlineColor={formInput.outlineColor} label="Front" />
        <BumperPreview bumperType={formInput.rearBumperType} bumperColor={formInput.rearBumperColor} textColor={formInput.textColor} outlineColor={formInput.outlineColor} label="Rear" />
      </div>

      {/* Quantity Sections */}
      <QuantitySection title="Front Bumper Quantities" quantityTypes={formInput.frontQuantityTypes} handleInputChange={handleInputChange} prefix="front" />
      <QuantitySection title="Rear Bumper Quantities" quantityTypes={formInput.rearQuantityTypes} handleInputChange={handleInputChange} prefix="rear" />

      {/* Pricing Sections */}
      <PricingSection title="Base Price" subTotal={baseSubTotal} />
      <PricingSection title="Mold Cost" subTotal={moldSubTotal} />
      <PricingSection title="Shipping Cost" subTotal={totalShippingCost} />

      {/* Total Section */}
      <PricingSection title="Total Estimate" subTotal={totalEstimate} />
    </div>
  );
}

export default FootballCustomization;
