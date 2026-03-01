const lottoSetsContainer = document.getElementById('lotto-sets-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme switching logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButtonText(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButtonText(theme);
});

function updateThemeButtonText(theme) {
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lotto Generation Logic
function getBallColorClass(num) {
    if (num <= 10) return 'ball-yellow';
    if (num <= 20) return 'ball-blue';
    if (num <= 30) return 'ball-red';
    if (num <= 40) return 'ball-gray';
    return 'ball-green';
}

function generateNumberSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function renderNumberSets() {
    lottoSetsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const numbers = generateNumberSet();
        const rowElement = document.createElement('div');
        rowElement.classList.add('lotto-row');
        
        numbers.forEach(number => {
            const ballElement = document.createElement('div');
            ballElement.classList.add('lotto-ball', getBallColorClass(number));
            ballElement.textContent = number;
            rowElement.appendChild(ballElement);
        });
        
        lottoSetsContainer.appendChild(rowElement);
    }
}

generateBtn.addEventListener('click', renderNumberSets);
renderNumberSets();

// Diet Failure Cost Calculator Logic
const calcDietBtn = document.getElementById('calc-diet-btn');
const dietResult = document.getElementById('diet-result');
const totalCostValue = document.getElementById('total-cost-value');
const emotionalMsg = document.getElementById('emotional-msg');

calcDietBtn.addEventListener('click', () => {
    const pt = parseInt(document.getElementById('pt-cost').value) || 0;
    const gym = parseInt(document.getElementById('gym-cost').value) || 0;
    const supple = parseInt(document.getElementById('supple-cost').value) || 0;
    const food = parseInt(document.getElementById('food-cost').value) || 0;
    const yoyo = parseInt(document.getElementById('yoyo-cost').value) || 0;

    const total = pt + gym + supple + food + yoyo;
    
    totalCostValue.textContent = total.toLocaleString();
    dietResult.style.display = 'block';

    let message = "";
    if (total === 0) {
        message = "지출 내역을 입력해주세요. 여러분의 소중한 돈이 어디로 가고 있는지 확인이 필요합니다.";
    } else if (total < 100) {
        message = "이제 막 시작하셨군요! 더 큰 비용이 낭비되기 전에 제대로 된 방법을 찾아야 합니다.";
    } else if (total < 500) {
        message = "중고차 한 대 가격이 다이어트로 사라졌습니다. 요요의 굴레를 끊지 않으면 이 수치는 계속 늘어날 것입니다.";
    } else {
        message = "지금까지 수천만원을 투자했지만 남은 것은 무엇인가요? 이제는 '진짜' 전문가의 도움이 절실한 시점입니다.";
    }
    emotionalMsg.textContent = message;

    dietResult.scrollIntoView({ behavior: 'smooth' });
});

// Animal Face Test Logic
const URL = "https://teachablemachine.withgoogle.com/models/-DW_XAraC/";
let model, maxPredictions;

const uploadBtn = document.getElementById('upload-btn');
const imageInput = document.getElementById('image-input');
const faceImage = document.getElementById('face-image');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const retryBtn = document.getElementById('retry-btn');
const labelContainerElem = document.getElementById('label-container');

async function initModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

uploadBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            faceImage.style.display = 'block';
            uploadBtn.style.display = 'none';
            loading.style.display = 'block';
            
            if (!model) await initModel();
            predict();
        };
        reader.readAsDataURL(file);
    }
});

async function predict() {
    const prediction = await model.predict(faceImage);
    loading.style.display = 'none';
    resultArea.style.display = 'block';
    
    labelContainerElem.innerHTML = '';
    prediction.sort((a, b) => b.probability - a.probability);
    
    const topResult = prediction[0];
    document.getElementById('result-title').textContent = `당신은 ${topResult.className}상입니다!`;

    prediction.forEach(p => {
        const prob = (p.probability * 100).toFixed(0);
        const barWrapper = document.createElement('div');
        barWrapper.classList.add('bar-wrapper');
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = prob + '%';
        bar.textContent = `${p.className}: ${prob}%`;
        
        barWrapper.appendChild(bar);
        labelContainerElem.appendChild(barWrapper);
    });
}

retryBtn.addEventListener('click', () => {
    resultArea.style.display = 'none';
    faceImage.style.display = 'none';
    faceImage.src = '';
    uploadBtn.style.display = 'inline-block';
    imageInput.value = '';
});
