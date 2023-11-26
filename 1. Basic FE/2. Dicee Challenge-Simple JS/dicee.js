function rollDice() {
    var result = document.querySelector("#result");
    var p1Number = Math.floor(Math.random() * 6) + 1;
    var p2Number = Math.floor(Math.random() * 6) + 1;
    var p1Img = document.querySelector(".img1");
    var p2Img = document.querySelector(".img2");

    p1Img.setAttribute("src", "./images/dice" + p1Number + ".png");
    p2Img.setAttribute("src", "./images/dice" + p2Number + ".png");
    if (p1Number > p2Number) {
        result.innerHTML = "🚩 Player 1 Win"
    } else if (p1Number < p2Number) {
        result.innerHTML = "Player 2 Win 🚩"
    }
    else {
        result.innerHTML = "🚩 It's a Tie 🚩"
    }
}

rollDice();