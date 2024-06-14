
// Swipper
  var swiper = new Swiper('.slide-content', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 10,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    
    breakpoints: {
      660: {
      slidesPerView: 1,
      spaceBetween: 20,
      },
      660: {
      slidesPerView: 2,
      spaceBetween: 20,
      },
      960: {
      slidesPerView: 3,
      spaceBetween: 40,
      },
      1240: {
      slidesPerView: 3,
      spaceBetween: 50,
      },
      2560: {
      slidesPerView: 4,
      spaceBetween: 40,
      },
    } 
      });

// Inyect products from BD

let container = document.querySelector('.categoria')
