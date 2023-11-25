document.addEventListener("DOMContentLoaded", function () {
    let randomSentences = [];

    // Fetch random sentences from messages.json file
    fetch('/data/messages.json')
        .then(response => response.json())
        .then(data => {
            randomSentences = data.sentences;
            typeText();  // Start typing only after the sentences are loaded
        });

    const textElement = document.getElementById('typed-text');
    const randomTextElement = document.getElementById('random-text');
    const cursor1Element = document.getElementById('cursor1');
    const cursor2Element = document.getElementById('cursor2');
    const pauseButton = document.getElementById('pauseButton');
    const emailLink = document.getElementById('emailLink');
    const smsLink = document.getElementById('smsLink');

    const textToType = "For Kirkja.";
    let index = 0;
    let isPaused = false;
    let typingTimer;

    function typeText() {
        if (!isPaused && index < textToType.length) {
            textElement.textContent += textToType[index];
            index++;
            typingTimer = setTimeout(typeText, 50 + Math.random() * 100);
        } else if (!isPaused) {
            setTimeout(() => {
                cursor1Element.style.display = 'none';
                typeRandomText();
            }, 3000 + Math.random() * 2000);
        }
    }

    function typeRandomText() {
        if (!isPaused) {
            cursor2Element.style.display = 'inline';
            const sentence = randomSentences[Math.floor(Math.random() * randomSentences.length)];
            let i = 0;
            cursor2Element.style.opacity = "0";

            function type() {
                if (i === 0) {
                    blinkCursor(cursor2Element);
                }

                if (!isPaused && i < sentence.length) {
                    randomTextElement.textContent += sentence[i];
                    i++;
                    typingTimer = setTimeout(type, 50 + Math.random() * 100);
                } else if (!isPaused) {
                    setTimeout(() => {
                        backspace();
                    }, 3000 + Math.random() * 2000);
                }
            }

            function backspace() {
                if (!isPaused && randomTextElement.textContent.length > 0) {
                    randomTextElement.textContent = randomTextElement.textContent.slice(0, -1);
                    typingTimer = setTimeout(backspace, 50 + Math.random() * 100);
                } else if (!isPaused) {
                    cursor2Element.style.opacity = "0";
                    typeRandomText();
                }
            }

            type();
        }
    }

    function blinkCursor(cursorElement) {
        if (cursorElement.style.opacity === "0") {
            cursorElement.style.opacity = "1";
        } else {
            cursorElement.style.opacity = "0";
        }
        setTimeout(() => blinkCursor(cursorElement), 500);
    }

    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            clearTimeout(typingTimer);
            const currentQuestion = randomTextElement.textContent.trim();
            const emailSubject = encodeURIComponent('Blue Orchid');
            const emailBody = encodeURIComponent(`${currentQuestion} Answer: `);
            const smsBody = encodeURIComponent(`${currentQuestion} Answer: `);

            emailLink.href = `mailto:rob@moore.id?subject=${emailSubject}&body=${emailBody}`;
            smsLink.href = `sms:+17154093604?body=${smsBody}`;

            emailLink.style.display = 'inline';
            smsLink.style.display = 'inline';
        } else {
            emailLink.style.display = 'none';
            smsLink.style.display = 'none';
            typeRandomText();
        }
    });
});
