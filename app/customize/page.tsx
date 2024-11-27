'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import {
  QuantityType,
} from '../constants/constants';
import { calculateBasePrice, calculateMoldCost, calculateShippingCost } from '../utils/calculate'; // Import the calculation functions

interface FormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  frontBumperType: 'Logo' | 'Text';
  rearBumperType: 'Logo' | 'Text';
  frontQuantityTypes: { [key in QuantityType]: number };
  rearQuantityTypes: { [key in QuantityType]: number };
  frontBumperColor: string;
  rearBumperColor: string;
  textColor: string;
  outlineColor: string;
}

export default function Customize() {
  const [formInput, setFormInput] = useState<FormInput>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
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

      setFormInput((prevState) => ({
        ...prevState,
        [`${position}QuantityTypes`]: {
          ...(prevState[`${position}QuantityTypes`] as { [key in QuantityType]: number }),
          [type]: parseInt(value, 10) || 0,
        },
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customize Your Bumper</h1>

      <form>
        {/* Color Customization Section */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Color Customization</h2>
          <div className={styles.inputRow}>
            <label htmlFor="frontBumperColor">Front Bumper Color:</label>
            <input
              type="color"
              id="frontBumperColor"
              name="frontBumperColor"
              value={formInput.frontBumperColor}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="rearBumperColor">Rear Bumper Color:</label>
            <input
              type="color"
              id="rearBumperColor"
              name="rearBumperColor"
              value={formInput.rearBumperColor}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="textColor">Text Color:</label>
            <input
              type="color"
              id="textColor"
              name="textColor"
              value={formInput.textColor}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="outlineColor">Outline Color:</label>
            <input
              type="color"
              id="outlineColor"
              name="outlineColor"
              value={formInput.outlineColor}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className={styles.card}>
          {/* Front Bumper Preview */}
          <div>
            <h3>Front Bumper Preview</h3>
            <div
              className={styles.bumper}
              style={{
                backgroundColor: formInput.frontBumperColor,
                color: formInput.textColor,
                border: `2px solid ${formInput.outlineColor}`,
              }}
            >
              {formInput.frontBumperType === "Logo" ? (
                <Image
                  src="/logo.jpg"
                  alt="Front Logo"
                  width={200}
                  height={100}
                  className={styles.logo}
                />
              ) : (
                "Front Bumper Text"
              )}
            </div>
          </div>

          {/* Rear Bumper Preview */}
          <div>
            <h3>Rear Bumper Preview</h3>
            <div
              className={styles.bumper}
              style={{
                backgroundColor: formInput.rearBumperColor,
                color: formInput.textColor,
                border: `2px solid ${formInput.outlineColor}`,
              }}
            >
              {formInput.rearBumperType === "Logo" ? (
                <Image
                  src="/logo.jpg"
                  alt="Rear Logo"
                  width={200}
                  height={100}
                  className={styles.logo}
                />
              ) : (
                "Rear Bumper Text"
              )}
            </div>
          </div>
        </div>

        {/* Quantity and Pricing Sections */}
        {/* Front Bumper Quantity Section */}
        <div className={styles.card}>
          <h3>Front Bumper Quantities</h3>
          <div className={styles.quantitySection}>
            {Object.keys(formInput.frontQuantityTypes).map((type) => (
              <div key={`front-${type}`} className={styles.inputRow}>
                <label htmlFor={`front-${type}`}>{type}</label>
                <input
                  type="number"
                  id={`front-${type}`}
                  name={`front-${type}`}
                  value={formInput.frontQuantityTypes[type as QuantityType]}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.input}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rear Bumper Quantity Section */}
        <div className={styles.card}>
          <h3>Rear Bumper Quantities</h3>
          <div className={styles.quantitySection}>
            {Object.keys(formInput.rearQuantityTypes).map((type) => (
              <div key={`rear-${type}`} className={styles.inputRow}>
                <label htmlFor={`rear-${type}`}>{type}</label>
                <input
                  type="number"
                  id={`rear-${type}`}
                  name={`rear-${type}`}
                  value={formInput.rearQuantityTypes[type as QuantityType]}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.input}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Sections */}
        {/* Base Price Section */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Base Price</h2>
          <p>Front Bumper Base Price: ${frontBasePrice.toFixed(2)}</p>
          <p>Rear Bumper Base Price: ${rearBasePrice.toFixed(2)}</p>
          <h3>Base Sub-total: ${baseSubTotal.toFixed(2)}</h3>
        </div>

        {/* Mold Cost Section */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Mold Cost</h2>
          <p>Front Bumper Mold Cost: ${frontMoldCost.toFixed(2)}</p>
          <p>Rear Bumper Mold Cost: ${rearMoldCost.toFixed(2)}</p>
          <h3>Mold Sub-total: ${moldSubTotal.toFixed(2)}</h3>
        </div>

        {/* Shipping Section */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Shipping Cost</h2>
          <p>Front Bumper Shipping Cost: ${frontShippingCost.toFixed(2)}</p>
          <p>Rear Bumper Shipping Cost: ${rearShippingCost.toFixed(2)}</p>
        </div>

        {/* Total Section */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Total Estimate</h2>
          <h3>Total Estimate (Base + Mold + Shipping): ${totalEstimate.toFixed(2)}</h3>
        </div>
      </form>
    </div>
  );
}
