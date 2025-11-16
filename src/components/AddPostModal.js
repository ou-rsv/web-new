import React, { useState } from 'react';

function AddPostModal({ onClose, onAddPost }) {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.text) {
      onAddPost(formData);
      setFormData({ title: '', text: '', tags: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Создать новый пост</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="postTitle">Заголовок:</label>
            <input 
              type="text" 
              id="postTitle"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required 
              maxLength="100" 
              placeholder="Введите заголовок поста"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postText">Текст:</label>
            <textarea 
              id="postText"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="6" 
              required 
              maxLength="1000" 
              placeholder="Напишите содержание поста..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="postTags">Теги (через запятую):</label>
            <input 
              type="text" 
              id="postTags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="путешествия, отдых, природа"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit">
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPostModal;