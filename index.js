var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started;
var level = 0;

startGame();

function startGame() {
	started = false;
	reset();
	$(document).keydown(function () {
		if (!started) {
			started = true;
			nextSequence();
		}
	});
}

function nextSequence() {
	var randomNum = Math.floor(Math.random() * 4);
	var chosenColor = colors[randomNum];
	gamePattern.push(chosenColor);

	level++;
	$("h1").text("Level " + level);
	animatePress("#" + chosenColor);
	playSound("./sounds/" + chosenColor + ".mp3");
}

$('div[type="button"]').on("click", function () {
	var userColor = $(this).attr("id");
	userPattern.push(userColor);
	animatePress("#" + userColor);
	playSound("./sounds/" + userColor + ".mp3");
	checkAnswer(level);
});

function checkAnswer(currentLevel) {
	var lastLevel = userPattern.length - 1;

	// Check only the last input
	if (userPattern[lastLevel] === gamePattern[lastLevel]) {
		// If user completed the full sequence
		if (userPattern.length === gamePattern.length) {
			setTimeout(function () {
				userPattern = []; // Reset user pattern
				nextSequence();
			}, 1000);
		}
	} else {
		$("h1").text("Game Over! Press any key to restart.");
		playSound("./sounds/wrong.mp3");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startGame();
	}
}

function playSound(name) {
	var sound = new Audio(name);
	sound.play();
}

function animatePress(color) {
	$(color).addClass("pressed");

	setTimeout(function () {
		$(color).removeClass("pressed");
	}, 100);
}

function reset() {
	level = 0;
	gamePattern = [];
	userPattern = [];
}
