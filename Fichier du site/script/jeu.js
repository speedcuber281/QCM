/* Initialisation */

/* Mise en place des constantes (parties modifiables du HTML) */
const boutons = document.querySelectorAll('.bouton')
const textQuestion = document.getElementById("question")
const reponseButton1 = document.getElementById("rep-A")
const reponseButton2 = document.getElementById("rep-B")
const reponseButton3 = document.getElementById("rep-C")
const reponseButton4 = document.getElementById("rep-D")
const boutonSuite = document.getElementById("suite-question")
const pageBoutonSuite = document.getElementById("page-suite-question")
const headerQuestion = document.getElementById("compteur-questions")
const headerPoints = document.getElementById("compteur-points")
const boutonsReponses = document.getElementById("boutons")
const headerBar = document.getElementById("header")
const page = document.getElementById("page")
const pageResultat = document.getElementById("resultat")
const leScoreFinal = document.getElementById("votre-score")

/* Mise en place des variables */
var questionsDejaFaites = []
var question = "Pas encore choisit"
var bonneReponse = "Pas encore choisit"
var reponseA = "Pas encore choisit"
var reponseB = "Pas encore choisit"
var reponseC = "Pas encore choisit"
var reponseD = "Pas encore choisit"
var points = 0
var questionEnCours = 0
var affichageResultatEnCours = false

/* On récupère le QCM */
var QCMText = document.getElementById("QCM")
var QCM = QCMText.textContent.split('%')


/* Fonctions */

/* Choix de la question */
function choixQuestion() {
	//Mise à jour de la variable de comptage des questions
	questionEnCours++
	//Choix d'une question aléatoire
	var choix = Math.round(Math.random() * QCM.length)
	//Tant que la question à déja été faites on en reprend un autre
	while(questionsDejaFaites.includes(choix) === true) {
		choix = Math.round(Math.random() * QCM.length)
	}
	//On ajoute la question au questions déjà faites
	questionsDejaFaites.push(choix)
	//On divise la question choisit en différentes variables
	question = (QCM[choix].split('# '))[0]
	var reponses = (QCM[choix].split('# '))[1]
	bonneReponse = (reponses.split(';;'))[1]
	reponses = (reponses.split(';;'))[0]
	reponseA = (reponses.split(' /'))[0]
	reponseB = (reponses.split(' /'))[1]
	reponseC = (reponses.split(' /'))[2]
	reponseD = (reponses.split(' /'))[3]
	//On lance l'affichage
	affichage()
}

/* Affiche la question */
function affichage() {
	//Affiche la question et les réponses
	textQuestion.textContent = question
	reponseButton1.textContent = reponseA
	reponseButton2.textContent = reponseB
	reponseButton3.textContent = reponseC
	reponseButton4.textContent = reponseD
	//Affiche le nombre de questions faites et les points
	headerQuestion.textContent = "Question " + questionEnCours.toString() + "/10"
	headerPoints.textContent = "Pts " + points.toString()
}

/* Vérification de la réponse */
function verificationReponse(value) {
	//Le bouton n'est actif que si la réponse n'est pas affiché
	if (affichageResultatEnCours === false) {
		//Si la réponse est bonne
		if((value.split('-'))[1] === bonneReponse) {
			//On gagne 1 point
			points++
			//Mise à jour de l'affichage: en vert le boouton + le texte des points
			headerPoints.textContent = "Pts " + points.toString()
			document.getElementById(value).classList.remove("neutre")
			document.getElementById(value).classList.add("vrai")
		}
		//Si la réponse est fausse
		else {
			//Mise à jour de l'affichage: en rouge le bouton choisit
			document.getElementById(value).classList.remove("neutre")
			document.getElementById(value).classList.add("faux")
			//Mise à jour de l'affichage: en vert la bonne réponse
			document.getElementById('rep-' + bonneReponse).classList.remove("neutre")
			document.getElementById('rep-' + bonneReponse).classList.add("vrai")
		}
		//Mise à jour de la varibale qui empêche de choisir une réponse pendant l'affichage de la bonne réponse
		affichageResultatEnCours = true
		//Active le bouton "Suivant"
		afficherAccesQuestionSuivante()
	}
}

/* Affichage du bouton suivant */
function afficherAccesQuestionSuivante() {
	pageBoutonSuite.classList.remove("hide")
	//Si 10 questions sont passé le bouton renvoit la page résultat
	if(questionEnCours === 10) {
		boutonSuite.onclick = afficherResultat
	}
	//Si il reste des questions le bouton renvoit la question suivante
	else {
		boutonSuite.onclick = prochaineQuestion
	}
}

/* Question suivante */
function prochaineQuestion() {
	//Cache le bouton "Suivant"
	pageBoutonSuite.classList.add("hide")
	//Reset des boutons
	resetBouton(reponseButton1)
	resetBouton(reponseButton2)
	resetBouton(reponseButton3)
	resetBouton(reponseButton4)
	//Actualise la variable qui désactive les boutons
	affichageResultatEnCours = false
	//Choisit une nouvelle question
	choixQuestion()
}

/* Reset la couleur d'un bouton */
function resetBouton(x) {
	x.classList.remove("neutre")
	x.classList.remove("vrai")
	x.classList.remove("faux")
	x.classList.add("neutre")
}

/* Affiche les résultats */
function afficherResultat() {
	//On cache les anciens affichage
	textQuestion.classList.add("hide")
	boutonsReponses.classList.add("hide")
	boutonSuite.classList.add("hide")
	headerBar.classList.add("hide")
	page.classList.add("nouvelle-hauteur")
	//On calcule le score en %
	points = points*10
	//on affiche la page et le résultat
	pageResultat.classList.remove("hide")
	leScoreFinal.textContent = points.toString() + "%"
}


/* Programme que à l'actualisation */
if(questionEnCours === 0) {
	choixQuestion()
}
