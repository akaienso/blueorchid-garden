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

    const textToType = "For Kirkja.";
    let index = 0;

    function typeText() {
        if (index < textToType.length) {
            textElement.textContent += textToType[index];
            index++;
            setTimeout(typeText, 50 + Math.random() * 100); // Random delay between 50ms to 150ms
        } else {
            setTimeout(() => {
                cursor1Element.style.display = 'none';  // Hide the cursor for the first line
                typeRandomText();
            }, 3000 + Math.random() * 2000); // Random pause between 3 to 5 seconds
        }
    }

    function typeRandomText() {
        cursor2Element.style.display = 'inline'; // Make the second cursor visible

        const sentence = randomSentences[Math.floor(Math.random() * randomSentences.length)];
        let i = 0;

        cursor2Element.style.opacity = "0"; // Initially make it transparent

        function type() {
            if (i === 0) {
                // Start blinking cursor once the text starts appearing
                blinkCursor(cursor2Element);
            }

            if (i < sentence.length) {
                randomTextElement.textContent += sentence[i];
                i++;
                setTimeout(type, 50 + Math.random() * 100); // Random delay between 50ms to 150ms
            } else {
                setTimeout(() => {
                    backspace();
                }, 3000 + Math.random() * 2000); // Random pause between 3 to 5 seconds
            }
        }

        function backspace() {
            if (randomTextElement.textContent.length > 0) {
                randomTextElement.textContent = randomTextElement.textContent.slice(0, -1);
                setTimeout(backspace, 50 + Math.random() * 100); // Random delay between 50ms to 150ms
            } else {
                cursor2Element.style.opacity = "0"; // Hide the cursor before typing the next sentence
                typeRandomText();
            }
        }

        type();
    }

    function blinkCursor(cursorElement) {
        if (cursorElement.style.opacity === "0") {
            cursorElement.style.opacity = "1";
        } else {
            cursorElement.style.opacity = "0";
        }
        setTimeout(() => blinkCursor(cursorElement), 500);
    }
    cursor2Element.style.opacity = "0";
    cursor2Element.style.display = 'none';

    const svgContainer = document.getElementById('fireflyContainer');
    svgContainer.setAttribute("width", window.innerWidth);
    svgContainer.setAttribute("height", window.innerHeight);

    const numberOfFireflies = Math.floor(Math.random() * 14) + 4;

    function fadeOutIn(element, initial, step) {
        let opacity = initial;
        let fadingOut = true;

        function fade() {
            if (fadingOut) {
                opacity -= step;
                if (opacity <= 0) {
                    fadingOut = false;
                    setTimeout(() => {
                        fade();
                    }, (Math.random() * 4000) + 3000); // 3 to 7 seconds
                    return;
                }
            } else {
                opacity += step;
                if (opacity >= initial) {
                    fadingOut = true;
                }
            }

            element.setAttribute("fill", `rgba(255, 255, 0, ${opacity.toFixed(2)})`);
            requestAnimationFrame(fade);
        }

        fade();
    }


    // Create fireflies
    for (let i = 0; i < numberOfFireflies; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomSize = Math.random() * 1.5 + 1; // Sizes between 1 and 2.5
        const randomBrightness = (randomSize - 1) / 1.5; // Brightness relative to size

        circle.setAttribute("cx", randomX);
        circle.setAttribute("cy", randomY);
        circle.setAttribute("r", randomSize);
        circle.setAttribute("fill", `rgba(255, 255, 0, ${randomBrightness.toFixed(2)})`);

        svgContainer.appendChild(circle);

        // Randomly decide whether to fade out this firefly or not
        if (Math.random() > 0.5) {
            fadeOutIn(circle, randomBrightness, 0.01);
        }
    }

    // Animate fireflies
    const animateFireflies = () => {
        for (const firefly of svgContainer.children) {
            const newX = parseFloat(firefly.getAttribute("cx")) + (Math.random() - 0.5) * 10;
            const newY = parseFloat(firefly.getAttribute("cy")) + (Math.random() - 0.5) * 10;
            firefly.setAttribute("cx", newX);
            firefly.setAttribute("cy", newY);
        }
        requestAnimationFrame(animateFireflies);
    };

    // Start the animation
    requestAnimationFrame(animateFireflies);



});

let menuVisible = false;

function toggleMenu() {
    const menu = document.getElementById('flyout-menu');

    if (menu.style.right === "-300px" || menu.style.right === "") {
        menu.style.right = "0px";
    } else {
        menu.style.right = "-300px";
    }
}