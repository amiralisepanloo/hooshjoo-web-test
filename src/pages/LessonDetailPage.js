// src/pages/LessonDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../services/lessonService';
import Flashcard from '../components/Flashcard';
import { Helmet } from 'react-helmet';
import ExamCard from '../components/ExamCard';
import Spinner from '../components/Spinner';
import styles from './LessonDetailPage.module.css';

function LessonDetailPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await getLessonById(id);
        if (lessonData) {
          setLesson(lessonData);
        } else {
          navigate('/lessons');
          return;
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Helmet>
        <title>{lesson.name ? `${lesson.name} - هوشجو` : 'هوشجو'}</title>
        <meta property="og:title" content={lesson.name || 'هوشجو'} />
        <meta property="og:description" content={lesson.description || 'اپلیکیشن هوشجو به شما کمک می‌کند تا درس‌های خود را به روشی هوشمندانه یاد بگیرید.'} />
        <meta property="og:image" content={lesson.image || '/logo512.png'} /> {/* Use lesson.image if available, otherwise fallback to logo */}
        <meta property="og:url" content={`https://hooshjoo-test.web.app/lessons/${id}`} /> {/* Replace with your REAL app URL */}
        <meta property="og:type" content="website" /> {/* Changed to website */}
        <meta property="og:locale" content="fa_IR" />
        <meta name="twitter:card" content="summary_large_image"/>
      </Helmet>

      <div className={styles.container}>
        <h1 className={styles.title}>{lesson.name}</h1>
        <p className={styles.description}>{lesson.description}</p>

        <h2 className={styles.sectionTitle}>Flashcards</h2>
        <div className={styles.flashcardsContainer}>
          {lesson.flashcards && lesson.flashcards.length > 0 ? (
            lesson.flashcards.map((flashcard, index) => (
              <Flashcard key={index} front={flashcard.front} back={flashcard.back} />
            ))
          ) : (
            <p>No flashcards for this lesson yet.</p>
          )}
        </div>

        <h2 className={styles.sectionTitle}>Exams</h2>
        <div className={styles.examsContainer}>
          {lesson.exams && lesson.exams.length > 0 ? (
            lesson.exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))
          ) : (
            <p>No exams for this lesson yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LessonDetailPage;