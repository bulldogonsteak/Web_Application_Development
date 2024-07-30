    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const userType = document.getElementById('userType').checked;

        if (userType) {
            // If "I am a manager" is checked, redirect to the manager landing page
            window.location.href = '../ManagerPage-Front/manager.html';
        } else {
            // If "I am a customer" is checked, redirect to the customer landing page
            window.location.href = '../CustomerPage-Front/customer.html';
        }
    });



    // clicking on the X icon redirects to the main page
    document.querySelector('.ToReturn').addEventListener('click', function() {
        window.location.href = '../MainPage-Front/index.html';
    });










    ////////////////////////////////////////////////////////////////////////////////////////////

    //send a request when the form is submitted
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');
    
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
    
            // Gather form data
            const email = document.getElementById('input1').value;
            const password = document.getElementById('input2').value;
            const userType = document.getElementById('userType').checked ? 'manager' : 'customer';
    
            const data = {
                emailAddress: email,
                password: password,
                userType: userType
            };
    
            // Send data using fetch
            fetch('http://localhost:8088/loginHome/login', { // Adjust URL to your server endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle successful login response
                if (data.success) {//////////////////////////////////////ID is the email?
                    window.location.href = `http://localhost:8088/user/${data._id}`; // Redirect to user-specific page
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
    
    


 
    
