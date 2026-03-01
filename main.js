const lottoSetsContainer = document.getElementById('lotto-sets-container');
const generateBtn = document.getElementById('generate-btn');

function generateNumberSet() {
    const numbers = new Set();
    while (numbers.size < 6) { // Generate 6 numbers per set
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b); // Sort for readability
}

function renderNumberSets() {
    lottoSetsContainer.innerHTML = ''; // Clear previous sets
    for (let i = 0; i < 5; i++) { // Generate 5 sets
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

// Initial generation
renderNumberSets();
