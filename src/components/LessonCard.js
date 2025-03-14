// src/components/LessonCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styles from './LessonCard.module.css'; // Import CSS Module

function LessonCard({ lesson }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{lesson.name}</h3>
      <p className={styles.description}>{lesson.description}</p>
      <Link to={`/lessons/${lesson.id}`} className={styles.link}>
        <FormattedMessage id="lessonCard.details" />
      </Link>
    </div>
  );
}

export default LessonCard;