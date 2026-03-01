// 1. RSS News Fetching (English)
const FEEDS = ['https://grist.org/feed/', 'https://e360.yale.edu/feed'];

async function loadNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    try {
        const results = await Promise.all(FEEDS.map(f => 
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f)}`).then(r => r.json())
        ));

        let items = results.flatMap(r => r.items || []).sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate)).slice(0, 12);

        grid.innerHTML = items.map(item => `
            <article class="article-card hover-lift">
                <div class="hover-zoom">
                    <img src="${item.thumbnail || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'}" alt="News">
                </div>
                <div class="article-content">
                    <span class="article-meta">${new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                </div>
            </article>
        `).join('');
    } catch (e) {
        grid.innerHTML = '<p>Failed to sync global news. Please try again later.</p>';
    }
}

// 2. Intersection Observer for Chart Animations
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.height = entry.target.dataset.targetHeight;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initCharts() {
    document.querySelectorAll('.bar-anim').forEach(bar => {
        bar.dataset.targetHeight = bar.style.height;
        bar.style.height = '0'; // Reset for animation
        observer.observe(bar);
    });
}

// 3. Scroll Spy (Navigation highlight)
const sections = document.querySelectorAll('.scroll-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

// 4. Language Translation Logic
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ko,en,ja,zh-CN,es,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

function changeLanguage(langCode) {
    if (!langCode) return;
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
    }
}

// 5. Init
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    initCharts();
});
