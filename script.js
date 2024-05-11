// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tweetForm');
    const tweetInput = document.getElementById('tweetInput');
    const resultContainer = document.getElementById('resultContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = tweetInput.value.trim();

        // Clear previous result
        resultContainer.innerHTML = '';

        if (text === '') {
            displayError('Please enter a tweet.');
        } else {
            // Display loading spinner
            resultContainer.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';

            // Simulate processing delay (remove this in actual deployment)
            setTimeout(function() {
                // Simulate classification result (replace with actual prediction logic)
                const isDisaster = Math.random() < 0.5; // Randomly generate result
                const result = isDisaster ? 'Disaster' : 'Not a disaster';

                // Display result
                displayResult(result);

                // Add further classification details
                if (isDisaster) {
                    displayDetails('This tweet contains disaster-related content.');
                } else {
                    displayDetails('This tweet does not contain disaster-related content.');
                }
            }, 1500);
        }
    });

    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger');
        errorDiv.textContent = message;
        resultContainer.appendChild(errorDiv);
    }

    function displayResult(result) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('alert', 'alert-success');
        resultDiv.textContent = `Prediction: ${result}`;
        resultContainer.appendChild(resultDiv);
    }

    function displayDetails(details) {
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('alert', 'alert-info');
        detailsDiv.textContent = details;
        resultContainer.appendChild(detailsDiv);
    }
});
