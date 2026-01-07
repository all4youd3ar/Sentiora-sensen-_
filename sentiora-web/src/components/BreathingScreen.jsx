import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function BreathingScreen() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, hold2
    const [text, setText] = useState('Breathe In');

    useEffect(() => {
        let timer;

        // 4-7-8 Breathing Technique (simplified for UI initially to 4-4-4-4 or similar for visual symmetry)
        // Let's do Box Breathing: 4s In, 4s Hold, 4s Out, 4s Hold
        const cycle = () => {
            setPhase('inhale');
            setText('Breathe In');

            timer = setTimeout(() => {
                setPhase('hold');
                setText('Hold');

                timer = setTimeout(() => {
                    setPhase('exhale');
                    setText('Breathe Out');

                    timer = setTimeout(() => {
                        setPhase('hold2');
                        setText('Hold');

                        timer = setTimeout(() => {
                            cycle(); // Loop
                        }, 4000);
                    }, 4000);
                }, 4000);
            }, 4000);
        };

        cycle();

        return () => clearTimeout(timer);
    }, []);

    // Animation Variants
    const circleVariants = {
        inhale: { scale: 1.5, opacity: 1, transition: { duration: 4, ease: "easeInOut" } },
        hold: { scale: 1.5, opacity: 0.8, transition: { duration: 4, ease: "linear" } }, // Stay expanded
        exhale: { scale: 1, opacity: 0.6, transition: { duration: 4, ease: "easeInOut" } },
        hold2: { scale: 1, opacity: 0.6, transition: { duration: 4, ease: "linear" } } // Stay contracted
    };

    const textVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.5 } }
    };

    return (
        <div className="gradient-bg" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="btn-ghost"
                style={{ position: 'absolute', top: 'var(--space-xl)', left: 'var(--space-xl)', zIndex: 10 }}
            >
                ← Back
            </button>

            {/* Main Visual */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Outer Glow Circles */}
                <motion.div
                    animate={phase}
                    variants={circleVariants}
                    style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                        zIndex: 1
                    }}
                />

                {/* Core Circle */}
                <motion.div
                    animate={phase}
                    variants={{
                        inhale: { scale: 1.2, backgroundColor: 'var(--color-primary)' },
                        hold: { scale: 1.2, backgroundColor: 'var(--color-primary)' },
                        exhale: { scale: 1, backgroundColor: 'var(--color-primary-dark)' },
                        hold2: { scale: 1, backgroundColor: 'var(--color-primary-dark)' }
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    style={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        zIndex: 2,
                        boxShadow: '0 0 30px rgba(0,0,0,0.1)'
                    }}
                />

                {/* Text Overlay */}
                <div style={{ position: 'absolute', zIndex: 3, textAlign: 'center', pointerEvents: 'none' }}>
                    <AnimatePresence mode='wait'>
                        <motion.h2
                            key={text}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
                                margin: 0,
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            {text}
                        </motion.h2>
                    </AnimatePresence>
                </div>
            </div>

            {/* Instruction Footer */}
            <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <p>Box Breathing (4-4-4-4)</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Follow the rhythm to center your mind.</p>
            </div>
        </div>
    );
}
