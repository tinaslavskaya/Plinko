document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;

    if (validateEmail(email)) {
        document.getElementById('response-message').innerText = "Email is valid: " + email;

        fetch('contact_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email }) 
        })
        .then(response => response.json())
        .then(data => {

            document.getElementById('response-message').innerText = data.message;
            document.getElementById('response-message').style.color = 'green';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response-message').innerText = 'Error sending data';
            document.getElementById('response-message').style.color = 'red';
        });
   } else {
            document.getElementById('response-message').innerText = "Invalid email address!" + ' ' + email;
            document.getElementById('response-message').style.color = 'red';
   }

   document.getElementById('email').value = '';
});


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

