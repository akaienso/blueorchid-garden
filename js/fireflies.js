document.addEventListener("DOMContentLoaded", function () {
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
