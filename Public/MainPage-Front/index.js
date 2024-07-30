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







// מעביר לדף של הפריט הבודד בעת לחיצה על אחד מהפריטים
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.getElementsByClassName('card');
  for (let card of cards) {
      card.addEventListener('click', function() {
          window.location.href = '../Product-Front/product.html';  // Replace with the actual path to your product page
      });
  }
});




function initMap() {
  console.log("initMap called");
  var mapOptions = {
      center: new google.maps.LatLng(40.7128, -74.0060), // Coordinates for New York City
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}