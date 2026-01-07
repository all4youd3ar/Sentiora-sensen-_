import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socialService from '../services/socialService';

import { useAuth } from '../context/AuthContext';
import { FOUNDER_EMAIL } from '../types/constants';

function PostCard({ post }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return timestamp.toLocaleDateString();
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            await socialService.likePost(post.id);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div
            className="card animate-fade-in"
            onClick={() => navigate(`/post/${post.id}`)}
            style={{
                padding: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            {/* Author Info */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-md)'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    flexShrink: 0
                }}>
                    {post.authorName[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                        margin: 0,
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)'
                    }}>
                        {post.authorName}
                        {post.authorEmail === FOUNDER_EMAIL && (
                            <span title="Founder" style={{ fontSize: '0.9em' }}>👑</span>
                        )}
                    </h4>
                    <p style={{
                        margin: 0,
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-tertiary)'
                    }}>
                        {formatTimestamp(post.timestamp)}
                    </p>
                </div>
            </div>

            {/* Content */}
            <p style={{
                fontSize: 'var(--font-size-base)',
                lineHeight: 1.6,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
                whiteSpace: 'pre-wrap'
            }}>
                {post.content}
            </p>

            {/* Actions */}
            <div style={{
                display: 'flex',
                gap: 'var(--space-xl)',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--color-border)'
            }}>
                <button
                    onClick={handleLike}
                    className="btn-ghost"
                    style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    <span>❤️</span>
                    <span>{post.likesCount || 0}</span>
                </button>
                <button
                    className="btn-ghost"
                    style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    <span>💬</span>
                    <span>{post.commentsCount || 0}</span>
                </button>
                <button
                    className="btn-ghost"
                    style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    <span>🔗</span>
                </button>

                {/* Delete Button (Founder Only) */}
                {currentUser?.email === FOUNDER_EMAIL && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Are you sure you want to delete this post?')) {
                                socialService.deletePost(post.id)
                                    .then(() => {
                                        // Ideally refresh the feed here, but socialService subscription might handle it if real-time
                                        // If mock data, we might need to trigger a reload or rely on state update
                                        window.location.reload(); // Simple brute force for now to ensure UI updates
                                    })
                                    .catch(err => console.error(err));
                            }
                        }}
                        className="btn-ghost"
                        style={{
                            padding: 'var(--space-xs) var(--space-sm)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-error)',
                            marginLeft: 'auto'
                        }}
                        title="Delete Post (Admin)"
                    >
                        <span>🗑️</span>
                    </button>
                )}
            </div>
        </div>
    );
}

function CreatePostModal({ isOpen, onClose, onSubmit }) {
    const { currentUser } = useAuth();
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState(
        localStorage.getItem('sentiora_username') || ''
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() && authorName.trim()) {
            localStorage.setItem('sentiora_username', authorName);
            // Pass the current user's email if available
            onSubmit(authorName, content, currentUser?.email);
            setContent('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 'var(--z-modal)',
                padding: 'var(--space-lg)'
            }}
            onClick={onClose}
        >
            <div
                className="card animate-scale-in"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: 'var(--space-2xl)'
                }}
            >
                <h2 style={{ marginBottom: 'var(--space-lg)' }}>Create Post</h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--space-md)' }}>
                        <label
                            htmlFor="authorName"
                            style={{
                                display: 'block',
                                marginBottom: 'var(--space-xs)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            Your Name
                        </label>
                        <input
                            id="authorName"
                            type="text"
                            className="input"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label
                            htmlFor="content"
                            style={{
                                display: 'block',
                                marginBottom: 'var(--space-xs)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            What's on your mind?
                        </label>
                        <textarea
                            id="content"
                            className="input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                            rows={6}
                            required
                            style={{ minHeight: '150px' }}
                        />
                        <div style={{
                            marginTop: 'var(--space-xs)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-tertiary)',
                            textAlign: 'right'
                        }}>
                            {content.length} characters
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!content.trim() || !authorName.trim()}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function FeedScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadPosts();

        // Subscribe to real-time updates
        const unsubscribe = socialService.subscribeToPosts((updatedPosts) => {
            setPosts(updatedPosts);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loadPosts = async () => {
        try {
            const fetchedPosts = await socialService.getPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (authorName, content, authorEmail) => {
        try {
            await socialService.createPost(authorName, content, authorEmail);
            await loadPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="gradient-bg" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <div className="container" style={{
                paddingTop: 'var(--space-2xl)',
                paddingBottom: 'var(--space-2xl)',
                maxWidth: '800px'
            }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }} className="animate-fade-in">
                    <h1 style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: 'var(--font-weight-extrabold)',
                        marginBottom: 'var(--space-sm)',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Social Feed
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        margin: 0
                    }}>
                        Share your musical journey with the community
                    </p>
                    <button
                        onClick={() => navigate('/vibe-map')}
                        className="btn-secondary"
                        style={{ marginTop: 'var(--space-md)', borderRadius: 'var(--radius-full)' }}
                    >
                        🌍 Explore Global Vibes
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 'var(--space-3xl)'
                    }}>
                        <div className="spinner"></div>
                    </div>
                ) : posts.length === 0 ? (
                    /* Empty State */
                    <div className="card" style={{
                        padding: 'var(--space-3xl)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>📝</div>
                        <h3 style={{ marginBottom: 'var(--space-sm)' }}>No posts yet</h3>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            Be the first to share your thoughts!
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary"
                        >
                            Create First Post
                        </button>
                    </div>
                ) : (
                    /* Posts List */
                    <div>
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fab"
                    title="Create new post"
                >
                    <span style={{ fontSize: '1.5rem' }}>✏️</span>
                </button>

                {/* Create Post Modal */}
                <CreatePostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreatePost}
                />
            </div>
        </div>
    );
}

export default FeedScreen;
