//CLIENT SIDE
//PRODUCTS PAGE


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
            imgSrc: 'mainPage/pictures/game1.webp',
            name: 'Tailored Jeans',
            price: '$19.99',
            
        },
        {
            imgSrc: 'mainPage/pictures/game2.jpg',
            name: 'Cool Shirt',
            price: '$29.99',
          
        },
        {
            imgSrc: 'mainPage/pictures/game3.jpeg',
            name: 'Cool Shirt',
            price: '$29.99',
            
        },
        {
            imgSrc: 'mainPage/pictures/game3.jpeg',
            name: 'Cool Shirt',
            price: '$29.99',
            
        },
        {
            imgSrc: 'mainPage/pictures/game3.jpeg',
            name: 'Cool Shirt',
            price: '$29.99',
            
        },
        {
            imgSrc: 'mainPage/pictures/game3.jpeg',
            name: 'Cool Shirt',
            price: '$29.99',
            
        }
        // Add more product objects as needed
    ];

    const cardContainer = document.getElementById('cardContainer');
    const cardTemplate = document.getElementById('cardTemplate').content;

    products.forEach(product => {
        const cardClone = document.importNode(cardTemplate, true);
        cardClone.querySelector('.product-image').src = product.imgSrc;
        cardClone.querySelector('.product-name').textContent = product.name;
        cardClone.querySelector('.price').textContent = product.price;
        

        cardContainer.appendChild(cardClone);
    });
});
