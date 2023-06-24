var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var gameStarted = false;

$(document).on("keydown", () => {
    if (!gameStarted) {
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", (event) => {
    var UserChosenColour = event.target.id;
    userClickedPattern.push(UserChosenColour);
    console.log(userClickedPattern);
    playSound(UserChosenColour);
    animatePress(UserChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    console.log("current Level: " + currentLevel);
    console.log(gamePattern[currentLevel]);
    console.log(userClickedPattern[currentLevel]);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        startOver();

    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var button = $("#" + randomChosenColour);
    button.fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    console.log(gamePattern);

}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}