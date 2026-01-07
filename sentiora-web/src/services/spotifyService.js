// Spotify API Service with PKCE OAuth Flow

const SPOTIFY_CONFIG = {
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '6bb327efa35340568acbaa8056db548f',
    redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/callback',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    apiBase: 'https://api.spotify.com/v1'
};

class SpotifyService {
    constructor() {
        this.accessToken = localStorage.getItem('spotify_access_token');
        this.accessorToken = localStorage.getItem('spotify_access_token');
        this.refreshToken = localStorage.getItem('spotify_refresh_token');
        this.tokenExpiry = localStorage.getItem('spotify_token_expiry');
        this.isMockMode = localStorage.getItem('spotify_mock_mode') === 'true';
    }

    // Mock Data
    get mockUser() {
        return {
            id: 'mock_user',
            display_name: 'Guest User',
            images: []
        };
    }

    get mockPlaylists() {
        return [
            {
                id: '37i9dQZF1DX8Uebhn9wzrS',
                name: 'Chill Lofi Study Beats',
                images: [{ url: 'https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f9369403' }],
                external_urls: { spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS' }
            },
            {
                id: '37i9dQZF1DWZeKCadgRdKQ',
                name: 'Deep Focus',
                images: [{ url: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876b64740ad' }],
                external_urls: { spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ' }
            },
            {
                id: '37i9dQZF1DX4sWSpwq3LiO',
                name: 'Peaceful Piano',
                images: [{ url: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6' }],
                external_urls: { spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' }
            }
        ];
    }

    // Enable Mock Mode
    loginMock() {
        this.isMockMode = true;
        this.accessToken = 'mock_token';
        this.tokenExpiry = Date.now() + 3600000;
        localStorage.setItem('spotify_mock_mode', 'true');
        localStorage.setItem('spotify_access_token', 'mock_token');
        localStorage.setItem('spotify_token_expiry', this.tokenExpiry);
        // Simulate a reload or just let the app react to state change
        window.location.reload();
    }

    // Generate random string for PKCE
    generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    }

    // Generate code challenge for PKCE
    async generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    // Start OAuth flow
    async login() {
        const codeVerifier = this.generateRandomString(64);
        const codeChallenge = await this.generateCodeChallenge(codeVerifier);

        // Store code verifier for later use
        localStorage.setItem('spotify_code_verifier', codeVerifier);

        const params = new URLSearchParams({
            client_id: SPOTIFY_CONFIG.clientId,
            response_type: 'code',
            redirect_uri: SPOTIFY_CONFIG.redirectUri,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            scope: 'user-read-private playlist-read-private'
        });

        window.location.href = `${SPOTIFY_CONFIG.authEndpoint}?${params.toString()}`;
    }

    // Handle OAuth callback
    async handleCallback(code) {
        const codeVerifier = localStorage.getItem('spotify_code_verifier');

        if (!codeVerifier) {
            throw new Error('No code verifier found');
        }

        const params = new URLSearchParams({
            client_id: SPOTIFY_CONFIG.clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SPOTIFY_CONFIG.redirectUri,
            code_verifier: codeVerifier
        });

        const response = await fetch(SPOTIFY_CONFIG.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            throw new Error('Failed to exchange code for token');
        }

        const data = await response.json();

        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenExpiry = Date.now() + (data.expires_in * 1000);

        localStorage.setItem('spotify_access_token', this.accessToken);
        localStorage.setItem('spotify_refresh_token', this.refreshToken);
        localStorage.setItem('spotify_token_expiry', this.tokenExpiry);
        localStorage.removeItem('spotify_code_verifier');

        return data;
    }

    // Check if user is authenticated
    isAuthenticated() {
        if (this.isMockMode) return true;
        return !!this.accessToken && Date.now() < this.tokenExpiry;
    }

    // Logout
    logout() {
        this.isMockMode = false;
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        localStorage.removeItem('spotify_mock_mode');
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_token_expiry');
    }

    // Search playlists by mood
    async searchPlaylists(mood, limit = 10) {
        if (this.isAuthenticated()) {
            if (this.isMockMode) {
                // Return random subset of mock playlists to simulate search
                return this.mockPlaylists;
            }
        } else {
            throw new Error('Not authenticated');
        }

        const params = new URLSearchParams({
            q: mood,
            type: 'playlist',
            limit: limit.toString()
        });

        const response = await fetch(
            `${SPOTIFY_CONFIG.apiBase}/search?${params.toString()}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                this.logout();
                throw new Error('Authentication expired');
            }
            throw new Error('Failed to search playlists');
        }

        const data = await response.json();
        return data.playlists.items;
    }

    // Get specific playlist by ID
    async getPlaylist(playlistId) {
        if (!this.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        if (this.isMockMode) {
            const playlist = this.mockPlaylists.find(p => p.id === playlistId);
            return playlist || this.mockPlaylists[0];
        }

        const response = await fetch(
            `${SPOTIFY_CONFIG.apiBase}/playlists/${playlistId}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                this.logout();
                throw new Error('Authentication expired');
            }
            throw new Error('Failed to get playlist');
        }

        return await response.json();
    }

    // Get user profile
    async getUserProfile() {
        if (!this.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        if (this.isMockMode) {
            return this.mockUser;
        }

        const response = await fetch(`${SPOTIFY_CONFIG.apiBase}/me`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user profile');
        }

        return await response.json();
    }
}

export default new SpotifyService();
