// src/pages/HomePage.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring'; // Import react-spring
import styles from './HomePage.module.css';
import Chatbot from '../components/Chatbot';
import StudyPlan from '../components/StudyPlan';

function HomePage() {
  // انیمیشن برای عنوان
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.slow, // از یه کانفیگ پیش‌فرض استفاده می‌کنیم
  });

  // انیمیشن برای توضیحات
  const descriptionAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500, // یه تاخیر 500 میلی‌ثانیه‌ای
    config: config.gentle,
  });

    // انیمیشن برای توضیحات
  const featureAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)'  },
    to: { opacity: 1,transform: 'translateX(0)' },
    delay: 500, // یه تاخیر 500 میلی‌ثانیه‌ای
    config: config.gentle,
  });

  return (
    <>
      <animated.div style={titleAnimation} className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <FormattedMessage id="app.welcome" />
          </h1>
          <animated.p style={descriptionAnimation} className={styles.description}>
            <FormattedMessage
              id="app.description"
              defaultMessage="Hooshjoo is a smart learning platform..."
            />
          </animated.p>
          <Link to="/login" className={styles.ctaButton}>
            <FormattedMessage id="homePage.getStarted" />
          </Link>
        </div>
      </animated.div>

      <animated.div style={featureAnimation} className={styles.featuresSection}>
          <div className={styles.container}>
              <h2>
                  <FormattedMessage id="homePage.featuresTitle"/>
              </h2>
              <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                      <img src="/images/chatbot.png" alt="Chatbot" className={styles.featureImage} /> {/* Add image */}
                      <h3><FormattedMessage id="homePage.feature1Title"/></h3>
                      <p><FormattedMessage id="homePage.feature1Description"/></p>
                  </div>
                  <div className={styles.featureItem}>
                      <img src="/images/content-generation.png" alt="Content Generation" className={styles.featureImage} /> {/* Add image */}
                      <h3><FormattedMessage id="homePage.feature2Title"/></h3>
                      <p><FormattedMessage id="homePage.feature2Description"/></p>
                  </div>
                    <div className={styles.featureItem}>
                      <img src="/images/study-plan.png" alt="Study Plan" className={styles.featureImage} /> {/* Add image */}
                      <h3><FormattedMessage id="homePage.feature3Title"/></h3>
                      <p><FormattedMessage id="homePage.feature3Description"/></p>
                  </div>
              </div>
          </div>
      </animated.div>

      <div className={styles.container}>
        <Chatbot />
        <StudyPlan />
      </div>
    </>
  );
}

export default HomePage;