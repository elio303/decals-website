// app/contact/page.tsx
'use client';

import { useGlobalState } from '../../context/GlobalStateContext';

export default function ContactForm() {
  const { formData, setFormData } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, dataset } = e.target;

    setFormData((prev) => {
        // Check if it's one of the dynamic quantity types
        if (name === 'frontQuantityTypes' || name === 'rearQuantityTypes') {
          const dynamicKey = dataset.key || ''; 
          return {
            ...prev,
            [name]: {
              ...prev[name as 'frontQuantityTypes' | 'rearQuantityTypes'],
              [dynamicKey]: Number(value),
            },
          };
        }
    
        // For all other fields
        return {
          ...prev,
          [name]: value,
        };
      });
  };

  return (
    <form>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <select
        name="frontBumperType"
        value={formData.frontBumperType}
        onChange={handleChange}
      >
        <option value="Text">Text</option>
        <option value="Logo">Logo</option>
      </select>
      <input
        type="color"
        name="frontBumperColor"
        value={formData.frontBumperColor}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
