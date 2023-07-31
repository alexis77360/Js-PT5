const main = document.querySelector("main");

const basicArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];


//? !tableau d'objets avec les exercices
let exerciceArray = [];

//? Fonction au démarrage de l'appli pour vérifier si il y a des données dans le local storage
(( ) => {
  if(localStorage.exercices)
  {
    exerciceArray = JSON.parse(localStorage.exercices);
  }
  else
  {
    exerciceArray = basicArray;
  }

})();

class Exercice {

  constructor() {
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.seconds = 0;

  }

  //? !fonction qui gère le décompte
  updateCountdown() {

    //? affiche un 0 devant les chiffres si inférieur à 10
    this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

    setTimeout(() => {
      if (this.minutes === 0 && this.seconds === "00") {
        this.index++;
        this.ring();
        if(this.index < exerciceArray.length)
        {
          this.minutes = exerciceArray[this.index].min;
          this.seconds = 0;
          this.updateCountdown();
        }
        else
        {
          page.finish();
        }

      }
      else if (this.seconds === "00") {
        this.minutes--;
        this.seconds = 59;
        this.updateCountdown();
      } 
      else
      {
        this.seconds--;
        this.updateCountdown();
      }

    }, 1000);

    return (main.innerHTML = `
    <div class="exercice-container">
      <p>${this.minutes} : ${this.seconds} </p>
      <img src="./img/${exerciceArray[this.index].pic}.png" alt="exercice ${exerciceArray[this.index].pic}">
      <div> ${this.index + 1} / ${exerciceArray.length} </div>

    </div>
    `);
  }
  //? !fonction qui gère le son
  ring() {
    const audio = new Audio("./ring.mp3");
    audio.play();
  }
}

const utils = {

  pageContent: function(title,content,btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;

  },
  //? !fonction qui gère les minutes dans les inputs
  handleEventMinutes: function() {
    document.querySelectorAll("input[type='number']").forEach((input) => {

      input.addEventListener("input", (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id)
          {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
    });
  });
  },

  //? !fonction qui gère les flèches
  handleEventArrow: function() {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {

        let position = 0;


        //? map sur le tableau d'objets pour trouver la position de l'objet cliqué
        exerciceArray.map((exo) => {
          if(exo.pic == e.target.dataset.pic && position != 0) {
            //! échange de position dans le tableau 
            [exerciceArray[position], exerciceArray[position - 1]] = [exerciceArray[position - 1], exerciceArray[position]];
            page.lobby();
            this.store();        
          }else{
            position++;
          }
        });
      });
    });
  },
  
  deleteItem: function() {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArr = [];
        //? map sur le tableau et push dans un nouveau tableau les objets qui n'ont pas le même pic que celui cliqué
        exerciceArray.map((exo) => {
          if(exo.pic != e.target.dataset.pic) {
            newArr.push(exo);
          }
        });
        //? réassignation du tableau d'objets
        exerciceArray = newArr;
        page.lobby();
        this.store();
      });
    });
  },

  //? On rappel le tableau de base
  reboot: function() {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
  },

  //? Gere le stockage des données dans le local storage
  store: function() {
    localStorage.exercices = JSON.stringify(exerciceArray);
  }

};

const page = {
  lobby : function() {
    
    //? !map sur le tableau d'objets pour créer les li
    let mapArray = exerciceArray 
      .map(
        (exo) => 
      `
      <li>
        <div class="card-header">
          <input type="number" id=${exo.pic} value=${exo.min} min="1" max="10">
          <span>min</span>
        </div>
        <img src="./img/${exo.pic}.png" alt="exercice ${exo.pic}">
        <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
        <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>

      </li>
      `
      )
    .join("");


    //? !affichage du contenu de la page
    utils.pageContent( 
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      `<ul>${mapArray}</ul>`,
      "<button id='start'>Commencer <i class='fas fa-play-circle'></i></button>"
    );
    //! toujours rajouter les eventListener apres le map pour addosser les events sur les elements créés
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();

    //? Vu qu'il a un id il est connu dans le js
    reboot.addEventListener("click", () => {
      utils.reboot();
    });
    start.addEventListener("click", () => {
      this.routine();
    }
    );
  },

  //? !affichage de la routine
  routine : function() {
    const exercice = new Exercice();

    utils.pageContent(
      "Routine",
      exercice.updateCountdown(),
      null
    );
  },

  //? !affichage de la fin des exercices
  finish : function() {
    utils.pageContent(
      "C'est fini !",
      "<button id='start'>Recommencer <i class='fas fa-undo'></i></button>",
      "<button id='reboot' class='btn-reboot'>Réinitialiser </button>"
    )

    start.addEventListener("click", () => {this.routine();});
    reboot.addEventListener("click", () => {utils.reboot();});
  }
}
page.lobby();