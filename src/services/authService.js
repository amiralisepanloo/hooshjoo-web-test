// src/services/authService.js
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider, // Import GoogleAuthProvider
    signInWithPopup // Import signInWithPopup

} from 'firebase/auth';


export async function signup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // Firebase error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error('This email address is already in use.');
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            case 'auth/weak-password':
                throw new Error('Password should be at least 6 characters.');
            default:
                throw new Error('Failed to sign up. Please try again later.');
        }
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                throw new Error('Invalid email or password.');
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            default:
                throw new Error('Failed to log in. Please try again later.');
        }
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error('Failed to log out. Please try again later.');
    }
}

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        switch (error.code){
            case 'auth/user-not-found':
                throw new Error('User not found');
            case 'auth/invalid-email':
                throw new Error('Invalid email address.');
            default:
                 throw new Error('Failed to send password reset email. Please try again later.');
        }

    }
}

export async function updateUser(user, profileData) {
     try {
        await updateProfile(user, profileData);

    } catch(error) {
        throw new Error('Failed to update user. Please try again later.');
    }
}

// Sign in with Google
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return user;

    } catch (error) {
        // Handle Errors here.
        console.error(error); // Log the error to the console
        throw new Error('Failed to sign in with Google. Please try again later.');
    }
}