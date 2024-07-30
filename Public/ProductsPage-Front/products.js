// CLIENT SIDE
// PRODUCTS PAGE

function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("openBtn").style.display = "none"; // Hide the button
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("openBtn").style.display = "block"; // Show the button
}

function myFunction(textId) {
    var text = document.getElementById(textId);
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const genres = ["Action", "Adventure", "Arcade", "Multiplayer", "Fantasy", "Racing", "Sports", "Strategy", "Wargame"];
    const sortBy = ["Bestsellers", "Price: Low to High", "Price: High to Low", "Lowest Rated"];
    const systems = ["PlayStation 4","PlayStation 5","Xbox One", "Xbox Series X|S", "Nintendo", "PC"];

    populateDropdown("genresDropdown", genres);
    populateDropdown("sortByDropdown", sortBy);
    populateDropdown("systemsDropdown", systems);

    function populateDropdown(dropdownId, items) {
        const dropdownContent = document.getElementById(dropdownId);
        items.forEach(item => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = item;
            dropdownContent.appendChild(link);
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            imgSrc: '../Pictures/game1.webp',
            videoSrc: '../Videos/ghost-of-tsushima-VIDEO.webm',
            name: 'Tailored Jeans',
            price: '$19.99',
        },
        {
            imgSrc: '../Pictures/game2.jpg',
            videoSrc: '../Videos/elden-ring-VIDEO.webm',
            name: 'Cool Shirt',
            price: '$29.99',
        },
        {
            imgSrc: '../Pictures/game3.jpeg',
            videoSrc: '../Videos/destiny-2-VIDEO.webm',
            name: 'Cool Shirt',
            price: '$29.99',
        },
        // Add more product objects as needed
    ];

    const cardContainer = document.getElementById('cardContainer');
    const cardTemplate = document.getElementById('cardTemplate').content;

    products.forEach(product => {
        const cardClone = document.importNode(cardTemplate, true);
        cardClone.querySelector('.product-image').src = product.imgSrc;
        cardClone.querySelector('.product-video source').src = product.videoSrc;
        cardClone.querySelector('.product-name').textContent = product.name;
        cardClone.querySelector('.price').textContent = product.price;

        cardContainer.appendChild(cardClone);
    });
    const imageContainers = document.querySelectorAll('.media-container');

    imageContainers.forEach(container => {
        const video = container.querySelector('video');

        container.addEventListener('mouseover', function() {
            video.play();
        });

        container.addEventListener('mouseout', function() {
            video.pause();
            video.currentTime = 0;
        });
    });
});





// מעביר לדף של המוצר הבודד בעת לחיצה על אחד מהמוצרים
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.getElementsByClassName('media-container');
    for (let card of cards) {
        card.addEventListener('click', function() {
            window.location.href = '../Product-Front/product.html';
        });
    }
  });










  //////////////////////////////////////////////////////////////////////////////////////////
  
  //  בקשה לשרת לעדכון, הוספה ומחיקת מוצר מתבצעת דרך הדף נחיתה של המנהל 
  
  //GET request
  document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const cardTemplate = document.getElementById('cardTemplate').content;

    // Function to fetch and display products
    function loadProducts() {
        fetch('/api/products') // Adjust URL to your server endpoint
            .then(response => response.json())
            .then(data => {
                // Sort products by release date to get the latest ones
                const sortedProducts = data.products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                const latestProducts = sortedProducts.slice(0, 6); // Get the latest 6 products

                // Clear existing products
                cardContainer.innerHTML = '';

                // Create product cards dynamically
                latestProducts.forEach(product => {
                    const card = document.importNode(cardTemplate, true);

                    // Set image or video based on availability
                    if (product.image) {
                        card.querySelector('.product-image').src = product.image;
                        card.querySelector('.product-image').style.display = 'block';
                        card.querySelector('.product-video').style.display = 'none';
                    }

                    if (product.video) {
                        card.querySelector('.product-video source').src = product.video;
                        card.querySelector('.product-video').load();
                        card.querySelector('.product-video').style.display = 'block';
                        card.querySelector('.product-image').style.display = 'none';
                    }

                    // Set product details
                    card.querySelector('.product-name').textContent = product.name;
                    card.querySelector('.price').textContent = `$${product.price}`;

                    // Add event listener for "Add to Cart" button
                    card.querySelector('.add-to-cart').addEventListener('click', () => {
                        addToCart(product._id); // Use _id for MongoDB unique identifier
                    });

                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to handle adding product to cart - POST request
    function addToCart(productId) {
        fetch('/api/cart', { // Adjust URL to your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId }) // Send the product ID
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added to cart!');
            } else {
                alert('Failed to add product to cart.');
            }
        })
        .catch(error => console.error('Error adding product to cart:', error));
    }

    loadProducts(); // Call function to load products when the page loads
});

