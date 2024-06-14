import {URL_PRODUCT} from "../apiConnection/URL.js";
import {get} from "../apiConnection/apiConnection.js";
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

document.addEventListener("DOMContentLoaded",()=>{
  renderProducts();
})

let containerProducts = document.querySelector('.category');

async function renderProducts() {
  let products = await get(URL_PRODUCT);

  let containers = {
    "CARTUCHO":document.querySelector("#cartuchos"),
    "TONER":document.querySelector("#toner")
  }
  containerProducts.innerHTML = "";
  products.content.forEach(product => {
    let container = containers[product.typeProduct]
    if(container){
      containerProducts.innerHTML += `
      <div class="category" id="${product.typeProduct}" data-category="${product.typeProduct}">
        <div class="container-cards" data-category="${product.typeProduct}-${product.brandProduct}-${product.qualityProduct}">
          <div class="content-card">
              <div>
                  <img class="img-product" src="${product.imgProduct}"
                      alt="${product.nameProduct}">
              </div>
              <div>
                  <hr>
                  <div class="container-name-product">
                      <h3 class="name-product"> ${product.nameProduct}</h3>
                  </div>
                  <hr>
                  <p class="performance-product"><b>Rendimiento:</b> ${product.performanceProduct}</p>
                  <p class="compatibility-product"><b>Compatibilidad:</b> ${product.compatibilityProduct}</p>
                  <p class="price-product"><b>Price:</b> ${product.priceProduct}</p>
                  <a class="button-buy" target="_blank"
                      href="https://wa.me/573195806583?text=Hola, Estoy interesado en el ${product.nameProduct}"><i
                          class="fa-brands fa-whatsapp"></i>Comprar</a>
              </div>
          </div>
          </div>
    </div>
    `
    }

});
}
renderProducts()