class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}


const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  //? 1. Récupérer la question courante
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  //? 2. Vérifier la réponse donnée par le joueur
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  //? 3. Vérifier si le jeu est terminé
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

//? Affichage des questions du quiz
const display = {

  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    //? gere les choix de réponse avec les boutons
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    }
    //? Afficher les choix et gérer les réponses
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      "Question " + (quiz.currentQuestionIndex + 1) + " sur " + quiz.questions.length
    );
  },
  endQuiz: function () {
    let endQuizHTML = `<h1>Quiz terminé !</h1>
    <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  }
};


//? Logique du jeu
quizApp = () => {
  if (quiz.hasEnded()) {
    //! Afficher les résultats
    display.endQuiz();

  } else {
    //! Afficher la question suivante
    display.question();
    display.choices();
    display.progress();
  }
}

//? Création d'un quiz
let quiz = new Quiz(questions);
quizApp();