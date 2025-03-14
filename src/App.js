// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ProfileProvider } from './contexts/ProfileContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import CreateLessonPage from './pages/CreateLessonPage';
import WelcomePage from './pages/WelcomePage';
import Page from './components/page'; // Import the new Page component
import ProfileEditPage from './pages/ProfileEditPage'; // Import the new ProfileEditPage component
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocaleProvider>
          <ProfileProvider>
            <div className="app">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Page><HomePage /></Page>} />
                  <Route path="/login" element={<Page><LoginPage /></Page>} />
                  <Route path="/lessons" element={<Page><LessonsPage /></Page>} />
                  <Route path="/lessons/:id" element={<Page><LessonDetailPage /></Page>} />
                  <Route path="/create-lesson" element={<Page><CreateLessonPage /></Page>} />
                  <Route path="/welcome" element={<Page><WelcomePage /></Page>} />
                  <Route path="/profile/edit" element={<Page><ProfileEditPage /></Page>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ProfileProvider>
        </LocaleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;