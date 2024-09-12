document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.control.prev');
    const nextButton = document.querySelector('.control.next');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const itemCount = carouselItems.length;

    // Clone the first and last items to create an infinite loop effect
    const firstItem = carouselItems[0].cloneNode(true);
    const lastItem = carouselItems[itemCount - 1].cloneNode(true);

    carouselTrack.appendChild(firstItem);
    carouselTrack.insertBefore(lastItem, carouselItems[0]);

    const items = Array.from(document.querySelectorAll('.carousel-item'));

    function getItemWidth() {
        return items[0].getBoundingClientRect().width;
    }

    let itemWidth = getItemWidth();
    let currentIndex = 1; // Start from the first real item

    function updateCarousel() {
        itemWidth = getItemWidth(); // Recalcula el ancho del ítem
        carouselTrack.style.transition = 'transform 0.5s ease';
        const offset = -itemWidth * currentIndex;
        carouselTrack.style.transform = `translateX(${offset}px)`;
    }

    function goToIndex(index) {
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(${-itemWidth * index}px)`;
        currentIndex = index;

        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease';
            if (index === 0) {
                currentIndex = items.length - 2; // Go to the last real item
                updateCarousel();
            } else if (index === items.length - 1) {
                currentIndex = 1; // Go to the first real item
                updateCarousel();
            }
        }, 50);
    }

    nextButton.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= items.length) {
            goToIndex(1); // Go to the first real item
        } else {
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            goToIndex(items.length - 2); // Go to the last real item
        } else {
            updateCarousel();
        }
    });

    updateCarousel();
});
