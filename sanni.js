function animateButton(button) {
    button.style.backgroundColor = 'black';
    button.style.color = 'white';
    button.style.transition = 'background-color 0.5s, color 0.5s';
    setTimeout(() => {
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 1000);
}

function showAlert(offer) {
    alert("You clicked on " + offer);
}

const searchBar = document.getElementById('search-bar');
const placeholders = ['Search for products...', 'Find your favorites...', 'Discover new trends...'];
let index = 0;

setInterval(() => {
    searchBar.placeholder = placeholders[index];
    index = (index + 1) % placeholders.length;
}, 2000);