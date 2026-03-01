// 1. RSS News Fetching (Strict 12 items, 3-column distribution)
const FEEDS = [
    'https://grist.org/feed/',
    'https://e360.yale.edu/feed'
];

async function loadNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    try {
        const results = await Promise.all(FEEDS.map(f => 
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f)}`).then(r => r.json())
        ));

        let items = results.flatMap(r => r.items || [])
            .sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate))
            .slice(0, 12);

        grid.innerHTML = items.map(item => `
            <article class="article-card hover-lift">
                <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'}" alt="Environmental News">
                <div class="article-content">
                    <span class="article-meta">${new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                </div>
            </article>
        `).join('');
    } catch (e) {
        console.error("RSS Error:", e);
        grid.innerHTML = '<p class="loading-news">Unable to sync global intelligence. Please refresh.</p>';
    }
}

// 2. Intersection Observer for Smooth Visual Effects
const observerOptions = { threshold: 0.15 };
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('bar-anim')) {
                entry.target.style.height = entry.target.dataset.targetHeight;
            }
            entry.target.classList.add('in-view');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    document.querySelectorAll('.bar-anim').forEach(bar => {
        bar.dataset.targetHeight = bar.style.height;
        bar.style.height = '0';
        scrollObserver.observe(bar);
    });
    document.querySelectorAll('.vivid-card, .article-card, .product-card, .report-card').forEach(el => {
        scrollObserver.observe(el);
    });
}

// 3. Scroll Spy (Precise Navigation Highlight)
const sections = document.querySelectorAll('.scroll-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + (window.innerHeight / 3);

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
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

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    initAnimations();
});
