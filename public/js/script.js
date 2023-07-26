const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = tim,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    if(difficulty=='hard'){
        const ranIndex = Math.floor(Math.random() * hard.length);
    typingText.innerHTML = "";
    hard[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });    
    }else if(difficulty=='medium'){
        const ranIndex = Math.floor(Math.random() * medium.length);
    typingText.innerHTML = "";
    medium[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    }else{
        const ranIndex = Math.floor(Math.random() * easy.length);
    typingText.innerHTML = "";
    easy[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    }
    // const ranIndex = Math.floor(Math.random() * paragraphs.length);
    // typingText.innerHTML = "";
    // paragraphs[ranIndex].split("").forEach(char => {
    //     let span = `<span>${char}</span>`
    //     typingText.innerHTML += span;
    // });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}
let attemptcount = 1;
function resetGame() {
    const newDiv = document.createElement('tr');

    // Create a new heading tag (e.g., h2) and set its text content
    const attempt = document.createElement('td');
    attempt.textContent = attemptcount;
    const miss = document.createElement('td');
    miss.textContent = mistakes;
    const wpm = document.createElement('td');
    wpm.textContent = wpmTag.innerText;
    const cpm = document.createElement('td');
    cpm.textContent = cpmTag.innerText;

    // Append the heading to the new div element
    newDiv.appendChild(attempt);
    newDiv.appendChild(miss);
    newDiv.appendChild(wpm);
    newDiv.appendChild(cpm);
    // Get the container element where we want to add the new division
    const container = document.getElementById('stats');

    // Append the new division to the container
    container.appendChild(newDiv);
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
   
    attemptcount++;
    
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);