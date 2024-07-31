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

document.addEventListener('DOMContentLoaded', () => {
    const managerForm = document.getElementById('managerActionForm');
    const fetchDetailsBtn = document.getElementById('fetchDetailsBtn');
    const formContainer = document.getElementById('form-container');

    document.getElementById('showManagerForm').addEventListener('click', () => {
        managerForm.style.display = managerForm.style.display === 'none' ? 'block' : 'none';
    });

    fetchDetailsBtn.addEventListener('click', () => {
        const cardContainer = document.getElementById('CardContainer');
        const productTemplate = document.getElementById('productTemplate').cloneNode(true);
        productTemplate.style.display = 'block';
        cardContainer.appendChild(productTemplate);

        productTemplate.querySelector('.update').addEventListener('click', () => {
            const type = document.getElementById('type').value;
            const formHTML = forms[type];
            formContainer.innerHTML = formHTML;
            formContainer.style.display = 'block';
            productTemplate.insertAdjacentElement('afterend', formContainer);
        });

        productTemplate.querySelector('.create').addEventListener('click', () => {
            const formHTML = forms.product;
            formContainer.innerHTML = formHTML;
            formContainer.style.display = 'block';
            productTemplate.insertAdjacentElement('afterend', formContainer);
        });

        productTemplate.querySelector('.trash').addEventListener('click', () => {
            // Add your delete logic here
            cardContainer.removeChild(productTemplate);
        });
    });
});
