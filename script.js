const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
	{
		id: "0",
		question: "ვინ არის ყველაზე ჭკვიანი?",
		options: ["დიტო", "ნანა", "დათო", "ემა"],
		correct: "დიტო"
	},
	{
		id: "1",
		question: "ვინ არის ყველაზე ძუნწი?",
		options: ["დიტო", "ნანა", "დათო", "ემა"],
		correct: "დათო"
	},
	{
		id: "2",
		question: "ვინ არის ყველაზე კარგი ადამიანი?",
		options: ["დიტო", "ნანა", "დათო", "ემა"],
		correct: "ნანა"
	}
];
restart.addEventListener("click", () => {
	inital(); 
	wrapper.classList.remove("hide");
	scoreContainer.classList.add("hide");
});
nextBtn.addEventListener(
	"click",
	(displayNext = () => {
		questionCount += 1;
		if (questionCount == quizArray.length) {
			wrapper.classList.add("hide");
			scoreContainer.classList.remove("hide");
			userScore.innerHTML =
				"Your score is " + scoreCount + " out of " + questionCount;
		} else {
			countOfQuestion.innerHTML =
				questionCount + 1 + " of " + quizArray.length + " Question";
			quizDisplay(questionCount);
			count = 11;
			clearInterval(countdown);
			timerDisplay();
		}
	})
);
const timerDisplay = () => {
	countdown = setInterval(() => {
		count--;
		timeLeft.innerHTML = `${count}s`;
		if (count == 0) {
			clearInterval(countdown);
			displayNext();
		}
	}, 1000);
};
const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container_mid");
	quizCards.forEach((card) => {
		card.classList.add("hide");
	});
	quizCards[questionCount].classList.remove("hide");
};
function quizCreator() {
	quizArray.sort(() => Math.random() - 0.5);
	for (let i of quizArray) {
		i.options.sort(() => Math.random() - 0.5);
		let div = document.createElement("div");
		div.classList.add("container_mid", "hide");
		countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);
		div.innerHTML += `
<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
<button class="option-div" onclick="checker(this)">${i.options[3]}</button>

`;
		quizContainer.appendChild(div);
	}
}
function checker(userOption) {
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container_mid")[questionCount];
	let options = question.querySelectorAll(".option-div");
	if (userSolution === quizArray[questionCount].correct) {
		userOption.classList.add("correct");
		scoreCount++;
	} else {
		userOption.classList.add("inCorrect");
		options.forEach((element) => {
			if (element.innerText == quizArray[questionCount].correct) {
				element.classList.add("correct");
			}
		});
	}
	clearInterval(countdown);
	options.forEach((element) => {
		element.disabled = true;
	});
}
function inital() {
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	clearInterval(countdown);
	count = 11;
	timerDisplay();
	quizCreator();
	quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
	startScreen.classList.add("hide");
	wrapper.classList.remove("hide");
	inital();
});
window.onload = () => {
	startScreen.classList.remove("hide");
	wrapper.classList.add("hide");
};
