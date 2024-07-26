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

    // Update the cart summary
    updateCartSummary();
}

function updateCartSummary() {
    // Get all product elements
    var products = document.querySelectorAll('.product');

    // Get the empty message element
    var emptyMessage = document.getElementById('emptyMessage');

    // Calculate the total price
    var total = 0;
    products.forEach(function(product) {
        var priceText = product.querySelector('.price').innerText;
        var price = parseFloat(priceText.replace('$', ''));
        total += price;
    });

    // Update the subtotal display
    document.getElementById('subtotalAmount').innerText = total.toFixed(2) + '$';

    // Check if there are no products left
    if (products.length === 0) {
        // Show the empty message
        emptyMessage.style.display = 'block';
        emptyMessage.style.marginTop = '2%';
    } else {
        // Hide the empty message
        emptyMessage.style.display = 'none';
    }
}

// Initial check in case the cart starts empty
updateCartSummary();

document.addEventListener("DOMContentLoaded", function() {
    // Select the buttons
    const continueBtn = document.querySelector(".continue-btn");
    const discoverGamesBtn = document.querySelector(".btn-light");

    // Add click event listeners
    continueBtn.addEventListener("click", continueShopping);
    discoverGamesBtn.addEventListener("click", continueShopping);
});

function continueShopping() {
    // Redirect to the products page
    window.location.href = '../ProductsPage-Front/products.html'; // Replace with your products page URL
}
