// src/pages/WelcomePage.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSpring, animated } from 'react-spring'; // Import react-spring
import styles from './WelcomePage.module.css';

function WelcomePage() {
  const { currentUser } = useAuth();
  const { profile, loading: profileLoading } = useProfile(); // از useProfile استفاده می‌کنیم


  // انیمیشن ساده برای خوش‌آمدگویی
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  // اگه هنوز داریم اطلاعات پروفایل رو می‌خونیم، یه Spinner نشون می‌دیم
  if (profileLoading) {
    return <div>Loading...</div>; // می‌تونی از کامپوننت Spinner هم استفاده کنی
  }

  return (
    <animated.div style={fadeIn} className={styles.container}>
      <h1 className={styles.title}>
        <FormattedMessage id="welcomePage.greeting" values={{ name: profile?.name || currentUser.email }} />
      </h1>

      {profile ? (
        <>
          <p className={styles.message}>
             <FormattedMessage id="welcomePage.profileComplete" />
          </p>
          <p className={styles.info}>
            <FormattedMessage id="welcomePage.educationLevel" />: {profile.educationLevel}
            {profile.isStudent === 'yes' && profile.educationLevel === 'school' && (
              <>
                <br />
                <FormattedMessage id="welcomePage.school" />: {profile.school}
              </>
            )}
            {profile.isStudent === 'yes' && profile.educationLevel === 'university' && (
              <>
                <br />
                <FormattedMessage id="welcomePage.university" />: {profile.university}
                <br />
                <FormattedMessage id="welcomePage.city" />: {profile.city}
                <br />
                <FormattedMessage id="welcomePage.province" />: {profile.province}
                <br />
                <FormattedMessage id="welcomePage.fieldOfStudy" />: {profile.fieldOfStudy}
              </>
            )}
          </p>
          <Link to="/" className={styles.button}>
          <FormattedMessage id="welcomePage.goToDashboard" />
        </Link>
        </>
      ) : (
        <>
          <p className={styles.message}>
            <FormattedMessage id="welcomePage.completeProfile" />

          </p>

          <Link to="/profile/edit" className={styles.button}>
            <FormattedMessage id="welcomePage.completeProfileButton" />
          </Link>
        </>
      )}


    </animated.div>
  );
}

export default WelcomePage;