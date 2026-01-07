import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import spotifyService from '../services/spotifyService';

function SpotifyCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            if (error) {
                console.error('Spotify auth error:', error);
                navigate('/', { replace: true });
                return;
            }

            if (code) {
                try {
                    await spotifyService.handleCallback(code);
                    navigate('/', { replace: true });
                } catch (err) {
                    console.error('Error handling callback:', err);
                    navigate('/', { replace: true });
                }
            } else {
                navigate('/', { replace: true });
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-bg)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto var(--space-lg)' }}></div>
                <h2>Connecting to Spotify...</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Please wait while we authenticate your account
                </p>
            </div>
        </div>
    );
}

export default SpotifyCallback;
