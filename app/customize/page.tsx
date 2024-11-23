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
  frontBumperType: "Logo" | "Text";
  rearBumperType: "Logo" | "Text";
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
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        frontBumperType: "Text",
        rearBumperType: "Text",
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
        frontBumperColor: "#FF0000",
        rearBumperColor: "#0000FF",
        textColor: "#FFFFFF",
        outlineColor: "#000000",
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
          <h2>Front and Rear Bumper Type</h2>
          <div className={styles.formGroup}>
            <label htmlFor="frontBumperType">Front Bumper Type:</label>
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
            <label htmlFor="rearBumperType">Rear Bumper Type:</label>
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

        {/* Preview Section */}
        <div className={styles.previewContainer}>
          <h2>Preview</h2>
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
        </div>

        {/* Quantity Section */}
        <div className={styles.quantityContainer}>
          <h2>Quantity</h2>
          <div className={styles.card}>
            <div>
              <label>Front Bumper Quantity</label>
              <input
                type="number"
                min="1"
                value={formInput.frontQuantity}
                onChange={handleInputChange}
                name="frontQuantity"
                className={styles.input}
              />
            </div>

            <div>
              <label>Rear Bumper Quantity</label>
              <input
                type="number"
                min="1"
                value={formInput.rearQuantity}
                onChange={handleInputChange}
                name="rearQuantity"
                className={styles.input}
              />
            </div>

            <div>
              <h3>Quantity Types</h3>
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
          </div>
        </div>

        {/* Total Estimate */}
        <div className={styles.total}>
          <h3>Total Estimate: ${totalEstimate}</h3>
        </div>

        {/* Contact Form Section */}
<div className={styles.card}>
  <h2>Contact Information</h2>
  <div className={styles.formGroup}>
    <label htmlFor="firstName">First Name:</label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      value={formInput.firstName}
      onChange={handleInputChange}
      className={styles.input}
    />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="lastName">Last Name:</label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      value={formInput.lastName}
      onChange={handleInputChange}
      className={styles.input}
    />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="phoneNumber">Phone Number:</label>
    <input
      type="tel"
      id="phoneNumber"
      name="phoneNumber"
      value={formInput.phoneNumber}
      onChange={handleInputChange}
      className={styles.input}
    />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="email">Email Address:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formInput.email}
      onChange={handleInputChange}
      className={styles.input}
    />
  </div>
</div>


        {/* Submit Button */}
        <div className={styles.submit}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
