document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const searchBar = document.getElementById('search-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const bookGrid = document.getElementById('book-grid');
    const noResultsMessage = document.getElementById('no-results');
    const backToTopBtn = document.getElementById('back-to-top');
    const modalOverlay = document.getElementById('modal-overlay');

    let filters = { genre: 'all', searchTerm: '' };
    let currentSort = 'title-asc';

    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
    };

    const renderBooks = () => {
        let filteredBooks = booksData.filter(book => {
            const matchesGenre = filters.genre === 'all' || book.genre === filters.genre;
            const matchesSearch = book.title.toLowerCase().includes(filters.searchTerm) || book.author.toLowerCase().includes(filters.searchTerm);
            return matchesGenre && matchesSearch;
        });

        filteredBooks.sort((a, b) => {
            switch (currentSort) {
                case 'title-asc': return a.title.localeCompare(b.title);
                case 'title-desc': return b.title.localeCompare(a.title);
                case 'year-desc': return b.publish_year - a.publish_year;
                case 'year-asc': return a.publish_year - b.publish_year;
                default: return 0;
            }
        });

        bookGrid.innerHTML = '';
        if (filteredBooks.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            filteredBooks.forEach((book, index) => {
                const card = document.createElement('div');
                card.className = 'book-card';
                card.style.animationDelay = `${index * 50}ms`;
                card.dataset.bookId = book.id;
                card.innerHTML = `
                    <img src="images/${book.cover_image}" alt="Cover of ${book.title}" class="card-image" loading="lazy">
                    <div class="card-content">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                    </div>
                `;
                bookGrid.appendChild(card);
            });
        }
    };

    const openModal = (book) => {
        document.getElementById('modal-cover').src = `images/${book.cover_image}`;
        document.getElementById('modal-title').textContent = book.title;
        document.getElementById('modal-author').innerHTML = `<strong>Author:</strong> ${book.author}`;
        document.getElementById('modal-year').innerHTML = `<strong>Published:</strong> ${book.publish_year}`;
        document.getElementById('modal-genre').innerHTML = `<strong>Genre:</strong> ${book.genre}`;
        document.getElementById('modal-description').textContent = book.description;
        modalOverlay.classList.add('show');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('show');
    };

    // --- EVENT LISTENERS ---
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    searchBar.addEventListener('input', (e) => {
        filters.searchTerm = e.target.value.toLowerCase();
        renderBooks();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderBooks();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.genre = btn.dataset.genre;
            renderBooks();
        });
    });

    bookGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.book-card');
        if (card) {
            const bookId = card.dataset.bookId;
            const book = booksData.find(b => b.id == bookId);
            if (book) openModal(book);
        }
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    renderBooks();
});