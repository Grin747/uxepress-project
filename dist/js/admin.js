const IMAGE_FORMAT_ERROR = 'Неверный формат изображения';
const TEXTAREA_LIMIT_ERROR = 'Превышен лимит символов';

let addNewsForm = document.querySelector('.add__news-form');
let textarea = document.querySelector('.add__news-textarea');
let textareaInfo = document.querySelector('.add__news-textarea_info');
let addImageButton = document.querySelector('.upload-image__input');
let closeImageButton = document.querySelector('.uploaded-image__close-btn');
let submitButton = document.querySelector('.add__news-btn-submit');
let errorBlock = document.querySelector('.add__news-error-block');

let uploadedImage = {
    container: document.querySelector('.uploaded-image__container'),
    icon: document.querySelector('.uploaded-image__icon'),
    name: document.querySelector('.uploaded-image__name')
};
let fileReader = new FileReader();
let image = new Image();
let imageInfo = {
    url: null,
    imageName: null
}

textarea.onkeyup = () => {
    textareaInfo.innerHTML = `Символов: ${textarea.value.length}/150`;
    if(textarea.value.length > 150){
        textareaInfo.innerHTML = `Символов: <span class="limit-symbols">${textarea.value.length}</span>/150`;
        errorBlock.innerHTML = TEXTAREA_LIMIT_ERROR;
    }else{
        deleteError();
    }
};

addImageButton.addEventListener('change', () => {
    let file = addImageButton.files[0];
    fileReader.readAsDataURL(file);
    if(file.name.length > 25){
        imageInfo.imageName = `${imageInfo.imageName.slice(0, 20)}...${file.type.match('jpeg|jpg|png')}`;
    }else{
        imageInfo.imageName = file.name;
    }
});

fileReader.addEventListener('load', (e) => {
    let url = e.target.result;
    image.src = url;
    imageInfo.url = url;
});

function showUploadedImage(){
    uploadedImage.container.classList.toggle('uploaded-image__container--active');
    uploadedImage.icon.src = imageInfo.url;
    uploadedImage.name.innerHTML = imageInfo.imageName;
}

image.addEventListener('load', () => {
    let width = image.width;
    let height = image.height;
    if(width <= 270 && height <= 270){
        showUploadedImage();
        deleteError();
    }else{
        errorBlock.innerHTML = IMAGE_FORMAT_ERROR;
        deleteImage();
    }
    
});

closeImageButton.addEventListener('click', (e) => {
    e.preventDefault();
    uploadedImage.container.classList.toggle('uploaded-image__container--active');
    deleteImage();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(errorBlock.innerHTML.length === 0){
        addNewsForm.submit();
    }
});

function deleteImage(){
    addImageButton.value = null;
    imageInfo.imageName = null;
    imageInfo.url = null;
    uploadedImage.icon.src = '';
    uploadedImage.name.innerHTML = '';
}

function deleteError(){
    errorBlock.innerHTML = '';
}
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