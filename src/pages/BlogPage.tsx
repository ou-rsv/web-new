import React, { useState, useEffect } from 'react';
import Header from '../features/posts/components/Header';
import PostList from '../features/posts/components/PostList';
import PostModal from '../features/posts/components/PostModal';
import AddPostModal from '../features/posts/components/AddPostModal';

// Типы для данных (копируем из вашего App.tsx)
interface Post {
  id: number;
  title: string;
  text: string;
  tags: string[];
  date: string;
}

interface PostFormData {
  title: string;
  text: string;
  tags: string;
}

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Загрузка данных из localStorage (из вашего App.tsx)
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setPosts(savedPosts);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Сохранение постов в localStorage
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  // Сохранение темы
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark');
  };

  const addPost = (postData: PostFormData): void => {
    const newPost: Post = {
      id: Date.now(),
      title: postData.title,
      text: postData.text,
      tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([newPost, ...posts]);
    setIsAddModalOpen(false);
  };

  const deletePost = (postId: number): void => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      setPosts(posts.filter(post => post.id !== postId));
      setSelectedPost(null);
    }
  };

  return (
    <div className="app">
      <Header 
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
        onAddPost={() => setIsAddModalOpen(true)}
      />
      
      <main className="main-content">
        <PostList 
          posts={posts}
          onPostClick={setSelectedPost}
        />
      </main>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={deletePost}
        />
      )}

      {isAddModalOpen && (
        <AddPostModal
          onClose={() => setIsAddModalOpen(false)}
          onAddPost={addPost}
        />
      )}

      <footer className="footer">
        <p>&copy; 2025 Мой блог</p>
      </footer>
    </div>
  );
}