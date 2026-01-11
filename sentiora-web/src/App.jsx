import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import MoodScreen from './components/MoodScreen';
import FeedScreen from './components/FeedScreen';
import PostDetail from './components/PostDetail';
import SpotifyCallback from './components/SpotifyCallback';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// New Components
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingMoodScreen from './components/OnboardingMoodScreen';
import HomeScreen from './components/HomeScreen';
import BottomNavigation from './components/BottomNavigation';
import MoodInputScreen from './components/MoodInputScreen';
import ActionPlannerScreen from './components/ActionPlannerScreen';
import VentScreen from './components/VentScreen';
import WallpapersScreen from './components/WallpapersScreen';
import ChallengesScreen from './components/ChallengesScreen';
import CompatibilityScreen from './components/CompatibilityScreen';
import WeeklyReportScreen from './components/WeeklyReportScreen';
import MusicPlayer from './components/MusicPlayer';
import ProfileScreen from './components/ProfileScreen';
import BreathingScreen from './components/BreathingScreen';
import GratitudeJarScreen from './components/GratitudeJarScreen';
import MoodCalendarScreen from './components/MoodCalendarScreen';
import GlobalVibeScreen from './components/GlobalVibeScreen';



import AmbienceMixer from './components/AmbienceMixer';
import Logo from './components/Logo';
import Footer from './components/Footer';

function MainLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Show logo if NOT on profile screen
    const showLogo = location.pathname !== '/profile';

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
            {showLogo && (
                <div
                    onClick={() => navigate('/profile')}
                    style={{
                        position: 'fixed', // Changed to fixed to stay visible and predictable
                        top: '15px',
                        right: '15px',
                        zIndex: 1000, // Higher z-index
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        height: 'auto',
                        minHeight: '40px',
                        overflow: 'visible' // Don't clip the wave
                    }}
                >
                    <div style={{ pointerEvents: 'none', transform: 'scale(0.35)', transformOrigin: 'center', width: '100px', display: 'flex', justifyContent: 'center' }}>
                        <Logo size="small" color="var(--color-text-primary)" />
                    </div>
                </div>
            )}
            <Outlet />
            <Footer />
            <BottomNavigation />
            <AmbienceMixer />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <MusicPlayer />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/welcome" element={<WelcomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<SignupScreen />} />
                    <Route path="/callback" element={<SpotifyCallback />} />

                    {/* Protected Routes */}
                    <Route element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/onboarding" element={<OnboardingMoodScreen />} />
                        <Route path="/mood" element={<MoodScreen />} />
                        <Route path="/actions" element={<ActionPlannerScreen />} />
                        <Route path="/social" element={<FeedScreen />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/vent" element={<VentScreen />} />
                        <Route path="/wallpapers" element={<WallpapersScreen />} />
                        <Route path="/challenges" element={<ChallengesScreen />} />
                        <Route path="/compatibility" element={<CompatibilityScreen />} />
                        <Route path="/report" element={<WeeklyReportScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/breathe" element={<BreathingScreen />} />
                        <Route path="/gratitude" element={<GratitudeJarScreen />} />
                        <Route path="/calendar" element={<MoodCalendarScreen />} />
                        <Route path="/vibe-map" element={<GlobalVibeScreen />} />
                    </Route>

                    {/* Redirect root to welcome if not logged in (handled by ProtectedRoute, but for clarity) */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
