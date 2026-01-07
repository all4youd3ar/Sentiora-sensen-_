import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function GratitudeJarScreen() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [shakenNote, setShakenNote] = useState(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('sentiora_gratitude_notes') || '[]');
        setNotes(savedNotes);
    }, []);

    const saveNote = () => {
        if (!newNote.trim()) return;
        const note = {
            id: Date.now(),
            text: newNote,
            date: new Date().toLocaleDateString()
        };
        const updatedNotes = [note, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('sentiora_gratitude_notes', JSON.stringify(updatedNotes));
        setNewNote('');
        setIsWriting(false);
    };

    const shakeJar = () => {
        if (notes.length === 0) return;
        setIsShaking(true);
        setShakenNote(null);

        setTimeout(() => {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            setShakenNote(randomNote);
            setIsShaking(false);
        }, 1500);
    };

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                <button onClick={() => navigate(-1)} className="btn-ghost" style={{ marginRight: 'var(--space-md)' }}>←</button>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gratitude Jar</h1>
            </div>

            {/* Main Stage */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2xl)' }}>

                {/* The Jar Visual */}
                <motion.div
                    animate={isShaking ? { rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5, repeat: 2 } } : {}}
                    className="card-glass"
                    style={{
                        width: '240px',
                        height: '320px',
                        borderRadius: '40px 40px 100px 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        border: '4px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Jar Lid */}
                    <div style={{
                        position: 'absolute', top: '-20px', width: '180px', height: '40px',
                        background: 'rgba(255,255,255,0.6)', borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }} />

                    {/* Notes inside */}
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '30px 30px 90px 90px' }}>
                        {notes.map((note, index) => (
                            <motion.div
                                key={note.id}
                                initial={{ y: -100, opacity: 0, rotate: Math.random() * 360 }}
                                animate={{ y: 0, opacity: 1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: `${10 + (index * 5) % 150}px`,
                                    left: `${20 + (index * 15) % 150}px`,
                                    width: '40px',
                                    height: '40px',
                                    background: `hsl(${30 + (index * 40) % 360}, 70%, 80%)`,
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    transform: `rotate(${Math.random() * 360}deg)`
                                }}
                            />
                        ))}
                    </div>

                    {/* Label */}
                    <div style={{
                        position: 'absolute',
                        background: '#fff',
                        padding: '5px 20px',
                        borderRadius: '4px',
                        fontFamily: 'serif',
                        fontSize: '1.2rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                        Gratitude
                    </div>
                </motion.div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <button
                        className="btn-primary"
                        onClick={() => setIsWriting(true)}
                        style={{ borderRadius: 'var(--radius-full)', padding: 'var(--space-lg) var(--space-xl)' }}
                    >
                        + Add Note
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={shakeJar}
                        disabled={notes.length === 0}
                        style={{ borderRadius: 'var(--radius-full)', padding: 'var(--space-lg) var(--space-xl)' }}
                    >
                        Using Shake
                    </button>
                </div>
            </div>

            {/* Write Modal */}
            <AnimatePresence>
                {isWriting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.5)', zIndex: 100,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: 'var(--space-md)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="card"
                            style={{ width: '100%', maxWidth: '400px', background: '#fff' }}
                        >
                            <h3>I am grateful for...</h3>
                            <textarea
                                className="input"
                                rows={4}
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="A warm cup of tea, a friend's smile..."
                                autoFocus
                                style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
                                <button className="btn-ghost" onClick={() => setIsWriting(false)}>Cancel</button>
                                <button className="btn-primary" onClick={saveNote}>Drop in Jar</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shaken Note Reveal */}
            <AnimatePresence>
                {shakenNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShakenNote(null)}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.6)', zIndex: 100,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: 'var(--space-md)'
                        }}
                    >
                        <motion.div
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            className="card"
                            style={{
                                width: '100%', maxWidth: '350px',
                                background: '#fdf6e3', // Paper color
                                color: '#5c4b37',
                                minHeight: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 'var(--space-2xl)',
                                fontFamily: 'serif'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: 'var(--space-md)' }}>
                                {shakenNote.date}
                            </p>
                            <p style={{ fontSize: '1.4rem', lineHeight: 1.4 }}>
                                "{shakenNote.text}"
                            </p>
                            <button
                                className="btn-ghost"
                                onClick={() => setShakenNote(null)}
                                style={{ marginTop: 'var(--space-xl)' }}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
