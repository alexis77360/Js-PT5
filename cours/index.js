const obj = {
  // index:value
  pseudo: "From Scratch",
  ville: "Bordeaux",
  admin: false,

  direBonjour: function () {
    console.log("Bonjour je suis " + this.pseudo);
  }
  // direBonjour() {
  //   console.log("Bonjour je suis " + this.pseudo);
  // }
}

// Ajouter
obj.age = 24
obj["admin"] = true

// Modifier
obj.pseudo = "FS"

//? Supprimer
delete obj.ville

//? Checker si propriété existe
// console.log("pseudo" in obj);
// console.log("pseudo" in obj);

// Parcourir l'objet
for (const key in obj) {
  // console.log(key + " : " + obj[key]);
}
// console.log(obj.direBonjour());

// Obtenir les clés
const keys = Object.keys(obj)
// console.log(keys);

// Obtenir les valeurs
const values = Object.values(obj)
// console.log(values);

const nestedArray = Object.entries(obj)
// console.log(nestedArray);

const obj2 = {
  taille: "1m80",
  poids: "75kg",
}

// Fusionner objects
const fusion = Object.assign({}, obj, obj2);
// console.log(fusion);

// Empecher les modifications
// const newObj = Object.freeze(obj);
const newObj = Object.seal(obj);
newObj.pseudo = "Test";
newObj.adresse = "42 avenue du code"

// console.log(newObj);

//---------------------
// Contruire des objets
//---------------------

// Fonction constructeur
function User(pseudo, ville) {
  this.pseudo = pseudo;
  this.ville = ville;

  this.getCity = function () {
    console.log(this.pseudo + " habite à " + this.ville);
  }
}

const user1 = new User('From Scratch', 'Bordeaux');
const user2 = new User('Denis', 'Nantes');

// console.log(user2.getCity());

//------------------------
// Factory functions
function User3(pseudo, ville) {
  return {
    pseudo,
    ville
  }
}
const user4 = User3('FS', "nice")
// console.log(user4);

//------------------------
// Class

class Utilisateur {
  constructor(pseudo, ville) {
    this.pseudo = pseudo;
    this.ville = ville;
  }
  sayMyName = function () {
    console.log("Bonjour je suis " + this.pseudo);
  }
}

const user5 = new Utilisateur('Samia', "Lyon");

Utilisateur.prototype.sayCity = function () {
  console.log("J'habite à " + this.ville);
}

Object.assign(Utilisateur.prototype, {
  method1() {
    // Ma méthode
  },
  method2() {
    // Ma méthode
  }
})

// console.log(user5);

//-----------
// L'héritage
//-----------

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
  saySomething(text) {
    console.log(this.name + " dit : " + text);
  }
}

class Dog extends Animal {
  run() {
    console.log("Le chien court !");
  }
}

class Cat extends Animal {
  hunt() {
    console.log("j'ai tué un oiseau");
  }
}

const rintintin = new Dog("Rintintin", 9)
console.log(rintintin);

