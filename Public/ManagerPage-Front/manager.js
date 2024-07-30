// CLIENT SIDE
//MANAGER PAGE



document.addEventListener('DOMContentLoaded', () => {
    const actionSelect = document.getElementById('action');
    const typeSelect = document.getElementById('type');
    const inputContainer = document.getElementById('inputContainer');
    const inputField = document.getElementById('inputField');
    const fetchDetailsBtn = document.getElementById('fetchDetailsBtn');
    const showManagerForm = document.getElementById('showManagerForm');
    const managerActionForm = document.getElementById('managerActionForm');
    const formContainer = document.getElementById('form-container');
    const confirmationIcon = document.getElementById('confirmation-icon');

    const forms = {
        customer: `
            <div class="employee-and-customer-grid">
                <div class="customer-form-section">
                    <h2></h2>
                    <div class="customer-form">
                        <form class="input" id="customer-form" action="/create-customer" method="post">
                            <div class="form-group">
                                <label for="customer-email">Email:</label>
                                <input type="email" id="customer-email" placeholder="Enter customer email">
                            </div>
                            <div class="form-group">
                                <label for="customer-password">Password:</label>
                                <input type="password" id="customer-password" placeholder="Enter customer password">
                            </div>
                            <div class="form-group">
                                <label for="customer-firstname">First Name:</label>
                                <input type="text" id="customer-firstname" placeholder="Enter customer first name">
                            </div>
                            <div class="form-group">
                                <label for="customer-lastname">Last Name:</label>
                                <input type="text" id="customer-lastname" placeholder="Enter customer last name">
                            </div>
                            <div class="form-group">
                                <label for="customer-birthdate">Birthdate:</label>
                                <input type="date" id="customer-birthdate" placeholder="Enter customer birthdate">
                            </div>
                            <div class="form-group">
                                <label for="customer-country">Country:</label>
                                <select id="customer-country">
                                    <option value="Israel">Israel</option>
                                    <option value="UnitedStates">United States</option>
                                    <option value="UnitedKingdom">United Kingdom</option>
                                    <option value="France">France</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="customer-role">Role:</label>
                                <select id="customer-role">
                                    <option value="Customer">Customer</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>
                            <div class="customer-actions">
                                <button type="submit">Create Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `,
        product: `
            <div class="employee-and-product-grid">
                <div class="product-form-section">
                    <h2></h2>
                    <div class="product-form">
                        <form class="input" id="product-form" action="/create-product" method="post">
                            <div class="form-group">
                                <label for="product-id">Product ID:</label>
                                <input type="text" id="product-id" placeholder="Enter product ID">
                            </div>
                            <div class="form-group">
                                <label for="product-name">Product Name:</label>
                                <input type="text" id="product-name" placeholder="Enter product name">
                            </div>
                            <div class="form-group">
                                <label for="product-description">Product Description:</label>
                                <textarea id="product-description" placeholder="Enter product description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="product-image">Upload Product Image:</label>
                                <input type="file" id="product-image" accept="image/*">
                            </div>
                            <div class="form-group">
                                <label for="product-price">Product Price:</label>
                                <input type="number" id="product-price" placeholder="Enter product price">
                            </div>
                            <div class="form-group">
                                <label for="product-amount">Product Amount:</label>
                                <input type="number" id="product-amount" placeholder="Enter product amount" min="0">
                            </div>
                            <div class="form-group">
                                <label for="product-category">Product Category:</label>
                                <select id="product-category">
                                    <option value="">Select category</option>
                                    <option value="pc">PC</option>
                                    <option value="playstation">PlayStation</option>
                                    <option value="xbox">Xbox</option>
                                    <option value="nintendo">Nintendo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button id="create-product">Create Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `,
        supplier: `
            <div class="employee-and-supplier-grid">
                <div class="supplier-form-section">
                    <h2></h2>
                    <div class="supplier-form">
                        <form class="input" id="supplier-form" action="/create-supplier" method="post">
                            <div class="form-group">
                                <label for="supplier-name">Name:</label>
                                <input type="text" id="supplier-name" placeholder="Enter supplier name">
                            </div>
                            <div class="form-group">
                                <label for="supplier-email">Email:</label>
                                <input type="email" id="supplier-email" placeholder="Enter supplier email">
                            </div>
                            <div class="form-group">
                                <label for="supplier-phone">Phone:</label>
                                <input type="email" id="supplier-phone" placeholder="Enter supplier phone number">
                            </div>
                            <div class="form-group">
                                <label for="supplier-address">Address:</label>
                                <input type="text" id="supplier-address" placeholder="Enter supplier address">
                            </div>
                            <div class="form-group">
                                <label for="product-types">Product Types Supplied:</label>
                                <input type="text" id="product-types" placeholder="Enter product types supplied">
                            </div>
                            <div class="form-group">
                                <label for="supplier-website">Website:</label>
                                <input type="url" id="supplier-website" placeholder="Enter supplier website URL">
                            </div>
                            <div class="form-group">
                                <label for="supplier-notes">Notes:</label>
                                <textarea id="supplier-notes" placeholder="Enter additional notes"></textarea>
                            </div>
                            <div class="supplier-actions">
                                <button type="submit">Create Supplier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `
    };

    fetchDetailsBtn.addEventListener('click', () => {
        const selectedAction = actionSelect.value;
        const selectedType = typeSelect.value;

        if (selectedAction === 'update' || selectedAction === 'delete') {
            inputContainer.style.display = 'block';
        } else {
            inputContainer.style.display = 'none';
            showForm(selectedAction, selectedType);
        }
    });

    inputField.addEventListener('input', () => {
        if (inputField.value.trim()) {
            fetchDetailsBtn.innerText = 'Next';
        } else {
            fetchDetailsBtn.innerText = 'Fetch Details';
        }
    });

    fetchDetailsBtn.addEventListener('click', () => { 
        const selectedAction = actionSelect.value;
        const selectedType = typeSelect.value;
        const inputValue = inputField.value.trim();

        if ((selectedAction === 'update' || selectedAction === 'delete') && inputValue) {
            showForm(selectedAction, selectedType);
            inputContainer.style.display = 'none';
            fetchDetailsBtn.style.display = 'none';
        }
    });

    function showForm(action, type) {
        formContainer.innerHTML = forms[type];
        const formSection = document.querySelector(`.${type}-form-section`);
        const h2 = formSection.getElementsByTagName('h2')[0];
        if (action==='update' ||action==='delete')
            h2.textContent = `${capitalizeFirstLetter(action)} the ${capitalizeFirstLetter(type)}`;
        else
            h2.textContent = `${capitalizeFirstLetter(action)} a new ${capitalizeFirstLetter(type)}`;
        attachFormSubmitListener(action, type);
    }
        
    
    function attachFormSubmitListener(action, type) {
        const formId = `${type}-form`;
        const form = document.getElementById(formId);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Perform form submission logic here (e.g., send form data to the server)
            form.parentElement.style.display = 'none';
            managerActionForm.style.display = 'none';

            confirmationIcon.style.display = 'block';
            const h3 = confirmationIcon.getElementsByTagName('h3')[0]; // show if the action completed
            h3.textContent = `${capitalizeFirstLetter(type)} successfully ${action}d`;
        });
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    
    showManagerForm.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Reset display styles and inner HTML to their initial states
        managerActionForm.style.display = 'block';
        confirmationIcon.style.display = 'none';
        formContainer.innerHTML = "";
        inputContainer.style.display = 'none';
        fetchDetailsBtn.style.display = 'block';
        fetchDetailsBtn.innerText = 'Fetch Details';
        inputField.value = "";
    }); 
});




///////////////////////////////////////////////////////////////////////////

//Logout Request
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.LogOut').addEventListener('click', () => {
        fetch('http://localhost:8088/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login.html'; // Redirect to login page or another page
            } else {
                console.error('Failed to log out');
            }
        })
        .catch(error => console.error('Error during logout:', error));
    });
});




//update, create, remove requests - manager actions
function attachFormSubmitListener(action, type) {
    const formId = `${type}-form`;
    const form = document.getElementById(formId);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Gather form data
        const formData = new FormData(form);
        
        // Construct the URL for the API endpoint
        //When you use const url = form.action; in your JavaScript code, 
        //you're dynamically retrieving the action URL of the form. 
        //This URL is where the form data will be sent when the form is submitted.
        const url = form.action;
        
        try {
            // Send the form data to the server using fetch
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Handle success
                form.parentElement.style.display = 'none';
                managerActionForm.style.display = 'none';

                confirmationIcon.style.display = 'block';
                const h3 = confirmationIcon.getElementsByTagName('h3')[0]; // show if the action completed
                h3.textContent = `${capitalizeFirstLetter(type)} successfully ${action}d`;
            } else {
                // Handle error
                console.error('Server response was not OK.');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred:', error);
        }
    });
}





//request to the server
//get the latest orders (GET Request)
function fetchLatestOrders() {
    fetch('https://api.yourwebsite.com/latest-orders') // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => {
            console.log(data); // Process the data as needed
            updateOrderCards(data); // Function to update the UI with the fetched data
        })
        .catch(error => console.error('Error fetching orders:', error));
}



//request to the server
//update the latest orders (PUT Request)
function updateOrder(orderId, updatedData) {
    fetch(`https://api.yourwebsite.com/orders/${orderId}`, { // Replace with your API endpoint
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData) // Convert the updated data to a JSON string
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order updated:', data); // Handle the response data
        fetchLatestOrders(); // Refresh the list of orders
    })
    .catch(error => console.error('Error updating order:', error));
}


// Function to update the UI with the fetched data
function updateOrderCards(orders) {
    const cardContainer = document.querySelector('.card-container');

    // Clear existing cards
    cardContainer.innerHTML = '';

    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'Card';

        card.innerHTML = `
            <div class="info">
                <div class="OrderID-container">
                    <a id="ordertxt">order No.</a>
                    <a id="OrderID">#${order.id}</a>
                </div>
                <div class="price-container">
                    <a id="TotalPrice">Total</a>
                    <a id="Totalnum">${order.totalPrice}$</a>
                </div>
                <a id="HoverMe">Hover me to watch purchased items</a>
            </div>
            <div class="Show-on-hover">
                <ul>
                    ${order.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;

        cardContainer.appendChild(card);
    });
}

// Call the function to fetch latest orders on page load
document.addEventListener('DOMContentLoaded', fetchLatestOrders);
