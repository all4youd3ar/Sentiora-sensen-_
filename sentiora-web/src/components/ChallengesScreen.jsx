import React, { useState } from 'react';

export default function ChallengesScreen() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Say something kind to yourself", completed: false },
        { id: 2, text: "Touch grass for 1 minute", completed: false },
        { id: 3, text: "Drink water (250ml)", completed: false },
        { id: 4, text: "Listen to your favorite song", completed: false },
        { id: 5, text: "Take a deep breath", completed: false }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

    return (
        <div className="gradient-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl)', paddingBottom: '100px' }}>
            <header style={{ marginBottom: 'var(--space-xl)' }}>
                <h1 className="animate-fade-in" style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                    Daily Challenges
                </h1>
                <p className="animate-fade-in" style={{ color: 'var(--color-text-secondary)', animationDelay: '0.1s' }}>
                    Small wins for a better day.
                </p>
            </header>

            {/* Progress Bar */}
            <div className="animate-scale-in" style={{ marginBottom: 'var(--space-2xl)', animationDelay: '0.2s' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-xs)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--color-text-secondary)'
                }}>
                    <span>Your Progress</span>
                    <span>{progress}%</span>
                </div>
                <div style={{
                    width: '100%',
                    height: '10px',
                    background: 'var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--color-primary)',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                </div>
            </div>

            <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-md)', animationDelay: '0.3s' }}>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="card"
                        style={{
                            padding: 'var(--space-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-md)',
                            cursor: 'pointer',
                            background: task.completed ? 'var(--color-surface)' : 'var(--color-surface)',
                            opacity: task.completed ? 0.7 : 1,
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: `2px solid ${task.completed ? 'var(--color-success)' : 'var(--color-border)'}`,
                            background: task.completed ? 'var(--color-success)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.9rem',
                            transition: 'all var(--transition-fast)'
                        }}>
                            {task.completed && '✓'}
                        </div>
                        <span style={{
                            fontSize: '1.1rem',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)'
                        }}>
                            {task.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
