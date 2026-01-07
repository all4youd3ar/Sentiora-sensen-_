import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import Logo from './Logo';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { login, demoLogin } = useAuth();
    const navigate = useNavigate();

    // Check if Firebase is configured
    const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

    // Real Unsplash images matching the "Ethereal/Lavender/Navy" theme
    const backgroundImages = [
        "url('https://images.unsplash.com/photo-1490750967868-58cb75063ed4?q=80&w=2574&auto=format&fit=crop')", // Lavender Field / Soft Purple
        "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop')", // Deep Navy / Night Sky / Abstract
        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop')", // Soft Cream / Beach / Calm
        "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop')"  // Ethereal Abstract Fluid
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleDemoLogin = async () => {
        try {
            await demoLogin();
            navigate('/');
        } catch (error) {
            console.error('Demo login failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isConfigured) {
            setError("Firebase is not configured. Please check your .env file.");
            return;
        }

        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to sign in. Please check your email and password.');
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            {/* Background Slideshow */}
            {backgroundImages.map((bg, index) => (
                <div
                    key={index}
                    className={`bg-slideshow ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ background: bg }}
                />
            ))}

            {/* Glassmorphism Overlay */}
            <div className="overlay-full">
                <div className="glass-panel animate-scale-in">
                    <div className="auth-header">
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Logo size="medium" />
                        </div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue your journey</p>
                    </div>

                    {error && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#FCA5A5'
                        }}>
                            {error}
                        </div>
                    )}

                    {!isConfigured && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            background: 'rgba(251, 191, 36, 0.2)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            color: '#FDE68A'
                        }}>
                            ⚠️ Authentication is not configured. Please add Firebase credentials to your .env file.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <div style={{ position: 'relative', margin: '1.5rem 0' }}>
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}></div>
                            <span style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: '#1a1a2e', // Accessing theme color might be tricky here, hardcoding dark
                                padding: '0 10px',
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '0.8rem'
                            }}>OR</span>
                        </div>
                        <button
                            onClick={handleDemoLogin}
                            type="button"
                            className="auth-btn"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                marginTop: '0'
                            }}
                        >
                            ✨ Use Demo Account
                        </button>
                    </div>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
