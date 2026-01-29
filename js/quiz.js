// ---------------------------
// Данные для теста
// ---------------------------
const quizData = [
    {
        question: "Какого числа мы познакомились?",
        answers: ["15 марта", "23 апреля", "7 мая", "11 июня"],
        correct: '11 июня', // <- правильный ответ
        fact: "Это был прекрасный день, который изменил мою жизнь навсегда ❤️"
    },
    {
        question: "Когда мы начали встречаться ?",
        answers: ["11 марта", "12 октября", "21 августа", "13 октября"],
        correct: '13 октября',
        fact: "смотри ка, помнит !"
    },
    {
        question: "Сколько детей у нас будет?",
        answers: ["1", "10", "2", "3"],
        correct: '10',
        fact: "ахахахаххахаа, шучу , 1💕"
    },
    {
        question: "Какого цвета у меня глаза",
        answers: ["зелёные", "Синие", "Чёрные", "Карие"],
        correct: 'зелёные',
        fact: "В розовом ты выглядишь как настоящая принцесса 👑"
    },
    {
        question: "Мой любимый перс?",
        answers: ["Arlekino", "Furina", "Colombina", "Your Ass"],
        correct: 'Your Ass',
        fact: "ладно ладно , если перс то 1"
    },
    {
        question: "Кого мы любим ?",
        answers: ["Меня", "Тебя", "Коломбину", "Дочку"],
        correct: 'Дочку',
        fact: "ну ладно , и меня и тебя и дочу "
    },
    {
        question: "Сегодня го Вирт?",
        answers: ["да", "да", "нет", "да"],
        correct:'да',
        fact: "если ответила бы - да но передумала ,ого , я удивлён"
    },
    {
        question: "Что мы делаем утром вместе?",
        answers: ["пишем Доброе утро", "кушать", "Всё", "Мечтаем оказаться рядом"],
        correct: 'Всё',
        fact: "Ну по факту же , хехех"
    },
    {
        question: "Что нам обоим нравится делать вечером?",
        answers: ["Дрочить", "Звонок", "Кушать", "Играть в игры"],
        correct: 'Звонок',
        fact: "Так и знал , но и 1 с 4 не хуже ✨"
    },
    {
        question: "Сколько месяцев мы вместе?",
        answers: ["10 месяцев", "1 год", "1 год и 4 месяца", "2 года"],
        correct: '1 год и 4 месяца',
        fact: "Каждый из этих дней был наполнен любовью и счастьем 💝"
    }
];

let currentQuestion = 0; // индекс текущего вопроса
let score = 0;           // количество правильных ответов

// ---------------------------
// Показ вопроса
// ---------------------------
function showQuestion() {
    const questionEl = document.getElementById('quizQuestion');
    const answersEl = document.getElementById('quizAnswers');
    const progressEl = document.getElementById('progressBar');
    
    const question = quizData[currentQuestion];
    
    // Показываем вопрос
    questionEl.innerHTML = `<div>${question.question}</div>`;

    // Очищаем старые ответы
    answersEl.innerHTML = '';

    // Показываем варианты ответов
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('div');
        answerBtn.className = 'quiz-answer';
        answerBtn.textContent = answer;
        answerBtn.onclick = () => checkAnswer(index); // обработка клика
        answersEl.appendChild(answerBtn);
    });

    // Прогресс-бар (теперь доходят до 100%)
    progressEl.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

    // Убираем старый факт, если есть
    const oldFact = document.getElementById('quizFact');
    if (oldFact) oldFact.remove();
}

// ---------------------------
// Проверка ответа
// ---------------------------
function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const correctAnswer = question.correct.trim(); // убираем лишние пробелы
    const answers = document.querySelectorAll('.quiz-answer');

    // Отключаем возможность кликать повторно
    answers.forEach(btn => btn.onclick = null);

    // Проверяем выбранный вариант
    if (answers[selectedIndex].textContent.trim() === correctAnswer) {
        answers[selectedIndex].classList.add('correct');
        score++;
    } else {
        answers[selectedIndex].classList.add('wrong');
        // подсвечиваем правильный ответ
        answers.forEach(btn => {
            if (btn.textContent.trim() === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Показ факта после небольшой задержки
    setTimeout(() => {
        const factDiv = document.createElement('div');
        factDiv.id = 'quizFact'; // id нужен для удаления старого факта
        factDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 77, 109, 0.2);
            border-radius: 10px;
            text-align: center;
            font-style: italic;
        `;
        factDiv.textContent = question.fact;
        document.getElementById('quizQuestion').appendChild(factDiv);
    }, 500);

    // Переход к следующему вопросу через 2.5 секунды (можно менять)
    setTimeout(nextQuestion, 2500);
}

// ---------------------------
// Следующий вопрос
// ---------------------------
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// ---------------------------
// Показ результатов
// ---------------------------
function showResult() {
    const resultEl = document.getElementById('quizResult');
    const titleEl = document.getElementById('resultTitle');
    const messageEl = document.getElementById('resultMessage');
    const scoreEl = document.getElementById('resultScore');
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    titleEl.textContent = "Результаты теста 💕";
    scoreEl.textContent = `${score}/${quizData.length} (${percentage}%)`;
    
    if (percentage >= 90) {
        messageEl.textContent = "Вау! Я знаю тебя лучше, чем ты думаешь! Каждый момент нашей любви навсегда в моём сердце ❤️";
    } else if (percentage >= 70) {
        messageEl.textContent = "Отлично! Я помню почти всё о нас. Наша любовь очень важна для меня 💝";
    } else {
        messageEl.textContent = "Неплохо! Но я обещаю запомнить ещё больше моментов нашей любви 🌹";
    }
    
    resultEl.classList.add('show');
}

// ---------------------------
// Перезапуск теста
// ---------------------------
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizResult').classList.remove('show');
    showQuestion();
}

// ---------------------------
// Поддержка выбора цифрой с клавиатуры (1,2,3,4)
// ---------------------------
document.addEventListener('keydown', (e) => {
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= quizData[currentQuestion].answers.length) {
        checkAnswer(num - 1); // вычитаем 1, так как массив начинается с 0
    }
});

// ---------------------------
// Инициализация при загрузке страницы
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        showQuestion();
    }
});
