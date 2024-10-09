// Fetch webinar dates when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://script.google.com/macros/s/AKfycbwv3wAdX7rSdGidcTJVdIrO8-CME1JDk5zzDrsiwQeJj2m-vE4cOPdO1x2huc_QpQw7aA/exec')
        .then(response => response.json())
        .then(dates => {
            let webinarOptions = '';
            dates.forEach(date => {
                webinarOptions += `<div class="radio-group">
                    <input type="radio" id="${date[0]}" name="webinarDate" value="${date[0]}" required>
                    <label for="${date[0]}">${date[0]}</label>
                </div>`;
            });
            document.getElementById('webinarDates').innerHTML = webinarOptions;
        })
        .catch(error => console.error('Error fetching webinar dates:', error));
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = {
        title: document.getElementById('title').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        message: document.getElementById('message').value,
        webinarDate: document.querySelector('input[name="webinarDate"]:checked') ? document.querySelector('input[name="webinarDate"]:checked').value : null,
        consent: document.getElementById('consent').checked ? "Yes" : "No",
    };

    // Send data to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwv3wAdX7rSdGidcTJVdIrO8-CME1JDk5zzDrsiwQeJj2m-vE4cOPdO1x2huc_QpQw7aA/exec', {
        method: 'POST',
        mode: 'no-cors', // Prevents CORS issues for POST requests
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(() => {
        alert("Thank you for registering! Your data has been saved.");
        document.getElementById('contactForm').reset(); // Reset the form
    }).catch(error => console.error('Error:', error));
});

