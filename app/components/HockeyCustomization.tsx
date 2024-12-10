'use client';

import styles from '@/app/components/HockeyCustomization.module.css';
import ColorInput from '@/app/components/ColorInput';
import BumperPreview from '@/app/components/BumperPreview';
import SimpleQuantitySection from '@/app/components/SimpleQuantitySection';
import PricingSection from '@/app/components/PricingSection';
import { IFormInput } from '@/app/types/types';
import {
  calculateBasePriceHockey,
  calculateShippingCostHockey,
  calculateMoldCostHockey,
} from '@/app/utils/calculate';
import { useFormContext } from '@/context/FormContext';
import { hockeyConstants } from '@/app/constants/constants';

const HockeyCustomization = () => {
  const { formInput, setFormInput } = useFormContext();

  const bumperQuantity = formInput.bumperQuantity || 0;
  const baseSubTotal = calculateBasePriceHockey(bumperQuantity);
  const totalShippingCost = calculateShippingCostHockey(bumperQuantity);
  const moldSubTotal = calculateMoldCostHockey();

  const totalEstimate = baseSubTotal + moldSubTotal + totalShippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'bumperQuantity') {
      setFormInput((prevState: IFormInput) => ({
        ...prevState,
        bumperQuantity: parseInt(value, 10) || 0,
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
      <h1 className={styles.title}>Customize Your Hockey Bumper</h1>
   
      {/* Bumper Type Selection */}
      <div className={styles.card}>
        <div className={styles.inputRow}>
          <label htmlFor="bumperType">Bumper Type:</label>
          <select
            id="bumperType"
            name="bumperType"
            value={formInput.bumperType}
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
        <ColorInput id="bumperColor" label="Bumper Color" value={formInput.bumperColor} onChange={handleInputChange} />
        <ColorInput id="textColor" label="Text Color" value={formInput.textColor} onChange={handleInputChange} />
        <ColorInput id="outlineColor" label="Outline Color" value={formInput.outlineColor} onChange={handleInputChange} />
      </div>

      {/* Preview Section */}
      <div className={styles.card}>
        <BumperPreview bumperType={formInput.frontBumperType} bumperColor={formInput.bumperColor} textColor={formInput.textColor} outlineColor={formInput.outlineColor} label="Front" />
      </div>

      {/* Quantity Sections */}
      <SimpleQuantitySection title="Bumper Quantity" quantity={formInput.bumperQuantity} handleInputChange={handleInputChange} name='bumperQuantity' min={hockeyConstants.minLogos} />

      {/* Pricing Sections */}
      <PricingSection title="Base Price" subTotal={baseSubTotal} />
      <PricingSection title="Mold Cost" subTotal={moldSubTotal} />
      <PricingSection title="Shipping Cost" subTotal={totalShippingCost} />

      {/* Total Section */}
      <PricingSection title="Total Estimate" subTotal={totalEstimate} />
    </div>
  );
}

export default HockeyCustomization;
