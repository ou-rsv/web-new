import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import AddPostModal from './components/AddPostModal';

function App() {
  const [posts, setPosts] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark');
  };

  const addPost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      text: postData.text,
      tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([newPost, ...posts]);
    setIsAddModalOpen(false);
  };

  const deletePost = (postId) => {
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

export default App;