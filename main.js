// Mock Data for News Feed (Reflecting 2026 Environmental Context)
const articles = [
    {
        id: 1,
        tag: 'Climate',
        title: 'Yale e360: 북극해 해빙 속도, 2026년 기점 임계점 돌파 경고',
        img: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=600&q=80',
        date: '2026.03.01'
    },
    {
        id: 2,
        tag: 'Zero Waste',
        title: 'Grist: 샌프란시스코, 세계 최초 도시 전역 ‘제로 플라스틱’ 조례 시행',
        img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
        date: '2026.02.28'
    },
    {
        id: 3,
        tag: 'Policy',
        title: 'EU 탄소배출권 가격 t당 150유로 돌파... 국내 수출 기업 비상',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        date: '2026.02.25'
    },
    {
        id: 4,
        tag: 'Tech',
        title: '테슬라, 차세대 LFP 배터리 팩에 재활용 구리 90% 적용 발표',
        img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80',
        date: '2026.02.20'
    },
    {
        id: 5,
        tag: 'Nature',
        title: '브라질 아마존 열대우림 복원 면적, 축구장 100만 개 돌파',
        img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80',
        date: '2026.02.15'
    },
    {
        id: 6,
        tag: 'Trend',
        title: '2026 리사이클 패션 위크: "버려진 그물도 오뜨쿠튀르가 된다"',
        img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
        date: '2026.02.10'
    }
];

// Navigation Logic
const navLinks = document.querySelectorAll('.main-nav a, .logo a');
const pages = document.querySelectorAll('.page-section');

function navigateTo(targetId) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === targetId) {
            page.classList.add('active');
        }
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(targetId)) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render News Feed
const newsGrid = document.getElementById('news-grid');

function renderArticles() {
    if (!newsGrid) return;
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

/**
 * [자동 업데이트 가이드]
 * 매일 새로운 뉴스를 업데이트하려면 아래 방법을 추천합니다:
 * 1. RSS Parser: Grist(https://grist.org/feed/) 등의 RSS 피드를 JavaScript로 파싱합니다.
 * 2. Fetch API: 서버 측(Node.js 등)에서 주기적으로 피드를 읽어 articles.json 파일을 갱신합니다.
 * 3. GitHub Actions: 하루에 한 번 스크립트를 실행하여 GitHub 저장소 데이터를 업데이트하고 배포합니다.
 */

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
});
