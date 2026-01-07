import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socialService from '../services/socialService';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState('');
    const [authorName, setAuthorName] = useState(
        localStorage.getItem('sentiora_username') || ''
    );

    useEffect(() => {
        loadPost();
        loadComments();
    }, [id]);

    const loadPost = async () => {
        try {
            const fetchedPost = await socialService.getPost(id);
            setPost(fetchedPost);
        } catch (error) {
            console.error('Error loading post:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            const fetchedComments = await socialService.getComments(id);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    };

    const handleLike = async () => {
        try {
            await socialService.likePost(id);
            await loadPost();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentContent.trim() || !authorName.trim()) return;

        try {
            localStorage.setItem('sentiora_username', authorName);
            await socialService.addComment(id, authorName, commentContent);
            setCommentContent('');
            await loadComments();
            await loadPost(); // Refresh to update comment count
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="gradient-bg" style={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="gradient-bg" style={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="card" style={{
                    padding: 'var(--space-3xl)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>❌</div>
                    <h2 style={{ marginBottom: 'var(--space-sm)' }}>Post not found</h2>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--space-lg)'
                    }}>
                        The post you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate('/social')}
                        className="btn btn-primary"
                    >
                        Back to Feed
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-bg" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <div className="container" style={{
                paddingTop: 'var(--space-2xl)',
                paddingBottom: 'var(--space-2xl)',
                maxWidth: '800px'
            }}>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/social')}
                    className="btn btn-ghost"
                    style={{
                        marginBottom: 'var(--space-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)'
                    }}
                >
                    <span>←</span>
                    <span>Back to Feed</span>
                </button>

                {/* Post Card */}
                <div className="card animate-fade-in" style={{
                    padding: 'var(--space-2xl)',
                    marginBottom: 'var(--space-2xl)'
                }}>
                    {/* Author Info */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        marginBottom: 'var(--space-lg)'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            flexShrink: 0
                        }}>
                            {post.authorName[0].toUpperCase()}
                        </div>
                        <div>
                            <h3 style={{
                                margin: 0,
                                fontSize: 'var(--font-size-xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--color-text-primary)'
                            }}>
                                {post.authorName}
                            </h3>
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
                        fontSize: 'var(--font-size-lg)',
                        lineHeight: 1.8,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--space-lg)',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {post.content}
                    </p>

                    {/* Actions */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-xl)',
                        paddingTop: 'var(--space-lg)',
                        borderTop: '1px solid var(--color-border)'
                    }}>
                        <button
                            onClick={handleLike}
                            className="btn-ghost"
                            style={{
                                padding: 'var(--space-sm) var(--space-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)'
                            }}
                        >
                            <span style={{ fontSize: '1.25rem' }}>❤️</span>
                            <span>{post.likesCount || 0} likes</span>
                        </button>
                        <div
                            className="btn-ghost"
                            style={{
                                padding: 'var(--space-sm) var(--space-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                cursor: 'default'
                            }}
                        >
                            <span style={{ fontSize: '1.25rem' }}>💬</span>
                            <span>{post.commentsCount || 0} comments</span>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="card animate-fade-in" style={{ padding: 'var(--space-2xl)' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>
                        Comments ({comments.length})
                    </h3>

                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} style={{ marginBottom: 'var(--space-2xl)' }}>
                        <div style={{ marginBottom: 'var(--space-md)' }}>
                            <input
                                type="text"
                                className="input"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                placeholder="Your name"
                                required
                                style={{ marginBottom: 'var(--space-sm)' }}
                            />
                            <textarea
                                className="input"
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                placeholder="Add a comment..."
                                rows={3}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!commentContent.trim() || !authorName.trim()}
                        >
                            Post Comment
                        </button>
                    </form>

                    {/* Comments List */}
                    {comments.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: 'var(--space-2xl)',
                            color: 'var(--color-text-tertiary)'
                        }}>
                            <p>No comments yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    style={{
                                        padding: 'var(--space-md)',
                                        background: 'var(--color-bg-secondary)',
                                        borderRadius: 'var(--radius-lg)',
                                        borderLeft: '3px solid var(--color-primary)'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-sm)',
                                        marginBottom: 'var(--space-sm)'
                                    }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: 'var(--font-size-sm)',
                                            fontWeight: 'var(--font-weight-bold)',
                                            flexShrink: 0
                                        }}>
                                            {comment.authorName[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: 'var(--font-size-sm)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                                color: 'var(--color-text-primary)'
                                            }}>
                                                {comment.authorName}
                                            </div>
                                            <div style={{
                                                fontSize: 'var(--font-size-xs)',
                                                color: 'var(--color-text-tertiary)'
                                            }}>
                                                {formatTimestamp(comment.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{
                                        margin: 0,
                                        fontSize: 'var(--font-size-sm)',
                                        lineHeight: 1.6,
                                        color: 'var(--color-text-primary)',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
