import React from 'react';
import styles from './Blobs.module.css';

const Blobs = () => {
  return (
    <div className={styles.blobWrap}>
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>
    </div>
  );
};

export default Blobs;
