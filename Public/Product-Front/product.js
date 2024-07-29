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
      // Define the data to be sent
      const productData = {
        name: document.querySelector('#product-name').innerText,
        price: document.querySelector('.product-price').innerText,
      };
  
      // Send the request
      fetch('http://localhost:8088/cart', {
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






  //send a request when the "Favorite" button is clicked
  document.addEventListener('DOMContentLoaded', () => {

    const favoriteButton = document.getElementById('favoriteButton');
    favoriteButton.addEventListener('click', () => {
        // Example URL for your server endpoint
        const url = 'https://example.com/api/favorite';

        // Example data to send with the request (could be product ID, user ID, etc.)
        const data = {
            productId: '12345', // Replace with actual product ID
            userId: '67890' // Replace with actual user ID if needed
        };

        // Send a POST request to the server
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log('Success:', data);
            // Optionally update the button UI or state here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

  