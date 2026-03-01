// Mock Data for News Feed
const articles = [
    {
        id: 1,
        tag: 'Climate',
        title: '북극곰의 마지막 피난처, 그린란드 빙하가 녹고 있다',
        img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.15'
    },
    {
        id: 2,
        tag: 'Zero Waste',
        title: '일주일간 플라스틱 없이 살기: 에디터 체험기',
        img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.12'
    },
    {
        id: 3,
        tag: 'Tech',
        title: '탄소 포집 기술(CCS)은 기후 위기의 구원투수가 될까?',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.10'
    },
    {
        id: 4,
        tag: 'Policy',
        title: 'EU의 탄소국경조정제도(CBAM), 한국 기업의 대응 전략',
        img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.08'
    },
    {
        id: 5,
        tag: 'Trend',
        title: '비건 레더의 진화: 선인장에서 버섯 가죽까지',
        img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.05'
    },
    {
        id: 6,
        tag: 'Ocean',
        title: '미세 플라스틱, 우리의 식탁을 위협하다',
        img: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=600&q=80',
        date: '2024.03.01'
    }
];

// Navigation Logic
const navLinks = document.querySelectorAll('.main-nav a, .logo a, .footer-col a');
const pages = document.querySelectorAll('.page-section');
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.main-nav');

function navigateTo(targetId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === targetId) {
            page.classList.add('active');
        }
    });

    // Update active nav link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(targetId)) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    mobileNav.classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

// Render News Feed
const newsGrid = document.getElementById('news-grid');

function renderArticles() {
    newsGrid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-img">
                <img src="${article.img}" alt="${article.title}">
            </div>
            <div class="article-content">
                <span class="article-meta">${article.tag} • ${article.date}</span>
                <h3>${article.title}</h3>
            </div>
        </article>
    `).join('');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
});

// Load More Button (Mock)
const loadMoreBtn = document.querySelector('.load-more button');
loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.textContent = 'Loading...';
    setTimeout(() => {
        // Duplicate articles for demo
        articles.forEach(article => {
            const clone = {...article, id: article.id + 10};
            const div = document.createElement('div'); // Temporary container
            div.innerHTML = `
                <article class="article-card">
                    <div class="article-img">
                        <img src="${clone.img}" alt="${clone.title}">
                    </div>
                    <div class="article-content">
                        <span class="article-meta">${clone.tag} • ${clone.date}</span>
                        <h3>${clone.title}</h3>
                    </div>
                </article>
            `;
            newsGrid.appendChild(div.firstElementChild);
        });
        loadMoreBtn.textContent = 'Load More News';
    }, 1000);
});
