// src/components/StudyPlan.js
import React from 'react';
import styles from './StudyPlan.module.css';

function StudyPlan() {
  return (
    <div className={styles.studyPlanContainer}>
      <h2>برنامه مطالعه</h2>
      <p>اینجا برنامه مطالعه شما نمایش داده می‌شود.</p>
      {/* بعداً اینجا کامپوننت‌های مربوط به نمایش برنامه مطالعه رو اضافه می‌کنیم */}
    </div>
  );
}

export default StudyPlan;