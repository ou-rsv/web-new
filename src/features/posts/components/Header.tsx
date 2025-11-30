import React from 'react';

interface HeaderProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onAddPost: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkTheme, onToggleTheme, onAddPost }) => {
  return (
    <header className="navbar-container">
      <div className="nav-content">
        <h1>📝 Мой блог</h1>
        <div className="nav-controls">
          <button className="theme-btn" onClick={onToggleTheme}>
            <span className="theme-icon">{isDarkTheme ? '☀️' : '🌙'}</span>
            <span className="theme-text">
              {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
            </span>
          </button>
          <button className="add-post-btn" onClick={onAddPost}>
            + Новый пост
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;