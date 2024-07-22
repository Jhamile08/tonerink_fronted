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

// const labels = document.querySelectorAll('label.nav_link--inside');

// document.addEventListener('DOMContentLoaded', function() {
//     // Selecciona todos los elementos con la clase 'container-cards'
//     let containerCards = document.querySelectorAll('category-container');
//     console.log(containerCards)
//     containerCards.forEach(function(card) {
//         // Obtiene el valor del atributo 'data-category' de cada 'container-cards'
//         let dataCategory = card.getAttribute('data-category');
//         console.log(dataCategory);
//     });
// });

// Agrega un event listener a cada label
// document.addEventListener('DOMContentLoaded', function(){
//     let containerCards = document.querySelector('.category');
//     let container = containerCards.nextElementSibling;
//     console.log(container.children[0]);
// })
// labels.forEach(label => {
//     label.addEventListener('click', () => {
//         let labelFor = label.htmlFor;
//         console.log(containerCards)
//         if(labelFor != containerCards.htmlFor){
//             containerCards.style.display = "none";
//         }
//         console.log(labelFor);

//     });
// }); 





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

function filterName() {

    let input, filter, h3, myProducts, i, x, textValue;

    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    myProducts = document.getElementById("categorias");
    h3 = myProducts.getElementsByClassName("tarjeta");
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (i = 0; i < h3.length; i++) {

        x = h3[i].getElementsByTagName("h3")[0];
        textValue = x.textValue || x.innerText;
        textValue = textValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (textValue.toUpperCase().indexOf(filter) > -1) {
            h3[i].style.display = "";
        } else {
            h3[i].style.display = "none";
        }
    }
}

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
      `
        }

    });
}
renderProducts()

// Agrega un event listener a cada label


document.addEventListener("DOMContentLoaded", () => {
    let containerCards = document.querySelectorAll('.container-cards');
    let navLinksInside = document.querySelectorAll('.nav_link--inside');
    let category = "";
    let dataCategory = "";

    renderProducts().then(() => {
        // Selecciona todos los elementos 'container-cards' después de que se hayan inyectado
        containerCards = document.querySelectorAll('.container-cards');
        let containerCategory = document.querySelectorAll('.category');
        dataCategory = "";
        for (let i = 0; i < navLinksInside.length; i++) {
            navLinksInside[i].addEventListener('click', (event) => {

                 // Obtiene el valor del atributo 'for' del elemento 'label'
                 category = event.target.getAttribute('for');
                console.log(navLinksInside.length)
                if( i == 0+i){
                containerCategory.forEach(general =>{
                        let generalData = general.getAttribute('data-category')
                        console.log(generalData.toUpperCase() + category.toUpperCase())
                        if(generalData.toUpperCase() == category.toUpperCase()){
                            // let cointainer = document.querySelectorAll(".container-cards")
                            console.log("coincide todo")
                           console.log(general)
                           general.style.display = "flex";
                        //    cointainer.forEach(x=>{
                        //     x.style.display = "none"
                        //    })
                        }else{
                            console.log("no coincide")
                        }
                    })
                }else{

                    containerCards.forEach(function (card) {

                        dataCategory = card.getAttribute('data-category');
                        // Agrega un controlador de eventos de clic a cada uno de los elementos seleccionados
                        console.log(category.toUpperCase() + dataCategory.toUpperCase())
    
                        if (category.toUpperCase() == dataCategory.toUpperCase()) {
                            
                            card.style.display = "flex";
                        } else {
                            card.style.display = "none";
                            alert("sdsd")
                        }
    
                    });

                }
               

            });
            
        }

    })


});

