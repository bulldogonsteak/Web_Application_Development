

//send a request to the server when the registration form is submitted
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = {
            emailAddress: document.getElementById('email').value,
            password: document.getElementById('password').value,
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            birthdate: document.getElementById('birthdate').value,
            country: document.getElementById('country').value,
            agreedToTermsPolicy: document.getElementById('agree').checked
        };

        // Send data using fetch
        fetch('http://localhost:8088/loginHome/register', { // Adjust URL to your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle successful registration response
            if (data.success) {
                window.location.href = 'http://localhost:8088/mainpage'; /////// Redirect on successful registration
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});