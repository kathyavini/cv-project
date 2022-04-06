import React, { useState, useEffect } from 'react';

export default function InputField({ placeholder, legend, name, handleChange, value }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      ></input>
    </fieldset>
  );
}