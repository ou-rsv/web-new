import React from 'react';

function PostModal({ post, onClose, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
}

export default PostModal;