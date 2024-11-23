'use client'

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type QuantityType =
  | "Flex"
  | "Schutt"
  | "Vicis"
  | "Speed"
  | "Schutt 1/4-Turn"
  | "Xenith";

interface FormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  frontBumperType: "Logo" | "Text"; // Front style: Text or Logo
  rearBumperType: "Logo" | "Text"; // Rear style: Text or Logo
  frontQuantity: number;
  rearQuantity: number;
  frontQuantityTypes: { [key in QuantityType]: number }; // Quantity for each bumper type (Flex, Schutt, etc.) for the front
  rearQuantityTypes: { [key in QuantityType]: number }; // Quantity for each bumper type (Flex, Schutt, etc.) for the rear
  frontBumperColor: string;
  rearBumperColor: string;
  textColor: string;
  outlineColor: string;
}

export default function Customize() {
  const [formInput, setFormInput] = useState<FormInput>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    frontBumperType: "Text", // Default is Text
    rearBumperType: "Text",  // Default is Text
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

      {/* Customization Options */}
      <div className={styles.customizationContainer}>
        <div className={styles.card}>
          <h2>Front and Rear Bumper Style</h2>
          <div className={styles.formGroup}>
            <label htmlFor="frontBumperType">Front Style:</label>
            <select
              id="frontBumperType"
              name="frontBumperType"
              value={formInput.frontBumperType}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Text">Text</option>
              <option value="Logo">Logo</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rearBumperType">Rear Style:</label>
            <select
              id="rearBumperType"
              name="rearBumperType"
              value={formInput.rearBumperType}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Text">Text</option>
              <option value="Logo">Logo</option>
            </select>
          </div>
        </div>

        {/* Bumper Color Customization */}
        <div className={styles.card}>
          <h2>Color Customization</h2>
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

        {/* Preview */}
        <div className={styles.previewContainer}>
          <h2>Preview</h2>
          <div className={styles.card}>
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

        {/* Quantity Section for each Type */}
        <div className={styles.quantityContainer}>
          <h2>Quantity</h2>
          <div className={styles.card}>
            <div>
              <h3>Front Bumper Quantities</h3>
              {Object.keys(formInput.frontQuantityTypes).map((type) => (
                <div key={type} className={styles.quantityType}>
                  <label>{type}</label>
                  <input
                    type="number"
                    min="1"
                    value={formInput.frontQuantityTypes[type as QuantityType]}
                    onChange={handleInputChange}
                    name={`front-${type}`}
                    className={styles.input}
                  />
                </div>
              ))}
            </div>

            <div>
              <h3>Rear Bumper Quantities</h3>
              {Object.keys(formInput.rearQuantityTypes).map((type) => (
                <div key={type} className={styles.quantityType}>
                  <label>{type}</label>
                  <input
                    type="number"
                    min="1"
                    value={formInput.rearQuantityTypes[type as QuantityType]}
                    onChange={handleInputChange}
                    name={`rear-${type}`}
                    className={styles.input}
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

        {/* Contact Information */}
        <div className={styles.card}>
          <h2>Contact Information</h2>
          <div className={styles.formGroup}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formInput.firstName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formInput.lastName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formInput.phoneNumber}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {/* Total Estimate */}
      <div className={styles.estimateContainer}>
        <h3>Total Estimate: ${totalEstimate}</h3>
      </div>
    </div>
  );
}
