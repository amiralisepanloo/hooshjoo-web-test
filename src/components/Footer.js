// src/components/Footer.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          <FormattedMessage id="footer.contact" />: contact@hooshjoo.com {/* Replace with your actual contact info */}
        </p>
        <p>
          <FormattedMessage id="footer.about" />
        </p>
        {/* Add more links/info here (e.g., social media, privacy policy, etc.) */}
      </div>
    </footer>
  );
}

export default Footer;