let questions = [
    {
        "question": "Ist die Erde Flach?",
        "answer_1": "Ja, die Erde ist Flach",
        "answer_2": "Man müsste erst die Echsenmenschen fragen",
        "answer_3": "Nein",
        "answer_4": "Ja, sie ist flach und hohl",
        "right_answer": 3
    },
    {
        "question": "Was versprühen die Flugzeuge am Himmel?",
        "answer_1": "Nichts, es sind einfach Kondensstreifen",
        "answer_2": "Es wird Gift versprüht um und Dumm zu halten",
        "answer_3": "Das Wetter wird damit beeinflusst",
        "answer_4": "Es werden Stoffe versprüht um Gedanken zu kontrollieren",
        "right_answer": 1
    },
    {
        "question": "Ist die 5G Technologie schädlich?",
        "answer_1": "Ja, dadurch sterben regelmäßig Vögel",
        "answer_2": "Ja, die Strahlen bruzzeln das Gehirn weg",
        "answer_3": "Nein",
        "answer_4": "Muss ich mal eben in meiner Telegram Gruppe fragen",
        "right_answer": 3
    },
    {
        "question": "Sind Tauben Roboter Spione?",
        "answer_1": "Ja oder hast du schonmal Babytauben gesehen?",
        "answer_2": "Ja, die überwachen uns durchgehend",
        "answer_3": "Ja, jede Taube enthält Microships",
        "answer_4": "Nein, bist du dumm?",
        "right_answer": 4
    },
    {
        "question": "Sollte man sein Kind impfen?",
        "answer_1": "Natürlich nicht, da ist Quecksilber drin",
        "answer_2": "Nein, durch Impfungen kann ein 6ter Zeh wachsen",
        "answer_3": "Ja",
        "answer_4": "Nein, wacht endlich auf",
        "right_answer": 3
    },


];

let rightQuestions = 0
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/right.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('number-of-questions').innerHTML = questions.length;

    showQuestion()
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    }
    else {
        updateProgressBar();
        updateToNextQuestion();
        highlightCategorie()
    }
}

function showEndscreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('right-answers').innerHTML = rightQuestions;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('qurrent-number-of-questions').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function gameIsOver(){
    return currentQuestion >= questions.length
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger')
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerButtons()
    showQuestion()

    document.getElementById('next-btn').disabled = true;


}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('question-body').style = '';
    document.getElementById('endscreen').style = 'display: none';
    document.getElementById('question-categorie5').style.color = 'white';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function highlightCategorie(){
    for (let i = 0; i < questions.length; i++) {
        let category = document.getElementById(`question-categorie${i}`);
        if(category) {
            category.style.color = 'white';
        }
    }
    let currentCategorie = document.getElementById(`question-categorie${currentQuestion + 1}`);
    if (currentCategorie) {
        currentCategorie.style.color = 'green';
}
}

function openStartScreen(){
    document.getElementById('startscreen').style.display = 'none';
    document.getElementById('questions-closed').style.display = '';
    
}