
function contact() {
    document.getElementById('contactPost').addEventListener('submit', function(event) {
        event.preventDefault();
       
        const name =  document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            document.getElementById('response').innerText = 'Please fill in all fields';
            document.getElementById('response').classList.add("alert", "alert-danger");
            return;
        } else {
            document.getElementById('response').innerText = '';
            document.getElementById('response').classList.remove("alert", "alert-danger");
        }

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        fetch('contact_form.php', {  
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({formData})
        })
        .then(response =>  {
            if(!response.ok) { 
                throw new Error('Network response was not ok');
            } 
            return response.json();
        })
        .then(data => {
            document.getElementById('response').innerText = 'Message sent successfully!';
             document.getElementById('response').classList.add("alert", "alert-success");
            if(validateEmail(formData.email)) {
               document.body.classList.add('fade-out'); 
               setTimeout( () => window.location.href = 'thank-you.html', 1000); 
            } else {
               document.getElementById('response').innerText = "Invalid email address!" + '  ' + email;
               document.getElementById('response').classList.add("alert", "alert-danger");
            } 
        })
        .catch(error => {
            document.getElementById('response').innerText = 'Error sending message.';
            document.getElementById('response').classList.add("alert", "alert-danger");
            console.error('Error:', error);
        });
       
    });       

}   

contact ();

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}