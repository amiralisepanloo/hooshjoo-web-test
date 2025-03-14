// src/contexts/ProfileContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                    } else {
                        // User document doesn't exist yet, set profile to null or initial values
                        setProfile(null); // Or setProfile({ name: '', ... });
                    }

                } catch (error) {
                    console.error("Error fetching profile:", error);
                    // Handle the error appropriately (e.g., show an error message)
                } finally {
                    setLoading(false);
                }

            } else {
                setProfile(null);
                setLoading(false);
            }
        };


        fetchProfile();
    }, [currentUser]); // Re-fetch profile when currentUser changes

    async function updateProfile(profileData) {
        if (!currentUser) {
          throw new Error("No user logged in!");
        }
        try {
            const docRef = doc(db, "users", currentUser.uid);
            await setDoc(docRef, profileData, { merge: true }); // Use setDoc with merge
            setProfile(prevProfile => ({ ...prevProfile, ...profileData })); // Update local state too

        } catch(error){
            console.error("Error updating profile:", error)
            throw error;
        }
    }

    const value = {
        profile,
        loading,
        updateProfile
    };

    return (
        <ProfileContext.Provider value={value}>
            {!loading && children}
        </ProfileContext.Provider>
    );
}