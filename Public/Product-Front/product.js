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


//send a request when the "Add to cart" button is clicked
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
        fetch('http://localhost:8088/cart/add', {//////////////////////////////לעדכן
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





    
  //GET request for a product+ his comments
  document.addEventListener('DOMContentLoaded', () => {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const productId = getQueryParam('id'); // Get the 'id' parameter from the URL

    if (productId) {
        loadProduct(productId); // Load the product with the extracted ID
    } else {
        console.error('Product ID not found in the URL.');
    }

    function loadProduct(productId) {
        fetch(`/api/product/${productId}`)
            .then(response => response.json())
            .then(data => {
                // Update product details on the page
                document.querySelector('.product-name').textContent = data.name;
                document.querySelector('.product-price').textContent = `$${data.price}`;
                document.querySelector('.imageOfproduct img').src = data.image;
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




// ////////////////////////////////////////מוותרים?????????///////////////////////////////////////
//   //send a request when the "Favorite" button is clicked
//   document.addEventListener('DOMContentLoaded', () => {
//     const favoriteButton = document.getElementById('favoriteButton');

//     favoriteButton.addEventListener('click', () => {
//         // Retrieve product ID and user ID from data attributes
//         const productId = favoriteButton.getAttribute('data-product-id');
//         const userId = favoriteButton.getAttribute('data-user-id');

//         // Example URL for your server endpoint
//         const url = 'http://example.com/api/favorite';

//         // Data to send with the request
//         const data = {
//             productId: productId,
//             userId: userId
//         };

//         // Send a POST request to the server
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Handle the response from the server
//             console.log('Success:', data);
//             // Optionally update the button UI or state here
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     });
// });
