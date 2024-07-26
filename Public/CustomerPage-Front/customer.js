//CLIENT SIDE
//CUSTOMER LANDING PAGE

function openTab(evt, tabName) {
    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "block";
    evt.currentTarget.className += " active";
}










document.addEventListener('DOMContentLoaded', function() {
  const searchContainer = document.querySelector('.search-container');
  const searchIcon = document.querySelector('#searchCircle');
  const searchInput = document.querySelector('#searchInput');

  searchIcon.addEventListener('click', function() {
      searchContainer.classList.toggle('expanded');
      searchInput.focus();
  });

  searchInput.addEventListener('blur', function() {
      searchContainer.classList.remove('expanded');
  });
});










document.querySelector('.payment-btn').addEventListener('click', function () {
    // Show the payment card
    document.getElementById('paymentCard').style.display = 'block';


});


function removeProduct(element) {
    // Remove the product from the cart
    var product = element.closest('.product');
    product.remove();

    // Update the cart summary after removal
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
    } else {
        // Hide the empty message
        emptyMessage.style.display = 'none';
    }
}
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
