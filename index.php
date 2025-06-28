<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechBook - Your Digital Library</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>">
</head>
<body>

    <div id="preloader" class="preloader">
        <div class="spinner"></div>
    </div>

    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="#" class="nav-brand">📚 TechBook</a>
            <button class="theme-toggle" id="theme-toggle" title="Toggle dark/light mode">
                <svg id="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg id="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
        </div>
    </nav>

    <header class="site-header">
        <div class="container">
            <h1>Discover Your Next Favorite Book</h1>
            <p>An interactive library of timeless classics and modern masterpieces.</p>
            <div class="search-container">
                 <input type="search" id="search-bar" placeholder="Search by title or author...">
            </div>
        </div>
    </header>
    
    <main class="main-content container">
        <div class="controls-container">
            <div class="live-stats" id="live-stats"></div>
        </div>
        
        <div class="book-grid" id="book-grid">
        </div>
        
        <div class="load-more-container" id="load-more-container">
            <button id="load-more-btn" class="load-more-btn">Load More</button>
        </div>
    </main>

    <div class="modal-overlay" id="modal-overlay">
    </div>

    <footer class="site-footer-bottom">
        <p>© <?php echo date("Y"); ?> TechBook. All Rights Reserved.</p>
    </footer>

    <button id="back-to-top" class="back-to-top" title="Back to Top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
    </button>
    
    <script src="script.js"></script>
</body>
</html>