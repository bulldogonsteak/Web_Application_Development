    document.querySelector('.payment-btn').addEventListener('click', function () {
        // Show the payment card
        document.getElementById('paymentCard').style.display = 'block';

        // Update the progress bar
        document.querySelector('.step:nth-child(2) .circle').classList.add('completed');
        document.querySelector('.step:nth-child(2) .label').classList.add('completed');
        document.querySelector('.step:nth-child(2) ~ .line').classList.add('completed');
    });



   

    function removeProduct(icon) {
        // Find the parent product div of the icon that was clicked
        var product = icon.closest('.product');

        // Remove the product from the DOM
        product.remove();

        // Optionally, update any other parts of the UI or cart summary here
        updateCartSummary();
    }

    function updateCartSummary() {
        // Logic to update the cart summary (e.g., subtotal) can be added here
    }


    function updateCartSummary() {
        // Get all product elements
        var products = document.querySelectorAll('.product');

        // Get the empty message element
        var emptyMessage = document.getElementById('emptyMessage');

        // Check if there are no products left
        if (products.length === 0) {
            // Show the empty message
            emptyMessage.style.display = 'block';
            emptyMessage.style.marginTop='2%';

        } else {
            // Hide the empty message
            emptyMessage.style.display = 'none';
        }
    }

    // Initial check in case the cart starts empty
    updateCartSummary();

