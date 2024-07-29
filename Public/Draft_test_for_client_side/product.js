document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    if (productId) {
        fetchProductById(productId);
    }
});

async function fetchProductById(productId) {
    try {
        const response = await fetch(`http://localhost:8088/products/2`,{
            method: "GET",
        }); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}






