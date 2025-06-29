document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        preloader: document.getElementById('preloader'),
        navbar: document.getElementById('navbar'),
        themeToggle: document.getElementById('theme-toggle'),
        searchBar: document.getElementById('search-bar'),
        bookGrid: document.getElementById('book-grid'),
        liveStats: document.getElementById('live-stats'),
        loadMoreBtn: document.getElementById('load-more-btn'),
        modalOverlay: document.getElementById('modal-overlay'),
        backToTopBtn: document.getElementById('back-to-top'),
        quoteDisplay: document.getElementById('quote-display'),
        quoteText: document.getElementById('quote-text'),
        quoteAuthor: document.getElementById('quote-author'),
    };

    const quotes = [
        { text: "So we beat on, boats against the current, borne back ceaselessly into the past.", author: "F. Scott Fitzgerald, The Great Gatsby" },
        { text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", author: "Jane Austen, Pride and Prejudice" },
        { text: "I am no bird; and no net ensnares me: I am a free human being with an independent will.", author: "Charlotte Brontë, Jane Eyre" },
        { text: "All that is gold does not glitter, Not all those who wander are lost.", author: "J.R.R. Tolkien, The Fellowship of the Ring" },
        { text: "The mystery of life isn't a problem to solve, but a reality to experience.", author: "Frank Herbert, Dune" }
    ];

    const state = {
        allBooks: [],
        filteredBooks: [],
        booksPerPage: 8,
        currentPage: 1,
        searchTerm: '',
        currentQuoteIndex: 0,
    };

    const fetchData = async () => {
        try {
            const response = await fetch('api.php');
            if (!response.ok) throw new Error('Network response was not ok');
            state.allBooks = await response.json();
            state.filteredBooks = state.allBooks;
            init();
        } catch (error) {
            console.error('Failed to fetch books:', error);
            elements.bookGrid.innerHTML = `<p class="error-message">Could not load books. Please try again later.</p>`;
        } finally {
            elements.preloader.classList.add('hidden');
        }
    };

    const renderBooks = () => {
        const startIndex = 0;
        const endIndex = state.currentPage * state.booksPerPage;
        const booksToRender = state.filteredBooks.slice(startIndex, endIndex);

        elements.bookGrid.innerHTML = '';
        booksToRender.forEach(book => {
            const card = createBookCard(book);
            elements.bookGrid.appendChild(card);
        });

        observeCards();
        updateUI();
    };

    const createBookCard = (book) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.bookId = book.id;
        card.innerHTML = `
            <img src="images/${book.cover_image}" alt="Cover of ${book.title}" class="card-image" loading="lazy">
            <div class="card-content">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            </div>
        `;
        return card;
    };

    const renderModal = (book) => {
        elements.modalOverlay.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" id="modal-close">×</span>
                <img src="images/${book.cover_image}" alt="Book Cover" class="modal-cover">
                <div class="modal-info">
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Published:</strong> ${book.publish_year}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p class="modal-description">${book.description}</p>
                </div>
            </div>
        `;
        elements.modalOverlay.classList.add('show');
    };

    const closeModal = () => {
        elements.modalOverlay.classList.remove('show');
    };

    const updateUI = () => {
        const booksShown = Math.min(state.currentPage * state.booksPerPage, state.filteredBooks.length);
        elements.liveStats.textContent = `Showing ${booksShown} of ${state.filteredBooks.length} tomes`;
        elements.loadMoreBtn.classList.toggle('hidden', booksShown >= state.filteredBooks.length);
    };

    const applyFilterAndSearch = () => {
        state.filteredBooks = state.allBooks.filter(book =>
            book.title.toLowerCase().includes(state.searchTerm) || book.author.toLowerCase().includes(state.searchTerm)
        );
        state.currentPage = 1;
        renderBooks();
    };

    const observeCards = () => {
        const cards = document.querySelectorAll('.book-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));
    };

    const initQuoteCarousel = () => {
        if (!elements.quoteDisplay) return;
        showNextQuote();
        setInterval(showNextQuote, 8000);
    };

    const showNextQuote = () => {
        elements.quoteDisplay.classList.add('fade-out');
        setTimeout(() => {
            state.currentQuoteIndex = (state.currentQuoteIndex + 1) % quotes.length;
            const quote = quotes[state.currentQuoteIndex];
            elements.quoteText.textContent = `“${quote.text}”`;
            elements.quoteAuthor.textContent = `— ${quote.author}`;
            elements.quoteDisplay.classList.remove('fade-out');
        }, 700);
    };

    const setupEventListeners = () => {
        elements.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        elements.searchBar.addEventListener('input', (e) => {
            state.searchTerm = e.target.value.toLowerCase();
            applyFilterAndSearch();
        });

        elements.loadMoreBtn.addEventListener('click', () => {
            state.currentPage++;
            renderBooks();
        });

        elements.bookGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.book-card');
            if (!card) return;
            const book = state.allBooks.find(b => b.id == card.dataset.bookId);
            if (book) {
                renderModal(book);
            }
        });

        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay' || e.target.classList.contains('modal-close')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && elements.modalOverlay.classList.contains('show')) {
                closeModal();
            }
        });

        window.addEventListener('scroll', () => {
            elements.navbar.classList.toggle('scrolled', window.scrollY > 50);
            elements.backToTopBtn.classList.toggle('show', window.scrollY > 300);
        });

        elements.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    const init = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('light-mode', savedTheme === 'light');
        }

        initQuoteCarousel();
        renderBooks();
        setupEventListeners();
    };

    fetchData();
});