// src/components/ExamCard.js

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './ExamCard.module.css';

function ExamCard({ exam }) {

  const handleStartExam = () => {
    // Implement logic to start the exam (e.g., navigate to an exam page)
    console.log("Starting exam:", exam.id);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{exam.name}</h3>
      <p className={styles.description}>{exam.description}</p>
      <button onClick={handleStartExam} className={styles.startButton}>
        <FormattedMessage id="examCard.start" />
      </button>
    </div>
  );
}

export default ExamCard;