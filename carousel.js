// SELECT ELEMENTS

const nextBtn = document.querySelector('.right-btn');
const prevBtn = document.querySelector('.left-btn');

const carousel = document.querySelector('.carousel');
const slides = [...carousel.querySelectorAll('.slide')];

const nav = document.querySelector('.nav');
const dots = [...nav.querySelectorAll('.dot')];

const slideWidth = slides[0].getBoundingClientRect().width;

function positionSlides(slides) {

    slides.forEach((slide, index) => {
        slide.style.left = `${index * slideWidth}px`;
    });

}

positionSlides(slides);

nextBtn.addEventListener('click', event => {

    const currentSlide = carousel.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(carousel, currentSlide, nextSlide);
    showHideButton(nextSlide, slides);

    moveToDot(nextSlide, slides, dots);

});

prevBtn.addEventListener('click', event => {

    const currentSlide = carousel.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(carousel, currentSlide, prevSlide);
    showHideButton(prevSlide, slides);

    moveToDot(prevSlide, slides, dots);

});

nav.addEventListener('click', event => {
    
    if (!event.target.classList.contains('dot')) return;

    let targetDot = event.target;
    let targetDotIndex = getIndex(targetDot, dots);
    let currentSlide = carousel.querySelector('.active');
    const currentDot = nav.querySelector('.active');
    const targetSlide = slides[targetDotIndex];

    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    showHideButton(targetSlide, slides);

});

function moveToSlide(carousel, currentSlide, targetSlide) {

    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;

    toggleActive(currentSlide, targetSlide);

}

function toggleActive(current, target) {

    current.classList.remove('active');
    target.classList.add('active');

}

function showHideButton(targetSlide, slides) {

    if (targetSlide == slides[slides.length - 1]) {
        nextBtn.classList.add('hide');
    } else if (targetSlide == slides[0]) {
        prevBtn.classList.add('hide');
    } else {
        nextBtn.classList.remove('hide');
        prevBtn.classList.remove('hide');
    }

}

function getIndex(item, items) {

    let itemIndex;
    
    items.forEach((itemsItem, index) => {
        if (item === itemsItem) itemIndex = index;
    });

    return itemIndex;

}

function moveToDot(targetSlide, slides, dots) {

    let slideIndex = getIndex(targetSlide, slides);
    const currentDot = nav.querySelector('.active');
    const targetDot = dots[slideIndex];

    toggleActive(currentDot, targetDot);

}