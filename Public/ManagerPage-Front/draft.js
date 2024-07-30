document.addEventListener('DOMContentLoaded', function() {
    const showManagerForm = document.getElementById('showManagerForm');
    const managerActionForm = document.getElementById('managerActionForm');
    const typeSelect = document.getElementById('type');
    const fetchDetailsBtn = document.getElementById('fetchDetailsBtn');
    const formContainer = document.getElementById('form-container');
    const productTemplate = document.getElementById('productTemplate').innerHTML;

    // Show the manager action form when "Manager Actions" link is clicked
    showManagerForm.addEventListener('click', function(e) {
        e.preventDefault();
        managerActionForm.style.display = 'block';
    });

    // Show the "Fetch Details" button based on the selected type
    typeSelect.addEventListener('change', function() {
        const selectedType = typeSelect.value;
        formContainer.innerHTML = '';  // Clear any existing form
        if (selectedType) {
            fetchDetailsBtn.style.display = 'inline-block';
        } else {
            fetchDetailsBtn.style.display = 'none';
        }
    });

    // Handle the "Fetch Details" button click
    fetchDetailsBtn.addEventListener('click', function() {
        const selectedType = typeSelect.value;
        formContainer.innerHTML = '';  // Clear any existing form

        if (selectedType === 'product') {
            formContainer.innerHTML = productTemplate;
        }
    });
});

// Example function for removing a product
function removeProduct(element) {
    element.parentElement.remove();
}