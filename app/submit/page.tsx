// pages/submit.js
'use client';
import './styles.css';
import React, { FormEvent } from 'react';

const SubmitForm = () => {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const data = {
      floor: formData.get('floor'),
      openSeats: formData.get('openSeats'),
      totalSeats: formData.get('totalSeats'),
    };
    console.log(data)
    const res = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(formData),
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
      alert('Data saved successfully!');
    } else {
      console.log(res)
      alert('Failed to save data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Floor:
        <input
          type="text"
          name="floor"
          // value={formData.floor}
          // onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Open Seats:
        <input
          type="number"
          name="openSeats"
          // value={formData.openSeats}
          // onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Total Seats:
        <input
          type="number"
          name="totalSeats"
          // value={formData.totalSeats}
          // onChange={handleChange}
          required
        />
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitForm;