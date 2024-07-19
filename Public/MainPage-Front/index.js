// CLIENT SIDE
//MAIN PAGE


document.addEventListener('DOMContentLoaded', function () {
    const imageContainers = document.querySelectorAll('.image_container');

    imageContainers.forEach(container => {
        const video = container.querySelector('video');

        container.addEventListener('mouseover', function () {
            video.play();
        });

        container.addEventListener('mouseout', function () {
            video.pause();
            video.currentTime = 0;
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('#searchCircle');
    const searchInput = document.querySelector('#searchInput');

    searchIcon.addEventListener('click', function () {
        searchContainer.classList.toggle('expanded');
        searchInput.focus();
    });

    searchInput.addEventListener('blur', function () {
        searchContainer.classList.remove('expanded');
    });
});
    