let totalHeads = 0;
let totalTails = 0;

function flipCoin() {
    const coinElement = document.getElementById('coin');
    const resultElement = document.getElementById('result');
    const currentFlipsElement = document.getElementById('currentFlips');
    const totalHeadsElement = document.getElementById('totalHeads');
    const totalTailsElement = document.getElementById('totalTails');

    // Disable button during the animation
    document.getElementById('flipButton').disabled = true;

    // Add flip animation class
    coinElement.classList.add('flipping');

    // Generate a random number (0 or 1) after half of the flip animation
    setTimeout(() => {
        const randomNum = Math.floor(Math.random() * 2);

        // Display the result and update the coin image
        if (randomNum === 0) {
            resultElement.textContent = 'HEADS';
            coinElement.classList.remove('tails');
            coinElement.classList.add('heads');
            totalHeads++;
            totalHeadsElement.textContent = totalHeads;
        } else {
            resultElement.textContent = 'TAILS';
            coinElement.classList.remove('heads');
            coinElement.classList.add('tails');
            totalTails++;
            totalTailsElement.textContent = totalTails;
        }

        // Remove flip animation class
        coinElement.classList.remove('flipping');

        // Enable button after the animation is complete
        setTimeout(() => {
            document.getElementById('flipButton').disabled = false;
        }, 1000);

        // Update the progress bar and current flips count
        updateProgressBar(currentFlipsElement.textContent);
    }, 500);
}

function autoFlip() {
    const autoFlipCheckbox = document.getElementById('autoFlip');
    const simultaneousFlipsInput = document.getElementById('simultaneousFlips');
    const autoFlipButton = document.getElementById('autoFlipButton');
    const currentFlipsElement = document.getElementById('currentFlips');
    const progressBar = document.getElementById('progressBar');

    if (autoFlipCheckbox.checked) {
        const simultaneousFlips = parseInt(simultaneousFlipsInput.value);
        let flipsCompleted = 0;

        // Disable the auto flip button during auto flip
        autoFlipButton.disabled = true;

        // Perform simultaneous flips
        const flipInterval = setInterval(() => {
            if (flipsCompleted < simultaneousFlips) {
                flipCoin();
                flipsCompleted++;
                currentFlipsElement.textContent = parseInt(currentFlipsElement.textContent) + 1;
            } else {
                clearInterval(flipInterval);

                // Enable the auto flip button after all flips are completed
                autoFlipButton.disabled = false;
            }

            // Update the progress bar for each flip
            updateProgressBar(currentFlipsElement.textContent);
        }, 1000);
    }
}

function updateProgressBar(currentFlips) {
    const progressBar = document.getElementById('progressBar');
    const progressBarWidth = (currentFlips / 1000) * 100; // Assuming 1000 flips as the maximum

    progressBar.style.width = progressBarWidth + '%';
}
