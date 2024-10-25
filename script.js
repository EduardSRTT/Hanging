let words = ["banana", "marriage", "bag", "phone", "lake", 
"headset"]; 
let random = Math.floor(Math.random() * words.length);
let myWord = words[random];
let haveWordGenerated = false;
let health = 7;
let textToReveal = document.querySelector("#hiddenText");
let generateButton = document.querySelector("#generator");
let myInput = document.querySelector("#keywords");
let healthBar = document.querySelector("#myHealth");

function gameStillRunning(text) {
    let textToCheck = text.innerText.split("");
    for (let i = 0; i < textToCheck.length; ++i) {
        if (textToCheck[i] === "_") {
            return true;
        }
    }
    return false;
}

generateButton.addEventListener("click", function() {
    if (haveWordGenerated === false) {
        revealText(myWord);
        haveWordGenerated = true;
        generateButton.classList.remove("btn-warning");
        generateButton.classList.add("btn-light");
        generateButton.textContent = "Reset";
        myInput.style.display = "block";

    } else {
        resetGame(generateButton, textToReveal, myInput);
    }
});

myInput.addEventListener("input", function() {
    let newText = textToReveal.innerText.split("");
    let keywordFound = false;
    if (myInput.value != "") {
        for (let i = 0; i < myWord.length; ++i) {
            if (myWord[i] === myInput.value) {
                newText[i] = myInput.value;
                keywordFound = true;    
            }
        }
        if (keywordFound === true) {
            textToReveal.textContent = newText.join("");
        } else {
            --health;
            healthBar.textContent = "Healthbar: ";
            healthBar.style.fontWeight = "bold";
            for (let i = 0; i < health; ++i) {
                healthBar.textContent += "❤️";
            }
        }
    }
    myInput.value = "";
    if (health === 0) {
        document.getElementById("mycard").style.display = "none";
        myInput.style.display = "none";
        generateButton.style.display = "none";
        document.getElementById("finalMessage").style.display = "block";
        document.getElementById("info").style.display = "none";
        document.getElementById("loser").innerText = myWord;
        document.getElementById("loser").style.display = "flex";
    } else if (gameStillRunning(textToReveal) === false) {
        document.getElementById("winner").style.display = "block";
        document.getElementById("mycard").style.display = "none";
        myInput.style.display = "none";
        generateButton.style.display = "none";
        document.getElementById("info").style.display = "none";
    }
});

function revealText(text) {
    for (let i = 0; i < text.length; ++i) {
        textToReveal.textContent += "_";
    }
}    

function resetGame(generate, reveal, input) {
    random = Math.floor(Math.random() * words.length);
    myWord = words[random];
    generate.classList.remove("btn-light");
    generate.classList.add("btn-warning");
    generate.textContent = "Generate word";
    input.style.display = "none";
    input.value = "";
    reveal.textContent = "";
    haveWordGenerated = false;
    healthBar.textContent = "Healthbar: ❤️❤️❤️❤️❤️❤️❤️";
    healthBar.style.fontWeight = "bold";
    health = 7;
}

