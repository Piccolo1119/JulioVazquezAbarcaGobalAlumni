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

    // Variables para el tamaño del gap según el tamaño de la pantalla
    let gap = 40; // Valor por defecto para pantallas grandes

    // Función para recalcular el tamaño del gap y el ancho de los ítems según el ancho de la pantalla
    function updateResponsiveSettings() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 768 && screenWidth <= 1024) {
            gap = 121; // Para tablets
        } else if (screenWidth > 1024) {
            gap = 40; // Para pantallas grandes
        } else if( screenWidth < 768) {
            gap = 200; // Para pantallas menores
        }

        // Recalcular el ancho del ítem con el nuevo gap
        itemWidth = getItemWidth();
        updateCarousel();
    }

    function getItemWidth() {
        return items[0].getBoundingClientRect().width + gap; // Incluye el gap en el cálculo
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
        }, 300);
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

    // Actualizar el carrusel cuando se redimensiona la ventana
    window.addEventListener('resize', updateResponsiveSettings);

    // Inicializa el carrusel
    updateResponsiveSettings();
    updateCarousel();
});
