'use client';
import React from 'react'
import styles from './Alternativa.module.css'
export default function Alternativa({ register, letter }) {
  return (
    <div className={`${styles.alternativa}`}>
      <label htmlFor={`alt${letter}_text`} className='basis-7' >
        {letter.toLowerCase()}&#41;
      </label>
      <input 
        type="text" 
        name={`alt${letter}_text`} 
        className={`txt_alternativa${letter.toUpperCase()} txt-field ${letter == "A" ? 'border-b-green-950 hover:border-b-green-700 focus:border-b-green-500' : 'border-b-red-950 hover:border-b-red-800 focus:border-b-red-500'}  `} 
        {...register(`alternativa${letter}`)}
        // value={alt !== undefined ? alt : ''} 
        // onChange={(e) => setAlt(e.target.value)} 
        placeholder={`Alternativa ${letter}`} 
      />
    </div>
  );
  
}
