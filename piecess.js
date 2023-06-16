const reponse = await fetch("pieces-auto.json");
const pieces = await reponse.json();

//Creation d'une fonction
function generePieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    const artticle = pieces[i];
    //Rattachement de nos Balises au DOM
    const sectionFiches = document.querySelector(".fiches");

    //Creation de balise de pieces automobile
    const pieceElement = document.createElement("article");
    //Creation de balise
    const imageElement = document.createElement("img");
    imageElement.src = artticle.image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = artticle.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix : ${artticle.prix} FC`;
    prixElement.innerText = `Prix : ${artticle.prix} FC (${
      artticle.prix < 35 ? "FC" : "FC FC FC"
    })`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = artticle.categorie ?? "(Aucune catégorie)";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText =
      artticle.description ?? "Pas stock pour le moment.";

    const stockElement = document.createElement("p");
    stockElement.innerText = artticle.disponibilite
      ? "En Stock"
      : "Rupture de stock";

    //On rattache la balise Article à la section Fiches
    sectionFiches.appendChild(pieceElement);

    //On rattache l'image à pieceElement (La balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);

    //Ajout des element au DOM
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
  }
}

//Faire appelle à la fonction
generePieces(pieces);

//Gestion de button
// Faire le trier des pieces
const bouttonTrier = document.querySelector(".btn-trier");
bouttonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  generePieces(piecesOrdonnees);
});

// Faire le filtre
const boutonFlitre = document.querySelector(".btn-filtrer");
boutonFlitre.addEventListener("click", function () {
  const piecesFiltre = pieces.filter(function (pieces) {
    return pieces.prix <= 35;
  });
  document.querySelector(".fiches").innerHTML = "";
  generePieces(piecesFiltre);
});
//P2C1-Exercice (solution)
// Ordre decroissant de Prix
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const listePrix = Array.from(pieces);
  listePrix.sort(function (a, b) {
    return b.prix - a.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  generePieces(listePrix);
});

//N'afficher que seules qui ont une description
const boutonNoDesc = document.querySelector(".btn-nodesc");
boutonNoDesc.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (pieces) {
    return pieces.description;
  });
  document.querySelector(".fiches").innerHTML = "";
  generePieces(piecesFiltrees);
});

//Afficher les pieces abordable
const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  }
}
//Creons une liste
const abordablesElements = document.createElement("ul");
//Ajout de la liste
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
}
//Ajout à l'en tete puis la liste de bloc de resultat filtres
document.querySelector(".abordables").appendChild(abordablesElements);

//P2C2-Exercice
const nomsDisponible = pieces.map((piece) => piece.nom);
const prixDisponible = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilite === false) {
    nomsDisponible.splice(i, 1);
    prixDisponible.splice(i, 1);
  }
}
//Creons une liste
const disponibiliteElement = document.createElement("ul");
//Ajout de la liste
for (let i = 0; i < nomsDisponible.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = `${nomsDisponible[i]} : ${prixDisponible[i]} FC`;
  disponibiliteElement.appendChild(nomElement);
}
//Ajout à l'en tete puis la liste de bloc de resultat filtres
document.querySelector(".disponible").appendChild(disponibiliteElement);

//P2C3-Exercice
const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Pieces Disponibles";
document
  .querySelector(".disponible")
  .appendChild(pElementDisponible)
  .appendChild(disponibiliteElement);
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= inputPrixMax.value;
  });
  document.querySelector(".fiches").innerHTML = "";
  generePieces(piecesFiltrees);
});
