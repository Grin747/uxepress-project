let loginButton = document.querySelector('.login-btn');
let modalWindow = document.querySelector('.modal__window');
let closeButton = document.querySelector('.close-btn');

loginButton.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

closeButton.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

window.addEventListener('click', (e) => {
    if(e.target == modalWindow){
        modalWindow.classList.toggle("modal__window--active");
    }
});