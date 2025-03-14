// src/services/lessonService.js
import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';

const lessonsCollection = collection(db, "lessons");

export async function createLesson(lessonData) {
    try {
        const docRef = await addDoc(lessonsCollection, lessonData);
        return docRef.id;
    } catch (error) {
        throw new Error('Failed to create lesson. Please try again later.'); // Generic error message
    }
}

export async function getLessons() {
    try {
        const querySnapshot = await getDocs(lessonsCollection);
        const lessons = [];
        querySnapshot.forEach((doc) => {
            lessons.push({ id: doc.id, ...doc.data() });
        });
        return lessons;
    } catch (error) {
        throw new Error('Failed to get lessons. Please try again later.');
    }
}

// Get a single lesson by ID
export async function getLessonById(lessonId) {
    try {
        const docRef = doc(db, "lessons", lessonId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Lesson not found.');
        }
    } catch (error) {
        if (error.message === 'Lesson not found.') {
            throw error;
        }
        throw new Error('Failed to get lesson. Please try again later.');
    }
}

export async function updateLesson(lessonId, updatedData) {
    try {
        const docRef = doc(db, "lessons", lessonId);
        await updateDoc(docRef, updatedData);
    } catch (error) {
        throw new Error('Failed to update lesson. Please try again later.');
    }
}

export async function deleteLesson(lessonId) {
    try {
        const docRef = doc(db, "lessons", lessonId);
        await deleteDoc(docRef);
    } catch (error) {
        throw new Error('Failed to delete lesson. Please try again later.');
    }
}

export async function getLessonsWithFilters(filters, sortBy, sortOrder = 'asc', limitCount = 10) {
    try {
        let q = lessonsCollection;

        // Apply filters
        if (filters) {
            for (const [field, operator, value] of filters) {
                q = query(q, where(field, operator, value));
            }
        }

        // Apply sorting
        if (sortBy) {
            q = query(q, orderBy(sortBy, sortOrder));
        }

        // Apply pagination
        q = query(q, limit(limitCount));

        const querySnapshot = await getDocs(q);
        const lessons = [];
        querySnapshot.forEach((doc) => {
            lessons.push({ id: doc.id, ...doc.data() });
        });
        return lessons;

    } catch (error) {
        console.error("Error getting documents with filters: ", error);
        throw error;
    }
}