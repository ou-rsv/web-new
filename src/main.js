import './style.css';

const postsContainer = document.getElementById("posts");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalDate = document.getElementById("modal-date");
const modalTags = document.getElementById("modal-tags");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");
const themeText = document.querySelector(".theme-text");
const themeIcon = document.querySelector(".theme-icon");
const deletePostBtn = document.getElementById("deletePost");

// Элементы для добавления постов
const addPostBtn = document.getElementById("addPostBtn");
const addPostModal = document.getElementById("addPostModal");
const closeAddModal = document.getElementById("closeAddModal");
const cancelPost = document.getElementById("cancelPost");
const postForm = document.getElementById("postForm");

// Переменная для хранения ID текущего открытого поста
let currentPostId = null;

// Загрузка постов из localStorage - ПУСТОЙ МАССИВ по умолчанию
let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// Функция для сохранения постов в localStorage
function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Функция для форматирования даты
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Функция для генерации постов
function renderPosts() {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h2>Пока нет постов</h2>
                <p>Создайте свой первый пост, нажав на кнопку "Новый пост" выше</p>
                <p><small>Ваши посты будут сохраняться автоматически</small></p>
            </div>
        `;
        postsContainer.classList.remove('posts-grid');
        return;
    }
    
    postsContainer.classList.add('posts-grid');
    
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.text.slice(0, 100)}${post.text.length > 100 ? '...' : ''}</p>
            <div class="post-meta">
                <span>${formatDate(post.date)}</span>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        postElement.addEventListener("click", () => {
            openPostModal(post);
        });
        
        postsContainer.appendChild(postElement);
    });
}

// Функция для открытия модального окна с постом
function openPostModal(post) {
    currentPostId = post.id;
    modalTitle.textContent = post.title;
    modalText.textContent = post.text;
    modalDate.textContent = formatDate(post.date);
    modalTags.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    modal.style.display = "flex";
}

// Функция для удаления поста
function deleteCurrentPost() {
    if (!currentPostId) return;
    
    if (confirm('Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.')) {
        // Находим индекс поста по ID
        const postIndex = posts.findIndex(post => post.id === currentPostId);
        
        if (postIndex !== -1) {
            // Удаляем пост из массива
            posts.splice(postIndex, 1);
            
            // Сохраняем изменения
            savePosts();
            
            // Перерисовываем посты
            renderPosts();
            
            // Закрываем модальное окно
            closeAllModals();
            
            // Показываем сообщение об успешном удалении
            showNotification('Пост успешно удален!');
        }
    }
}

// Функция для показа уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px var(--shadow);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Функция для открытия модального окна добавления поста
function openAddPostModal() {
    postForm.reset();
    addPostModal.style.display = "flex";
}

// Функция для закрытия всех модальных окон
function closeAllModals() {
    modal.style.display = "none";
    addPostModal.style.display = "none";
    currentPostId = null;
}

// Функция для обновления текста темы
function updateThemeText() {
    const isDark = document.body.classList.contains('dark');
    themeText.textContent = isDark ? 'Светлая тема' : 'Темная тема';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
}

// Обработчики событий
closeModal.addEventListener("click", closeAllModals);
closeAddModal.addEventListener("click", closeAllModals);
cancelPost.addEventListener("click", closeAllModals);

// Удаление поста
deletePostBtn.addEventListener("click", deleteCurrentPost);

// Переключение темы
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateThemeText();
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Добавление нового поста
postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("postTitle").value;
    const text = document.getElementById("postText").value;
    const tags = document.getElementById("postTags").value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    
    const newPost = {
        id: Date.now(), // Уникальный ID на основе времени
        title,
        text,
        date: new Date().toISOString().split('T')[0],
        tags: tags.length > 0 ? tags : ["личное"]
    };
    
    posts.unshift(newPost); // Добавляем в начало массива
    savePosts();
    renderPosts();
    closeAllModals();
    showNotification('Пост успешно создан!');
});

// Открытие модального окна добавления поста
addPostBtn.addEventListener("click", openAddPostModal);

// Закрытие модальных окон при клике вне контента
window.addEventListener("click", (e) => {
    if (e.target === modal) closeAllModals();
    if (e.target === addPostModal) closeAllModals();
});

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Загрузка сохраненной темы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    updateThemeText();
    renderPosts();
    
    // Показываем приветственное сообщение если постов нет
    if (posts.length === 0) {
        setTimeout(() => {
            showNotification('Добро пожаловать! Создайте свой первый пост.');
        }, 1000);
    }
});