import React from 'react';

interface Post {
  id: number;
  title: string;
  text: string;
  tags: string[];
  date: string;
}

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>Пока нет постов</h2>
        <p>Создайте свой первый пост, нажав на кнопку "Новый пост" выше</p>
        <p><small>Ваши посты будут сохраняться автоматически</small></p>
      </div>
    );
  }

  return (
    <div className="posts-grid">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="post"
          onClick={() => onPostClick(post)}
        >
          <h2>{post.title}</h2>
          <p>{post.text.slice(0, 100)}{post.text.length > 100 ? '...' : ''}</p>
          <div className="post-meta">
            <span>{formatDate(post.date)}</span>
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;