import { URL_PRODUCT_GET } from "../apiConnection/URL.js";
import { get } from "../apiConnection/apiConnection.js";



// Searcher from nav

let listaElementos = document.querySelectorAll(".lista-boton--click");

listaElementos.forEach(listaElemento => {
    listaElemento.addEventListener("click", () => {

        let height = 0;

        listaElemento.classList.toggle("arrow");
        let sublista = listaElemento.nextElementSibling;
        if (sublista.clientHeight == "0") {
            modify()
            height = sublista.scrollHeight;
        }
        sublista.style.height = height + "px";


    })
});





function modify() {
    let listaElementos = document.querySelectorAll(".sub-lista");
    listaElementos.forEach(lista => {
        let arrow = document.querySelector(".img-arrow")
        let img = lista.parentNode;

        lista.style.height = "0px"
        if (lista.style.height == "0px") {
            if (arrow.style.transform = "rotate(180deg)") {
                arrow.style.transform = "rotate(10deg)"
            }

        }

    })
}

// Filter by name
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.querySelector('.search');
    buscador.addEventListener('input', filterName);

    function filterName() {
        const query = buscador.value.toLowerCase();
        const cards = document.querySelectorAll('.container-cards');

        cards.forEach(card => {
            const name = card.querySelector('.name-product').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            if (name.includes(query) || category.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});


// Inyect products from BD

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
})

let containerProducts = document.querySelector('.category');

async function renderProducts() {
    let products = await get(URL_PRODUCT_GET);

    let containers = {
        "CARTUCHO": document.querySelector("#cartuchos"),
        "TONER": document.querySelector("#toner")
    }
    containerProducts.innerHTML = "";
    products.content.forEach(product => {
        let container = containers[product.typeProduct]
        if (container) {
            containerProducts.innerHTML += `
          <div class="container-cards" data-category="${product.typeProduct}-${product.brandProduct}-${product.qualityProduct}" for='${product.typeProduct}-todos'>
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
                    <a class="button-buy" target="_blank"
                        href="https://wa.me/573195806583?text=Hola, Estoy interesado en el ${product.nameProduct}"><i
                            class="fa-brands fa-whatsapp"></i>Comprar</a>
                </div>
            </div>
            </div>
      `
        }

    });
}
renderProducts()

// Agrega un event listener a cada label


document.addEventListener("DOMContentLoaded", () => {
    let containerCards = document.querySelectorAll('.container-cards');
    let containerCategory = document.querySelectorAll('.category');
    let navLinksInside = document.querySelectorAll('.nav_link--inside');
    let navLinkAll = document.querySelectorAll('.nav_link_all');
    let all = document.querySelector('.all');
    let category = "";
    let dataCategory = "";

    renderProducts().then(() => {
        // Selecciona todos los elementos 'container-cards' después de que se hayan inyectado
        containerCards = document.querySelectorAll('.container-cards');
        dataCategory = "";

        all.addEventListener('click', ()=>{
            containerCards.forEach(general =>{
                general.style.display = "flex";
            })
            
        })

        navLinkAll.forEach(all =>{
            all.addEventListener('click', (event) =>{
                let nameCategoryAll = event.target.getAttribute('for');

                containerCards.forEach(general =>{
                    let generalData = general.getAttribute('for')
                    console.log(generalData.toUpperCase() + nameCategoryAll.toUpperCase())

                    if(generalData.toUpperCase() == nameCategoryAll.toUpperCase()){
                        console.log("coincide")
                        console.log(general)
                        general.style.display = "flex";
                    }else{
                        general.style.display = "none";
                    }

                })

            })
        })

        for (let i = 0; i < navLinksInside.length; i++) {
            navLinksInside[i].addEventListener('click', (event) => {

                 // Obtiene el valor del atributo 'for' del elemento 'label'
                 category = event.target.getAttribute('for');
                
                    containerCards.forEach(function (card) {

                        dataCategory = card.getAttribute('data-category');
                        // Agrega un controlador de eventos de clic a cada uno de los elementos seleccionados
                        console.log(category.toUpperCase() + dataCategory.toUpperCase())
    
                        if (category.toUpperCase() == dataCategory.toUpperCase()) {
                            
                            card.style.display = "flex";
                        } else {
                            card.style.display = "none";
    
                        }
    
                    });

            });
            
        }


    })


});

