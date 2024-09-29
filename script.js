import { questions } from './questions.js';

const questionElement = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;


function startQuiz (){
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'Next';
  showQuestion()
}

function showQuestion(){
  resetState()
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1 ;
  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerBtns.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
  } );
}


function resetState(){
nextBtn.style.display = 'none';
while(answerBtns.firstChild){
  answerBtns.removeChild(answerBtns.firstChild)
}
}

function selectAnswer(e){
   const selectedbtn = e.target;
   const isCorrect = selectedbtn.dataset.correct === 'true';

   if(isCorrect){
    selectedbtn.classList.add('correct');
    score++;
   }else{
    selectedbtn.classList.add('incorrect');
   }

  Array.from(answerBtns.children).forEach(button =>{
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true;
  })
  nextBtn.style.display = 'block';
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length} !`;

  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block';
}

function handleNextBtn(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else {
    showScore();
  }
}

nextBtn.addEventListener('click',()=>{
if(currentQuestionIndex < questions.length){
   handleNextBtn();
}else{
    startQuiz();
  }
});
startQuiz();