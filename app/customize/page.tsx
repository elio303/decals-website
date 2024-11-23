'use client'

import { useState } from "react";
import styles from "./page.module.css";

type QuantityType =
  | "Flex"
  | "Schutt"
  | "Vicis"
  | "Speed"
  | "Schutt 1/4-Turn"
  | "Xenith";

interface FormInput {
  frontFont: string;
  rearFont: string;
  frontQuantity: number;
  rearQuantity: number;
  frontQuantityTypes: { [key in QuantityType]: number };
  rearQuantityTypes: { [key in QuantityType]: number };
  frontBumperColor: string;
  rearBumperColor: string;
  textColor: string;
  outlineColor: string;
}

export default function Customize() {
  const [formInput, setFormInput] = useState<FormInput>({
    frontFont: "Arial",
    rearFont: "Verdana",
    frontQuantity: 1,
    rearQuantity: 1,
    frontQuantityTypes: {
      Flex: 1,
      Schutt: 1,
      Vicis: 1,
      Speed: 1,
      "Schutt 1/4-Turn": 1,
      Xenith: 1,
    },
    rearQuantityTypes: {
      Flex: 1,
      Schutt: 1,
      Vicis: 1,
      Speed: 1,
      "Schutt 1/4-Turn": 1,
      Xenith: 1,
    },
    frontBumperColor: "#FF0000", // Example color (red)
    rearBumperColor: "#0000FF",  // Example color (blue)
    textColor: "#FFFFFF",        // White text by default
    outlineColor: "#000000",     // Black outline by default
  });

  // Static price values for simplicity
  const pricePerUnit = {
    frontBumper: 50, // Example price per unit for front bumper
    rearBumper: 40,  // Example price per unit for rear bumper
  };

  // Calculate price based on quantities
  const calculatePrice = (quantity: number, type: "front" | "rear") => {
    const price = type === "front" ? pricePerUnit.frontBumper : pricePerUnit.rearBumper;
    return quantity * price;
  };

  const frontPrice = calculatePrice(formInput.frontQuantity, "front");
  const rearPrice = calculatePrice(formInput.rearQuantity, "rear");
  const totalEstimate = frontPrice + rearPrice;

  // Update form state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [type, bumper] = name.split("-");

    // Handle front and rear bumper quantity type changes
    if (type === "front" || type === "rear") {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setFormInput((prevState) => {
          if (bumper === "Quantity") {
            return {
              ...prevState,
              [name]: parsedValue,
            };
          } else {
            return {
              ...prevState,
              [`${type}QuantityTypes`]: {
                ...prevState[`${type}QuantityTypes`],
                [bumper as QuantityType]: parsedValue,
              },
            };
          }
        });
      }
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

      {/* Form Container */}
      <div className={styles.formContainer}>
        <h2>Customize Font & Color</h2>
        <form className={styles.form}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label htmlFor="frontFont">Select Front Bumper Font:</label>
              <select
                id="frontFont"
                name="frontFont"
                value={formInput.frontFont}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rearFont">Select Rear Bumper Font:</label>
              <select
                id="rearFont"
                name="rearFont"
                value={formInput.rearFont}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            {/* Color Customization */}
            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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
        </form>
      </div>

      {/* Preview Section */}
      <div className={styles.previewContainer}>
        <h2>Preview</h2>
        <div className={styles.card}>
          <div
            className={styles.bumper}
            style={{
              backgroundColor: formInput.frontBumperColor,
              color: formInput.textColor,
              border: `2px solid ${formInput.outlineColor}`,
              fontFamily: formInput.frontFont,
            }}
          >
            Front Bumper
          </div>
          <div
            className={styles.bumper}
            style={{
              backgroundColor: formInput.rearBumperColor,
              color: formInput.textColor,
              border: `2px solid ${formInput.outlineColor}`,
              fontFamily: formInput.rearFont,
            }}
          >
            Rear Bumper
          </div>
        </div>
      </div>

      {/* Quantity Inputs for Each Type */}
      <div className={styles.quantityForm}>
        <h2>Quantity per Type</h2>
        <div className={styles.card}>
          <div className={styles.quantityContainer}>
            <h3>Front Bumper Quantities</h3>
            {Object.keys(formInput.frontQuantityTypes).map((type) => (
              <div key={type} className={styles.quantityItem}>
                <label htmlFor={`front-${type}-Quantity`}>
                  {type} Quantity:
                </label>
                <input
                  type="number"
                  id={`front-${type}-Quantity`}
                  name={`front-${type}`}
                  value={formInput.frontQuantityTypes[type as QuantityType]}
                  onChange={handleInputChange}
                  className={styles.input}
                  min="1"
                />
              </div>
            ))}
          </div>

          <div className={styles.quantityContainer}>
            <h3>Rear Bumper Quantities</h3>
            {Object.keys(formInput.rearQuantityTypes).map((type) => (
              <div key={type} className={styles.quantityItem}>
                <label htmlFor={`rear-${type}-Quantity`}>
                  {type} Quantity:
                </label>
                <input
                  type="number"
                  id={`rear-${type}-Quantity`}
                  name={`rear-${type}`}
                  value={formInput.rearQuantityTypes[type as QuantityType]}
                  onChange={handleInputChange}
                  className={styles.input}
                  min="1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className={styles.priceSummary}>
        <h2>Price Summary</h2>
        <div className={styles.card}>
          <div>Front Bumper: ${frontPrice}</div>
          <div>Rear Bumper: ${rearPrice}</div>
          <div>Total Estimated Price: ${totalEstimate}</div>
        </div>
      </div>
    </div>
  );
}
