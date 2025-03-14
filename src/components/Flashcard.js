// src/components/Flashcard.js
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './Flashcard.module.css'; // Import CSS Module

function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleClick}>
      <div className={styles.front}>
        {/* Use FormattedMessage for the front content */}
        <FormattedMessage id="flashcard.front" />: {front}
      </div>
      <div className={styles.back}>
        {/* Use FormattedMessage for the back content */}
        <FormattedMessage id="flashcard.back" />: {back}
      </div>
    </div>
  );
}

export default Flashcard;