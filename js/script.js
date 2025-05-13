const textInput = document.getElementById('input-text');
const excludeSpaces = document.getElementById('exclude-spaces');
const charLimit = document.getElementById('char-limit');

function updateStats() {
    let text = textInput.value;

    // Handle character limit
    if (charLimit.checked) {
        text = text.slice(0, 250);
        textInput.value = text;
    }

    // Character count
    let totalChars = excludeSpaces.checked
        ? text.replace(/\s/g, '').length
        : text.length;
    document.getElementById('totalChars').textContent = totalChars;

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;

    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    document.getElementById('sentenceCount').textContent = sentences.length;

    // Letter density
    const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');
    const charCount = {};

    for (let char of cleanText) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    const sortedChars = Object.entries(charCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const densityHTML = sortedChars.map(([char, count]) => `
        <div>${char.toUpperCase()} | ${count} (${((count / cleanText.length) * 100).toFixed(2)}%)</div>
    `).join('');

    document.getElementById('letterDensity').innerHTML = densityHTML;
}

textInput.addEventListener('input', updateStats);
excludeSpaces.addEventListener('change', updateStats);
charLimit.addEventListener('change', updateStats);