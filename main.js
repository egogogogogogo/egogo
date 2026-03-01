// Page Switching Logic
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-section');

function switchPage(targetId) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === targetId) {
            page.classList.add('active');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        switchPage(target);
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Initial Theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

// --- Weight Loss Cost Calculator (v2) ---
const v2CalcBtn = document.getElementById('v2-calc-btn');
const v2DietResult = document.getElementById('v2-diet-result');

if (v2CalcBtn) {
    v2CalcBtn.addEventListener('click', () => {
        const food = parseInt(document.getElementById('monthly-food').value) || 0;
        const gym = parseInt(document.getElementById('monthly-gym').value) || 0;
        const pt = parseInt(document.getElementById('monthly-pt').value) || 0;
        const supple = parseInt(document.getElementById('monthly-supple').value) || 0;
        const years = parseInt(document.getElementById('years-dieting').value) || 0;

        const monthlyTotal = food + gym + pt + supple;
        const lifetimeTotal = monthlyTotal * 12 * years;
        const projected5Years = monthlyTotal * 12 * 5;

        document.getElementById('lifetime-cost').textContent = (lifetimeTotal).toLocaleString() + '만원';
        document.getElementById('projected-cost').textContent = (projected5Years).toLocaleString() + '만원';

        let comparison = "";
        if (lifetimeTotal >= 5000) {
            comparison = `당신이 그동안 다이어트에 쓴 돈은 대형 세단 한 대 가격(${lifetimeTotal}만원)과 맞먹습니다.`;
        } else if (lifetimeTotal >= 2000) {
            comparison = `지금까지 지출한 비용으로 전 세계 비즈니스석 일주가 가능합니다.`;
        } else if (lifetimeTotal >= 500) {
            comparison = `명품 가방 수십 개를 살 수 있는 소중한 돈이 다이어트로 사라졌습니다.`;
        } else {
            comparison = `작은 시작이지만, 매몰비용이 더 커지기 전에 효율적인 방법을 찾아보세요.`;
        }
        
        document.getElementById('comparison-text').textContent = comparison;
        v2DietResult.style.display = 'block';
        v2DietResult.scrollIntoView({ behavior: 'smooth' });
    });
}

// --- Lotto Logic (Shared) ---
const lottoContainer = document.getElementById('lotto-sets-container');
const generateBtn = document.getElementById('generate-btn');

function getBallColor(num) {
    if (num <= 10) return 'ball-yellow';
    if (num <= 20) return 'ball-blue';
    if (num <= 30) return 'ball-red';
    if (num <= 40) return 'ball-gray';
    return 'ball-green';
}

function renderLotto() {
    if (!lottoContainer) return;
    lottoContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.classList.add('lotto-row');
        const nums = new Set();
        while (nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
        Array.from(nums).sort((a,b)=>a-b).forEach(n => {
            const ball = document.createElement('div');
            ball.classList.add('lotto-ball', getBallColor(n));
            ball.textContent = n;
            row.appendChild(ball);
        });
        lottoContainer.appendChild(row);
    }
}

if (generateBtn) generateBtn.addEventListener('click', renderLotto);
renderLotto();

// --- Animal Test Logic (Placeholder for brevity) ---
const uploadBtn = document.getElementById('upload-btn');
const imageInput = document.getElementById('image-input');
const faceImage = document.getElementById('face-image');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');

if (uploadBtn) {
    uploadBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                faceImage.src = ev.target.result;
                faceImage.style.display = 'block';
                uploadBtn.style.display = 'none';
                loading.style.display = 'block';
                setTimeout(() => {
                    loading.style.display = 'none';
                    resultArea.style.display = 'block';
                    document.getElementById('label-container').innerHTML = "AI 분석 결과: 강아지상 95%";
                }, 1500);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}
