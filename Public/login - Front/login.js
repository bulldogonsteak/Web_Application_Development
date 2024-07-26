    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        var userType = document.getElementById('userType').checked;

        if (userType) {
            // If "I am a manager" is checked, redirect to the manager landing page
            window.location.href = '../ManagerPage-Front/manager.html';
        } else {
            // If "I am a customer" is checked, redirect to the customer landing page
            window.location.href = '../CustomerPage-Front/customer.html';
        }
    });
