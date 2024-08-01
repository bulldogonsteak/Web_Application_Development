// מעביר לדף של המוצר הבודד בעת לחיצה על אחד מהמוצרים
//לבדוק אם עובד על מוצר אחר
document.addEventListener("DOMContentLoaded", function() {
    const clickableCol = document.getElementById('clickable-col');
    if (clickableCol) {
        clickableCol.addEventListener('click', function() {
            window.location.href = '../Product-Front/product.html'; 
        });
    }
});




/////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: realize api route
// realize - send a request when the "Add to cart" button is clicked

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.cart');
    addToCartButton.addEventListener('click', () => {

        const productCard = document.querySelector('.product-card');
        const productID = productCard.getAttribute('data-id');

        // Define the data to be sent
        const productData = {
            _id: productID, // Include the product ID
            name: document.querySelector('#product-name').innerText,
            price: document.querySelector('.product-price').innerText,
        };

        // Send the request
        fetch('http://localhost:5500/cart/add', {//////////////////////////////לעדכן
            method: 'POST', // Use POST method for sending data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData) // Convert data to JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally, update the UI or handle the response here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});





   // TODO: realize api route
// realize - GET request for a product, the img, name, cost will change

  
  document.addEventListener('DOMContentLoaded', () => {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productId = getQueryParam('productId'); // Get the 'id' parameter from the URL
    console.log("productID in html: " + productId);  // Output the productId

    if (productId) {
        loadProduct(productId); // Load the product with the extracted ID
    } else {
        console.error('Product ID not found in the URL.');
    }

    function loadProduct(productId) {
        fetch(`http://localhost:5500/products/${productId}`)// ${productId} ////////////////////////////////////לשנות
            .then(response => response.json())
            .then(data => {
                // Update product details on the page
                document.querySelector('.product-name').textContent = data.name;
                document.querySelector('.product-price').textContent = `$${data.price}`;
                document.querySelector('.imageOfproduct img').src = `../Pictures/${data.name}.jpg`;
                document.querySelector('.Description p').textContent = data.description;

                // Update main image
                document.getElementById('mainPic').src = data.mainImage;

                // Update stock information
                const stockInfo = document.querySelector('.stock');
                stockInfo.innerHTML = `
                    <i class="bi bi-check-lg"></i>
                    <a id="pcTag">${data.stockStatus}</a>
                    <i class="bi bi-check-lg"></i>
                    <a id="consoleTag">${data.deliveryType}</a>
                `;

                // Update user tags
                const userTagsContainer = document.querySelector('.UserTags');
                userTagsContainer.innerHTML = `
                    <p>User tags*:</p>
                    ${data.tags.map(tag => `<button type="button" class="btn btn-secondary">${tag}</button>`).join(' ')}
                `;

                // Similar products
                const similarProductsContainer = document.querySelector('.similarProducts .row');
                similarProductsContainer.innerHTML = ''; // Clear existing products
                
                data.similarProducts.forEach(product => {
                    const col = document.createElement('div');
                    col.classList.add('col');
                    col.innerHTML = `
                        <div class="card">
                            <img src="${product.image}" id="imgCard" alt="...">
                            <div class="card-body">
                                <p class="card-title">${product.name}</p>
                                <p class="card-text">$${product.price}</p>
                            </div>
                        </div>
                    `;
                    similarProductsContainer.appendChild(col);
                });

                // Comments
                const commentsContainer = document.querySelector('.comments-grid');
                commentsContainer.innerHTML = ''; // Clear existing comments
                
                data.comments.forEach(comment => {
                    const commentCard = document.createElement('div');
                    commentCard.classList.add('comment-card');
                    commentCard.innerHTML = `
                        <div class="user-info">
                            <i id="logo-user" class="bi bi-person-circle"></i>
                            <p class="name">${comment.userName}</p>
                            <p class="card-text">${comment.text}</p>
                            <div class="user-rating">
                                <span>${'★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating)}</span>
                            </div>
                        </div>
                        <span class="comment-date">${comment.date}</span>
                    `;
                    commentsContainer.appendChild(commentCard);
                });
            })
            .catch(error => console.error('Error fetching product:', error));
    }
});

