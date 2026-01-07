import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password, name) {
        if (!auth) throw new Error("Firebase Auth not initialized");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with name
        await updateProfile(user, { displayName: name });

        // Create user document in Firestore if db is available
        if (db) {
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });
        }

        // Update local state immediately
        setCurrentUser({ ...user, displayName: name });

        return user;
    }

    function login(email, password) {
        if (!auth) throw new Error("Firebase Auth not initialized");
        return signInWithEmailAndPassword(auth, email, password);
    }

    function demoLogin() {
        const mockUser = {
            uid: 'demo-user-123',
            email: 'guest@sentiora.app',
            displayName: 'Guest Dreamer',
            photoURL: null,
            emailVerified: true
        };
        setCurrentUser(mockUser);
        localStorage.setItem('sentiora_username', mockUser.displayName);
        return Promise.resolve(mockUser);
    }

    function logout() {
        if (!auth) return Promise.resolve();
        return signOut(auth);
    }

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            // Sync with localStorage for legacy mock support
            if (user && user.displayName) {
                localStorage.setItem('sentiora_username', user.displayName);
            }
        });

        // Safety timeout in case Firebase hangs
        const timeoutId = setTimeout(() => {
            setLoading((currentLoading) => {
                if (currentLoading) {
                    console.warn('⚠️ Auth state change timed out, forcing render');
                    return false;
                }
                return currentLoading;
            });
        }, 3000);

        return () => {
            unsubscribe();
            clearTimeout(timeoutId);
        };
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        demoLogin,
        logout,
        isConfigured: !!auth
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#0a0a0a',
                    color: '#fff',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <div className="loading-spinner" style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderRadius: '50%',
                        borderTopColor: '#fff',
                        animation: 'spin 1s ease-in-out infinite'
                    }}></div>
                    <p style={{ fontFamily: 'sans-serif', opacity: 0.7 }}>Initializing Sentiora...</p>
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
