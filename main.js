const lottoSetsContainer = document.getElementById('lotto-sets-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme switching logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButtonText(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        theme = 'light';
    } else {
        theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButtonText(theme);
});

function updateThemeButtonText(theme) {
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
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
        const setElement = document.createElement('div');
        setElement.classList.add('lotto-numbers');
        
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('lotto-number');
            numberElement.textContent = number;
            setElement.appendChild(numberElement);
        });
        
        lottoSetsContainer.appendChild(setElement);
    }
}

generateBtn.addEventListener('click', renderNumberSets);
renderNumberSets();

// --- Animal Face Test Logic ---
const URL = "https://teachablemachine.withgoogle.com/models/-DW_XAraC/";
let model, labelContainer, maxPredictions;

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
    
    // Sort predictions by probability
    prediction.sort((a, b) => b.probability - a.probability);
    
    const topResult = prediction[0];
    const resultTitle = document.getElementById('result-title');
    resultTitle.textContent = `당신은 ${topResult.className}상입니다!`;

    prediction.forEach(p => {
        const barContainer = document.createElement('div');
        barContainer.classList.add('prediction-bar-container');
        
        const label = document.createElement('div');
        label.classList.add('prediction-label');
        label.textContent = p.className;
        
        const barWrapper = document.createElement('div');
        barWrapper.classList.add('bar-wrapper');
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        const prob = (p.probability * 100).toFixed(0);
        bar.style.width = prob + '%';
        bar.textContent = prob + '%';
        
        barWrapper.appendChild(bar);
        barContainer.appendChild(label);
        barContainer.appendChild(barWrapper);
        labelContainerElem.appendChild(barContainer);
    });
}

retryBtn.addEventListener('click', () => {
    resultArea.style.display = 'none';
    faceImage.style.display = 'none';
    faceImage.src = '';
    uploadBtn.style.display = 'inline-block';
    imageInput.value = '';
});
