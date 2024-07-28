




// מעביר לדף של הפריט הבודד בעת לחיצה על אחד מהפריטים
//לבדוק אם עובד על מוצר אחר
document.addEventListener("DOMContentLoaded", function() {
    const clickableCol = document.getElementById('clickable-col');
    if (clickableCol) {
        clickableCol.addEventListener('click', function() {
            window.location.href = '../Product-Front/product.html';  // Replace with the actual path to your product page
        });
    }
});

