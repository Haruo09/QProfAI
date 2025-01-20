'use client';

import React from 'react';
import styles from './SelectJS.module.css';

export default function SelectJS({ name, id, onChange, options, optPropname, condition=(true) }) {

  return (
    <select name={name} id={id} className={styles.select} onChange={onChange}>
      <option value="--">--</option>
      {(condition) && (options.map((v, i) => (
        <option key={i} data-id={i} value={v[optPropname]}>{v[optPropname]}</option>
      )))}
    </select>
  );
}