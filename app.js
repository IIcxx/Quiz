const question = document.getElementById("question");
const ansB = document.getElementById("answer-buttons");
const plusOne = document.getElementById("plusone");
const plusTwo = document.getElementById("plustwo");
const questions = [
    {
        question: "What is the only country which lies entirely over 1000m in elevation?",
        answers: [
            {text: "Switzerland", correct: false},
            {text: "Nepal", correct: false},
            {text: "Lesotho", correct: true},
            {text: "Bhutan", correct: false},
        ]
    },
    {
        question: "What country has the highest population?",
        answers: [
            {text: "China", correct: false},
            {text: "India", correct: true},
            {text: "The US", correct: false},
            {text: "Indonesia", correct: false},
        ]
    },
    {
        question: "Where was the hottest temperature ever recorded?",
        answers: [
            {text: "Death Valley, US", correct: true},
            {text: "Mekka, Saudi arabia", correct: false},
            {text: "Tripoli, Libya", correct: false},
            {text: "Khartoum, Sudan", correct: false},
        ]
    },
    {
        question: "Which country spans the most timezones?",
        answers: [
            {text: "Canada", correct: false},
            {text: "Russia", correct: false},
            {text: "France", correct: true},
            {text: "China", correct: false},
        ]
    },
    {
        question: "Which is the largest landlocked country?",
        answers: [
            {text: "Russia", correct: false},
            {text: "Kazakhstan", correct: true},
            {text: "Romania", correct: false},
            {text: "Turkmenistan", correct: false},
        ]
    },
    {
        question: "When did the US purchase alaska from Russia?",
        answers: [
            {text: "1854", correct: false},
            {text: "1946", correct: false},
            {text: "1959", correct: false},
            {text: "1867", correct: true},
        ]
    },
];

let currentQuestionI = 0;
let score = 0;
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionI];
    let questionNo = currentQuestionI +1;
    question.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        ansB.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });  
}
function startQuiz(){
    currentQuestion = 0;
    score = 0;
    plusOne.innerHTML = "Next Question";
    showQuestions();
}

function resetState(){
    plusOne.style.display = "none";
    while(ansB.firstChild){
        ansB.removeChild(ansB.firstChild);
   }
}
function selectAnswer(e){
    const ansBB = e.target;
    const isCorrect = ansBB.dataset.correct === "true";
    if(isCorrect){
        score +=1;
        ansBB.classList.add("rightans");
    }
    else{
        ansBB.classList.add("wrongans");
    }
    Array.from(ansB.children).forEach(button => {
      if(button.dataset.correct === "true"){
           button.classList.add("rightans");
      }
      button.disabled = true;
    });
    plusOne.style.display = "block";
}
plusOne.addEventListener("click",()=>{
    if(currentQuestionI < 6){
     plusOneHolder();
    }
    else{
        startQuiz();
    }
})
function plusOneHolder(){
    currentQuestionI +=1;
    if(currentQuestionI < 6){
        showQuestions();
    }
    else{
        resetState();
        if(score >= 4){
        question.innerHTML = `You got ${score} out of 6 right, Good job!`;
    
        }
        else{
            question.innerHTML = `You got ${score} out of 6 right, you need to practice a bit it seems.`;
           
        }
    }  
}

startQuiz();