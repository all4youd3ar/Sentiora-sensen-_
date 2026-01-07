// Social Service for managing posts and comments

import { db } from './firebaseConfig.js';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    limit,
    updateDoc,
    increment,
    onSnapshot,
    serverTimestamp,
    deleteDoc
} from 'firebase/firestore';

class SocialService {
    constructor() {
        this.useMockData = !db;
        this.mockPosts = this.generateMockPosts();
    }

    // Generate mock posts for demo purposes
    generateMockPosts() {
        return [
            {
                id: '1',
                authorName: 'Alex Johnson',
                content: 'Just discovered an amazing playlist for my morning workout! Feeling so energized! 💪🎵',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                likesCount: 12,
                commentsCount: 3,
                comments: [
                    {
                        id: 'c1',
                        authorName: 'Sarah Smith',
                        content: 'Share the link please!',
                        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
                    }
                ]
            },
            {
                id: '2',
                authorName: 'Maria Garcia',
                content: 'Rainy days call for calm, soothing music. Currently listening to some ambient tracks and feeling so peaceful 🌧️🧘',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                likesCount: 24,
                commentsCount: 7,
                comments: []
            },
            {
                id: '3',
                authorName: 'David Chen',
                content: 'Sentiora helped me find the perfect study playlist. My productivity has never been better! 🎯📚',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                likesCount: 45,
                commentsCount: 12,
                comments: []
            }
        ];
    }

    // Get all posts (real-time or mock)
    async getPosts(limitCount = 50) {
        if (this.useMockData) {
            return this.mockPosts;
        }

        try {
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, orderBy('timestamp', 'desc'), limit(limitCount));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
        } catch (error) {
            console.error('Error fetching posts:', error);
            return this.mockPosts;
        }
    }

    // Subscribe to posts (real-time updates)
    subscribeToPosts(callback, limitCount = 50) {
        if (this.useMockData) {
            callback(this.mockPosts);
            return () => { }; // Return empty unsubscribe function
        }

        try {
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, orderBy('timestamp', 'desc'), limit(limitCount));

            return onSnapshot(q, (querySnapshot) => {
                const posts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate() || new Date()
                }));
                callback(posts);
            });
        } catch (error) {
            console.error('Error subscribing to posts:', error);
            callback(this.mockPosts);
            return () => { };
        }
    }

    // Create a new post
    async createPost(authorName, content, authorEmail = '') {
        if (this.useMockData) {
            const newPost = {
                id: Date.now().toString(),
                authorName,
                authorEmail,
                content,
                timestamp: new Date(),
                likesCount: 0,
                commentsCount: 0,
                comments: []
            };
            this.mockPosts.unshift(newPost);
            return newPost;
        }

        try {
            const postsRef = collection(db, 'posts');
            const docRef = await addDoc(postsRef, {
                authorName,
                authorEmail,
                content,
                timestamp: serverTimestamp(),
                likesCount: 0,
                commentsCount: 0
            });

            return {
                id: docRef.id,
                authorName,
                authorEmail,
                content,
                timestamp: new Date(),
                likesCount: 0,
                commentsCount: 0
            };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    // Get a single post by ID
    async getPost(postId) {
        if (this.useMockData) {
            return this.mockPosts.find(p => p.id === postId);
        }

        try {
            const postRef = doc(db, 'posts', postId);
            const postDoc = await getDoc(postRef);

            if (!postDoc.exists()) {
                return null;
            }

            return {
                id: postDoc.id,
                ...postDoc.data(),
                timestamp: postDoc.data().timestamp?.toDate() || new Date()
            };
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    }

    // Like a post
    async likePost(postId) {
        if (this.useMockData) {
            const post = this.mockPosts.find(p => p.id === postId);
            if (post) {
                post.likesCount++;
            }
            return;
        }

        try {
            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                likesCount: increment(1)
            });
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    }

    // Add a comment to a post
    async addComment(postId, authorName, content) {
        if (this.useMockData) {
            const post = this.mockPosts.find(p => p.id === postId);
            if (post) {
                const newComment = {
                    id: Date.now().toString(),
                    authorName,
                    content,
                    timestamp: new Date()
                };
                post.comments = post.comments || [];
                post.comments.push(newComment);
                post.commentsCount++;
            }
            return;
        }

        try {
            const postRef = doc(db, 'posts', postId);
            const commentsRef = collection(postRef, 'comments');

            await addDoc(commentsRef, {
                authorName,
                content,
                timestamp: serverTimestamp()
            });

            await updateDoc(postRef, {
                commentsCount: increment(1)
            });
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    // Get comments for a post
    async getComments(postId) {
        if (this.useMockData) {
            const post = this.mockPosts.find(p => p.id === postId);
            return post?.comments || [];
        }

        try {
            const postRef = doc(db, 'posts', postId);
            const commentsRef = collection(postRef, 'comments');
            const q = query(commentsRef, orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    }
    // Delete a post
    async deletePost(postId) {
        if (this.useMockData) {
            this.mockPosts = this.mockPosts.filter(p => p.id !== postId);
            return;
        }

        try {
            const postRef = doc(db, 'posts', postId);
            await deleteDoc(postRef);
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }
}

export default new SocialService();
