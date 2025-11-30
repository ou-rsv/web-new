import React from 'react';

interface Post {
  id: number;
  title: string;
  text: string;
  tags: string[];
  date: string;
}

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onDelete: (postId: number) => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose, onDelete }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{post.title}</h2>
        <div className="modal-meta">
          <span>{formatDate(post.date)}</span>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <p>{post.text}</p>
        <div className="modal-actions">
          <button className="delete-btn" onClick={() => onDelete(post.id)}>
            🗑️ Удалить пост
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;