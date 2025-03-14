// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { FormattedMessage } from 'react-intl';
import styles from './Header.module.css'; // Import CSS Module

function Header() {
  const { currentUser, logout } = useAuth();
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'fa' : 'en');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <FormattedMessage id="app.title" />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink}><FormattedMessage id="header.home" /></Link></li>
            <li><Link to="/lessons" className={styles.navLink}><FormattedMessage id="header.lessons" /></Link></li>
            {currentUser ? (
              <li>
                <button onClick={logout} className={styles.logoutButton}>
                  <FormattedMessage id="header.logout" />
                </button>
              </li>
            ) : (
              <li><Link to="/login" className={styles.navLink}><FormattedMessage id="header.login" /></Link></li>
            )}
            <li>
              <button onClick={toggleLocale} className={styles.localeButton}>
                {locale === 'en' ? 'فا' : 'En'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;