// 1. सभी 20 अध्यायों की सूची (Image Data)
const chapters = [
    { id: 1, title: "1. छत्तीसगढ़ का भौगोलिक परिचय" },
    { id: 2, title: "2. छत्तीसगढ़ में सर्वप्रथम" },
    { id: 3, title: "3. छत्तीसगढ़ में जनगणना 2011" },
    { id: 4, title: "4. छत्तीसगढ़ में जल संसाधन" },
    { id: 5, title: "5. छत्तीसगढ़ में वन सम्पदा एवं वन्य जीव" },
    { id: 6, title: "6. छत्तीसगढ़ में खनिज सम्पदा एवं उद्योग" },
    { id: 7, title: "7. छत्तीसगढ़ में कृषि, मत्स्य एवं पशुपालन" },
    { id: 8, title: "8. छत्तीसगढ़ में ऊर्जा परिदृश्य" },
    { id: 9, title: "9. छत्तीसगढ़ की राजव्यवस्था" },
    { id: 10, title: "10. छत्तीसगढ़ में पुलिस, जेल एवं न्याय प्रशासन" },
    { id: 11, title: "11. छत्तीसगढ़ में शिक्षा व साहित्य" },
    { id: 12, title: "12. छत्तीसगढ़ का इतिहास पुरातत्व एवं स्थापत्य कला" },
    { id: 13, title: "13. छत्तीसगढ़ में कला एवं संस्कृति" },
    { id: 14, title: "14. छत्तीसगढ़ की जनजातियाँ" },
    { id: 15, title: "15. छत्तीसगढ़ में पुरस्कार एवं माध्यम" },
    { id: 16, title: "16. छत्तीसगढ़ की प्रमुख योजनाएँ" },
    { id: 17, title: "17. छत्तीसगढ़ का क्रीड़ा जगत" },
    { id: 18, title: "18. छत्तीसगढ़ में परिवहन" },
    { id: 19, title: "19. छत्तीसगढ़ में पर्यटन" },
    { id: 20, title: "20. छत्तीसगढ़ में विविध तथ्य" }
];

// 2. MCQs Database Structure (आप जैसे-जैसे प्रश्न देंगे, यहाँ जोड़ते जाएंगे)
const mcqDatabase = {
    1: [
        {
            question: "छत्तीसगढ़ राज्य का कुल क्षेत्रफल कितना है?",
            options: ["1,35,192 वर्ग किमी", "1,60,200 वर्ग किमी", "1,25,400 वर्ग किमी", "1,45,320 वर्ग किमी"],
            correct: 0,
            explanation: "छत्तीसगढ़ का कुल भौगोलिक क्षेत्रफल लगभग 1,35,192 वर्ग किलोमीटर है, जो भारत के कुल क्षेत्रफल का लगभग 4.11% है।"
        }
    ],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: []
};

// Current App State
let currentChapterId = 1;
let currentQuestionIndex = 0;

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const chapterNav = document.getElementById('chapterNav');
const themeToggle = document.getElementById('themeToggle');
const currentChapterTitle = document.getElementById('currentChapterTitle');
const quizStatus = document.getElementById('quizStatus');
const questionArea = document.getElementById('questionArea');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Sidebar Control
function toggleDrawer() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuToggle.addEventListener('click', toggleDrawer);
closeSidebar.addEventListener('click', toggleDrawer);
overlay.addEventListener('click', toggleDrawer);

// Populate Chapters in Sidebar
function initChapterList() {
    chapterNav.innerHTML = '';
    chapters.forEach((chap) => {
        const btn = document.createElement('button');
        btn.className = `chapter-item ${chap.id === currentChapterId ? 'active' : ''}`;
        btn.textContent = chap.title;
        btn.onclick = () => {
            currentChapterId = chap.id;
            currentQuestionIndex = 0;
            initChapterList();
            loadQuiz();
            toggleDrawer();
        };
        chapterNav.appendChild(btn);
    });
}

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
});

// Render Quiz Content
function loadQuiz() {
    const activeChap = chapters.find(c => c.id === currentChapterId);
    currentChapterTitle.textContent = activeChap.title;
    
    const questions = mcqDatabase[currentChapterId] || [];
    quizStatus.textContent = questions.length ? `प्रश्न ${currentQuestionIndex + 1} / ${questions.length}` : "कोई प्रश्न उपलब्ध नहीं है";

    if (!questions.length) {
        questionArea.innerHTML = `<p style="padding: 1rem 0; color: var(--text-secondary);">इस अध्याय के प्रश्न जल्द ही जोड़े जाएंगे।</p>`;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;

    const q = questions[currentQuestionIndex];
    let html = `
        <div class="question-title">Q${currentQuestionIndex + 1}. ${q.question}</div>
        <div class="options-grid">
    `;

    q.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="checkAnswer(${idx})">${opt}</button>`;
    });

    html += `</div><div id="explanationContainer"></div>`;
    questionArea.innerHTML = html;
}

// Option Click & Answer Checking
window.checkAnswer = function(selectedIndex) {
    const questions = mcqDatabase[currentChapterId];
    const q = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.classList.add('correct');
        } else if (idx === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (q.explanation) {
        const expBox = document.createElement('div');
        expBox.className = 'explanation-box';
        expBox.innerHTML = `<strong>व्याख्या:</strong> ${q.explanation}`;
        document.getElementById('explanationContainer').appendChild(expBox);
    }
};

// Navigation Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuiz();
    }
});

nextBtn.addEventListener('click', () => {
    const questions = mcqDatabase[currentChapterId];
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuiz();
    }
});

// Initial Setup
initChapterList();
loadQuiz();
