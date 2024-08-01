function initMap() {
  console.log("initMap called");
  var mapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // New York City
      zoom: 10,
      mapTypeId: 'roadmap'
  };
  try {
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      console.log("Map initialized successfully");
  } catch (error) {
      console.error("Error initializing map:", error);
  }
}

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

  const cards = document.getElementsByClassName('card');
  for (let card of cards) {
    const img = card.querySelector('.image_container .card-img');
    const productId = img.getAttribute('id');
    console.log("product id in cards: " + productId);
      card.addEventListener('click', function () {
          window.location.href = `../Product-Front/product.html?productId=${productId}`;  // Replace with the actual path to your product page
      });
  }
});

// document.getElementById('loginIcon').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default anchor behavior

//     fetch('http://localhost:5500/loginHome/login', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // Handle the response data here
//         // For example, you can redirect to another page
//         window.location.href = 'http://localhost:5500/loginHome/login'; ////
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });


