// src/pages/CreateLessonPage.js
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createLesson } from '../services/lessonService';
import { useNavigate } from 'react-router-dom';
import styles from './CreateLessonPage.module.css';
import MetaTags from '../components/MetaTags'; // Import MetaTags

function CreateLessonPage() {
  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddFlashcard = () => {
    if (front.trim() !== '' && back.trim() !== '') {
      setFlashcards([...flashcards, { front, back }]);
      setFront('');
      setBack('');
    } else {
      setError('Flashcard front and back cannot be empty.');
    }
  };

  const handleRemoveFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!lessonName.trim()) {
      setError('Lesson name is required.');
      return;
    }
    if (!lessonDescription.trim()) {
      setError('Lesson description is required.');
      return;
    }
    if (flashcards.length === 0) {
      setError('Please add at least one flashcard.');
      return;
    }

    try {
      const newLesson = {
        name: lessonName,
        description: lessonDescription,
        flashcards: flashcards,
      };
      const lessonId = await createLesson(newLesson);
      navigate(`/lessons/${lessonId}`);
    } catch (error) {
      console.error("Error creating lesson:", error);
      setError(error.message);
    }
  };

  return (
    <> {/* Use a fragment here */}
      <MetaTags title="ایجاد درس جدید" />
      <div className={styles.container}>
        <h2 className={styles.title}><FormattedMessage id="createLesson.title" /></h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="lessonName"><FormattedMessage id="createLesson.name" />:</label>
            <input
              type="text"
              id="lessonName"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lessonDescription"><FormattedMessage id="createLesson.description" />:</label>
            <textarea
              id="lessonDescription"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.inputGroup}>
            <label><FormattedMessage id="flashcard.front" />:</label>
            <input
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label><FormattedMessage id="flashcard.back" />:</label>
            <input
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="button" onClick={handleAddFlashcard} className={styles.addButton}>
            Add Flashcard
          </button>

          <div className={styles.flashcardsList}>
            {flashcards.map((flashcard, index) => (
              <div key={index} className={styles.flashcardItem}>
                <span>Front: {flashcard.front}, Back: {flashcard.back}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFlashcard(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={!lessonName}>
            <FormattedMessage id="createLesson.create" />
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateLessonPage;