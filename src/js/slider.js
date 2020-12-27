let slider = document.querySelector('.slider');
let sliderContainer = document.querySelector('.slider__items');
let sliderItems = document.querySelectorAll('div.slide');

let indicatorIndex = 0,
    indicatorIndexMax = sliderItems.length - 1,
    currentPosition = 0,
    transformValue = 0,
    transformStep = 100,
    indicatorItems,
    timerId;

let itemsList = [];
for(let i = 0; i < sliderItems.length; i++){
    itemsList.push({item: sliderItems[i], position: i, transform: 0});
}

let position = {
    getItemIndex: function(mode) {
      let index = 0;
      for(let i = 0; i < itemsList.length; i++){
        if((itemsList[i].position < itemsList[index].position && mode === 'min') || (itemsList[i].position > itemsList[index].position && mode === 'max')){
          index = i;
        }
      }
      return index;
    },
    getItemPosition: function(mode){
      return itemsList[position.getItemIndex(mode)].position;
    }
};

function moveSlide(direction){
    let nextItem;
    let currentIndicator = indicatorIndex;
    if(direction === 'next'){
      currentPosition++;
      if(currentPosition > position.getItemPosition('max')){
        nextItem = position.getItemIndex('min');
        itemsList[nextItem].position = position.getItemPosition('max') + 1;
        itemsList[nextItem].transform += itemsList.length * 100;
        itemsList[nextItem].item.style.transform = `translateX(${itemsList[nextItem].transform}%)`;
      }
  
      transformValue -= transformStep;
      indicatorIndex++;
      if(indicatorIndex > indicatorIndexMax){
        indicatorIndex = 0;
      }
    }else{
      currentPosition--;
      if(currentPosition < position.getItemPosition('min')){
        nextItem = position.getItemIndex('max');
        itemsList[nextItem].position = position.getItemPosition('min') - 1;
        itemsList[nextItem].transform -= itemsList.length * 100;
        itemsList[nextItem].item.style.transform = `translateX(${itemsList[nextItem].transform}%)`;
      }
  
      transformValue += transformStep;
      indicatorIndex--;
      if(indicatorIndex < 0) {
        indicatorIndex = indicatorIndexMax;
      }
    }
  
    sliderContainer.style.transform = `translateX(${transformValue}%)`;
    indicatorItems[currentIndicator].classList.remove('active');
    indicatorItems[indicatorIndex].classList.add('active');
}

function moveTo(index){
    let i = 0;
    let direction = (index > indicatorIndex) ? 'next' : 'prev';
    while(index != indicatorIndex && i <= indicatorIndexMax){
      moveSlide(direction);
      i++;
    }
}

function addIndicators(){
    let indicatorsContainer = document.createElement('ol');
    indicatorsContainer.classList.add('slider__points');
    for(let i = 0; i < sliderItems.length; i++){
      let sliderIndicatorsItem = document.createElement('li');
      if(i === 0){
        sliderIndicatorsItem.classList.add('active');
      }
      sliderIndicatorsItem.setAttribute('data-slide', i);
      indicatorsContainer.appendChild(sliderIndicatorsItem);
    }
    slider.appendChild(indicatorsContainer);
    indicatorItems = slider.querySelectorAll('.slider__points > li');
}
  
slider.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-slide')){
      e.preventDefault();
      moveTo(parseInt(e.target.getAttribute('data-slide')));
      startAutoPlay();
    }
});

function startAutoPlay(){
    stopAutoPlay();
    timerId = setInterval(() => moveSlide('next'), 5000);
}

function stopAutoPlay(){
    clearInterval(timerId);
}

window.onload = function(){
    startAutoPlay();
    addIndicators();
}