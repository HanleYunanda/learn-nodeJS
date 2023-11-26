function makeSound(key) {
    switch (key) {
        case "w":
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("./sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("./sounds/tom-1.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("./sounds/tom-2.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("./sounds/tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("./sounds/tom-4.mp3");
            audio.play();
            break;
        default:
            break;
    }
}

function addAnimation(key) {
    if (key === null) return;
    key.classList.toggle("pressed");

    setTimeout(() => {
        key.classList.toggle("pressed");
    }, 100);
}

var btn = document.querySelectorAll(".drum");

btn.forEach(e => {
    e.addEventListener("click", function () {
        makeSound(e.innerHTML);

        addAnimation(e);
    });
});

document.addEventListener("keydown", function (e) {
    makeSound(e.key);

    var btnPressed = document.querySelector("." + e.key);
    addAnimation(btnPressed)
});