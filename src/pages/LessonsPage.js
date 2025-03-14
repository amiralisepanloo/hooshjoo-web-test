// src/pages/LessonsPage.js

import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { getLessons } from '../services/lessonService';
import LessonCard from '../components/LessonCard';
import styles from './LessonsPage.module.css';
import MetaTags from '../components/MetaTags'; // MetaTags
import Spinner from '../components/Spinner';

function LessonsPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const fetchedLessons = await getLessons();
                setLessons(fetchedLessons);
            } catch (err) {
                console.error("Error fetching lessons:", err);
                setError('Failed to fetch lessons.');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>
    }

    return (
      <>
        <MetaTags title="لیست درس ها" />
        <div className={styles.container}>
            <h2 className={styles.title}><FormattedMessage id="lessons.title" /></h2>
            <div className={styles.lessonsGrid}>
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                ))}
            </div>
        </div>
      </>
    );
}

export default LessonsPage;