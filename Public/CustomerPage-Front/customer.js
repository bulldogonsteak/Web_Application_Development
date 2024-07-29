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




document.addEventListener('DOMContentLoaded', function () {
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('#searchCircle');
    const searchInput = document.querySelector('#searchInput');

    searchIcon.addEventListener('click', function () {
        searchContainer.classList.toggle('expanded');
        searchInput.focus();
    });

    searchInput.addEventListener('blur', function () {
        searchContainer.classList.remove('expanded');
    });
});









//show the payment form when clicking on the "go to payment" button
document.querySelector('.payment-btn').addEventListener('click', function () {
    // Show the payment card
    document.getElementById('paymentCard').style.display = 'block';


});



// Remove the product from the cart
function removeProduct(element) {
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
    products.forEach(function (product) {
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



// Select the buttons and Add click event listeners
document.addEventListener("DOMContentLoaded", function () {
    const continueBtn = document.querySelector(".continue-btn");
    const discoverGamesBtn = document.querySelector(".btn-light");

    continueBtn.addEventListener("click", continueShopping);
    discoverGamesBtn.addEventListener("click", continueShopping);
});



// Redirect to the products page
function continueShopping() {
    window.location.href = '../ProductsPage-Front/products.html';
}













/////////////////////////////////////////////////////////////////////////////////

//send a request when the form is submitted
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather payment data
        const paymentData = {
            cardName: document.getElementById('cardName').value,
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value
        };

        // Send data using fetch
        fetch('/api/payment', { // Adjust URL to your server endpoint//////////////////לחכות לעדיאל
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle successful payment response
                if (data.success) {
                    alert('Payment successful!');
                    window.location.href = '/thank-you'; // Redirect on successful payment
                } else {
                    alert('Payment failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}







// Retrieve order history on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8088/orders', { // Adjust URL to your server endpoint
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order History:', data);

            // Assuming data is an array of orders
            const orders = data.orders; // Adjust according to your actual response structure

            // Get the element where you want to display orders
            const orderHistoryContainer = document.getElementById('OrderHistory').querySelector('.list-group');

            // Clear any existing content
            orderHistoryContainer.innerHTML = '';

            orders.forEach(order => {
                // Create a list item for each order
                const orderItem = document.createElement('li');
                orderItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

                // Create content for order
                const orderContent = document.createElement('div');
                orderContent.classList.add('ms-2', 'me-auto');

                const orderTitle = document.createElement('div');
                orderTitle.classList.add('fw-bold');
                orderTitle.textContent = `Order No. #${order.id}`; // Adjust according to your order structure

                const productList = document.createElement('ul');

                order.products.forEach(product => {
                    // Create a list item for each product
                    const productItem = document.createElement('li');
                    productItem.textContent = `${product.name} - $${product.price}`; // Adjust according to your product structure

                    // Create download link if needed
                    if (product.downloadLink) {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = product.downloadLink;
                        downloadLink.classList.add('btn', 'btn-link');
                        downloadLink.textContent = 'Download';
                        productItem.appendChild(downloadLink);
                    }

                    productList.appendChild(productItem);
                });

                orderContent.appendChild(orderTitle);
                orderContent.appendChild(productList);

                // Create a badge for order total
                const orderBadge = document.createElement('span');
                orderBadge.classList.add('badge', 'text-bg-primary', 'rounded-pill');
                orderBadge.textContent = `$${order.total}`; // Adjust according to your order structure

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteOrder(order.id); // Set delete functionality

                // Create update button
                const updateButton = document.createElement('button');
                updateButton.classList.add('btn', 'btn-warning', 'btn-sm', 'ms-2');
                updateButton.textContent = 'Update';
                updateButton.onclick = () => updateOrder(order.id); // Set update functionality

                // Append buttons to order item
                orderItem.appendChild(orderContent);
                orderItem.appendChild(orderBadge);
                orderItem.appendChild(deleteButton);
                orderItem.appendChild(updateButton);

                // Append order item to container
                orderHistoryContainer.appendChild(orderItem);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
});

// Function to handle delete operation
function deleteOrder(orderId) {
    fetch(`http://localhost:8088/orders/${orderId}`, { // Adjust URL to your server endpoint
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log(`Order ${orderId} deleted successfully`);
                // Optionally, refresh the order history list
                document.dispatchEvent(new Event('DOMContentLoaded')); // Re-trigger the fetch
            } else {
                console.error(`Failed to delete order ${orderId}`);
            }
        })
        .catch(error => console.error('Error deleting order:', error));
}

// Function to handle update operation
function updateOrder(orderId) {
    const updatedOrder = {
        // Collect updated order data here
        // For example, open a form or prompt the user for details
        // Here, we're using a static example
        products: [
            { name: 'Updated Game 1', price: 20.99, downloadLink: 'updated-download-link' },
            { name: 'Updated Game 2', price: 25.99, downloadLink: 'updated-download-link' }
        ],
        total: 46.98
    };

    fetch(`http://localhost:8088/orders/${orderId}`, { // Adjust URL to your server endpoint
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Order ${orderId} updated successfully`, data);
            // Optionally, refresh the order history list
            document.dispatchEvent(new Event('DOMContentLoaded')); // Re-trigger the fetch
        })
        .catch(error => console.error('Error updating order:', error));
}







// Function to fetch cart items
function fetchCartItems() {
    fetch('http://localhost:8088/cart', { // Adjust URL to your server endpoint
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cart Items:', data);
        const cartContainer = document.querySelector('#MyCart .card-container');
        cartContainer.innerHTML = ''; // Clear current cart items

        if (data.cart.length === 0) {
            document.getElementById('emptyMessage').style.display = 'block';
        } else {
            document.getElementById('emptyMessage').style.display = 'none';
        }

        data.cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            
            const trashIcon = document.createElement('i');
            trashIcon.classList.add('bi', 'bi-dash-circle-fill', 'trash');
            trashIcon.onclick = () => removeProduct(item.id);

            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            
            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.id = 'ItemPIC';

            const priceElement = document.createElement('p');
            priceElement.classList.add('price');
            priceElement.textContent = `$${item.price}`;

            const nameElement = document.createElement('p');
            nameElement.textContent = item.name;

            cardElement.appendChild(imgElement);
            cardElement.appendChild(priceElement);
            cardElement.appendChild(nameElement);

            productElement.appendChild(trashIcon);
            productElement.appendChild(cardElement);

            cartContainer.appendChild(productElement);
        });
    })
    .catch(error => console.error('Error fetching cart items:', error));
}

// Function to add an item to the cart
function addToCart(item) {
    fetch('http://localhost:8088/cart', { // Adjust URL to your server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item added to cart:', data);
        fetchCartItems(); // Refresh cart items
    })
    .catch(error => console.error('Error adding item to cart:', error));
}

// Function to remove a product from the cart
function removeProduct(productId) {
    fetch(`http://localhost:8088/cart/${productId}`, { // Adjust URL to your server endpoint
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item removed from cart:', data);
        fetchCartItems(); // Refresh cart items
    })
    .catch(error => console.error('Error removing item from cart:', error));
}

// Fetch cart items when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchCartItems(); // Fetch cart items on page load

    // Example usage for adding an item (Uncomment and adjust as needed)
    // addToCart({ id: 1, name: 'Game Name', price: 19.99, image: '../Pictures/game1.webp' });
});




//Fetch Personal Info (GET Request)
function fetchPersonalInfo() {
    fetch('http://localhost:8088/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('shippingAddress').value = data.shippingAddress;
        document.getElementById('email').value = data.email;
    })
    .catch(error => console.error('Error fetching personal info:', error));
}





//Update Personal Info (PUT Request)
document.getElementById('personalInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const updatedInfo = {
        fullName: document.getElementById('fullName').value,//////////////לשאול את עדיאל
        shippingAddress: document.getElementById('shippingAddress').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8088/user/profile', {////////////////////////
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInfo)
    })
    .then(response => {
        if (response.ok) {
            console.log('Personal info updated successfully');
            fetchPersonalInfo(); // Refresh personal info
        } else {
            console.error('Failed to update personal info');
        }
    })
    .catch(error => console.error('Error updating personal info:', error));
});


document.addEventListener('DOMContentLoaded', () => {
    fetchPersonalInfo(); // Fetch personal info on page load
});



//Send a Logout Request to the Server
document.addEventListener('DOMContentLoaded', () => {
    // Add an event listener to the logout icon
    document.getElementById('logoutIcon').addEventListener('click', () => {
        // Send a request to the server to log out
        fetch('http://localhost:8088/logout', {
            method: 'POST', // or 'DELETE' based on your server setup
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Handle successful logout, e.g., redirect to login page
                window.location.href = '/login.html';
            } else {
                // Handle errors or failed logout
                console.error('Failed to log out');
            }
        })
        .catch(error => console.error('Error during logout:', error));
    });
});

