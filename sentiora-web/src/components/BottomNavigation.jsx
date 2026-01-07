import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: '❤️', label: 'Home' },
        { path: '/vent', icon: '🎤', label: 'Vent' },
        { path: '/wallpapers', icon: '🖼️', label: 'Wallpapers' },
        { path: '/social', icon: '🌍', label: 'Community' },
        { path: '/profile', icon: '👤', label: 'Profile' }
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-sm) var(--space-md)',
            paddingBottom: 'calc(var(--space-sm) + env(safe-area-inset-bottom))',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 'var(--z-fixed)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}>
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                        transition: 'all var(--transition-base)',
                        gap: '4px',
                        padding: 'var(--space-xs)',
                        minWidth: '64px'
                    }}
                >
                    <span style={{
                        fontSize: '1.5rem',
                        transform: isActive(item.path) ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform var(--transition-spring)'
                    }}>
                        {item.icon}
                    </span>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: isActive(item.path) ? '600' : '400'
                    }}>
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
}
