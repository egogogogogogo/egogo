// 1. Language Translation Logic (Limited to 10 Languages)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ko',
        includedLanguages: 'ko,en,ja,zh-CN,es,fr,de,vi,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

function changeLanguage(langCode) {
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
        googleSelect.value = langCode;
        googleSelect.dispatchEvent(new Event('change'));
    }
}

// 2. Real-time RSS News Fetching (using rss2json API)
const NEWS_FEEDS = [
    'https://grist.org/feed/',
    'https://e360.yale.edu/feed'
];

async function fetchNews() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    try {
        // Fetch from multiple feeds and combine
        const allArticles = [];
        for (const feed of NEWS_FEEDS) {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`);
            const data = await response.json();
            if (data.status === 'ok') {
                allArticles.push(...data.items.slice(0, 3)); // Get top 3 from each
            }
        }

        // Sort by date and render
        allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        
        newsGrid.innerHTML = allArticles.map(item => `
            <article class="article-card">
                <div class="article-img">
                    <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'}" alt="${item.title}">
                </div>
                <div class="article-content">
                    <span class="article-meta">${new Date(item.pubDate).toLocaleDateString()}</span>
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error('Error fetching news:', error);
        newsGrid.innerHTML = '<p>뉴스를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
    }
}

// 3. Scroll Spy Implementation
const sections = document.querySelectorAll('.scroll-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 4. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    
    // Theme logic (if kept)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});
