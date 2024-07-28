document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    if (productId) {
        fetchProductById(productId);
    }
});

async function fetchProductById(productId) {
    try {
        const response = await fetch(`http://localhost:8088/products/2`,{}); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = `
        <div class="product-card">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="cart" onclick="addToCart('${product._id}')">Add to cart</button>
            </div>
        </div>
    `;
}




