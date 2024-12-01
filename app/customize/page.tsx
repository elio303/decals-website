'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/customize/page.module.css';
import ColorInput from '@/app/components/ColorInput';
import BumperPreview from '@/app/components/BumperPreview';
import QuantitySection from '@/app/components/QuantitySection';
import PricingSection from '@/app/components/PricingSection';
import { QuantityType } from '@/app/types/types';
import { calculateBasePrice, calculateMoldCost, calculateShippingCost } from '@/app/utils/calculate';
import { useFormContext } from '@/context/FormContext';
import { FormInput } from '@/app/types/types';

const Customize = () => {
  const router = useRouter();
  const { formInput, setFormInput } = useFormContext();

  const frontBasePrice = calculateBasePrice(formInput.frontQuantityTypes, 'front');
  const rearBasePrice = calculateBasePrice(formInput.rearQuantityTypes, 'rear');
  const frontMoldCost = calculateMoldCost(formInput.frontQuantityTypes, 'front');
  const rearMoldCost = calculateMoldCost(formInput.rearQuantityTypes, 'rear');
  const frontShippingCost = calculateShippingCost(formInput.frontQuantityTypes, 'front');
  const rearShippingCost = calculateShippingCost(formInput.rearQuantityTypes, 'rear');

  const baseSubTotal = frontBasePrice + rearBasePrice;
  const moldSubTotal = frontMoldCost + rearMoldCost;
  const totalShippingCost = frontShippingCost + rearShippingCost;
  const totalEstimate = baseSubTotal + moldSubTotal + totalShippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('front-') || name.startsWith('rear-')) {
      const [position, type] = name.split('-') as ['front' | 'rear', QuantityType];

      setFormInput((prevState: FormInput) => ({
        ...prevState,
        [`${position}QuantityTypes`]: {
          ...(prevState[`${position}QuantityTypes`] as { [key in QuantityType]: number }),
          [type]: parseInt(value, 10) || 0,
        },
      }));
    } else {
      setFormInput((prevState: FormInput) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const navigateToContact = () => {
    console.log(formInput);
    router.push('/contact');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customize Your Bumper</h1>

      {/* Bumper Type Selection */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Bumper Type</h2>
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
      <PricingSection title="Base Price" frontCost={frontBasePrice} rearCost={rearBasePrice} subTotal={baseSubTotal} label="Base" />
      <PricingSection title="Mold Cost" frontCost={frontMoldCost} rearCost={rearMoldCost} subTotal={moldSubTotal} label="Mold" />
      <PricingSection title="Shipping Cost" frontCost={frontShippingCost} rearCost={rearShippingCost} subTotal={totalShippingCost} label="Shipping" />

      {/* Total Section */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Total Estimate</h2>
        <h3>Total Estimate (Base + Mold + Shipping): ${totalEstimate.toFixed(2)}</h3>
      </div>

      {/* Navigation Button */}
      <button type="button" onClick={navigateToContact} className={styles.button}>
        Next
      </button>
    </div>
  );
}

export default Customize;
