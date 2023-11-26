let colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let playerPattern = [];
let level = 0;

function addPattern() {
    playerPattern = [];
    let ranNumber = Math.floor(Math.random() * 4);
    gamePattern.push(colors[ranNumber]);
    playAudio(colors[ranNumber]);
    level++;
    $("h1").text("Level " + level);
}

function checkAnswer() {
    if(gamePattern.length === playerPattern.length) {
        if(gamePattern.toString() === playerPattern.toString()) {
            setTimeout(function() {
                addPattern();
            }, 1000);
        }
        else {
            $("h1").text("Game Over, Press A to start again");
            level = 0;
            gamePattern = [];
        }
    }
}

function playAudio(color) {
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function addAnimation(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).on("keydown", function(e) {
    if(e.key === "a") {
        if(level === 0) {
            addPattern();
        }
    }
});

$(".btn").on("click", function() {
    let color = $(this).attr("id");
    playerPattern.push(color);
    playAudio(color);
    addAnimation(color);
    checkAnswer();
});




