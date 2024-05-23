
// Searcher from nav

let listaElementos = document.querySelectorAll(".lista-boton--click");

listaElementos.forEach(listaElemento => {
	listaElemento.addEventListener("click", ()=>{
		
		listaElemento.classList.toggle("arrow");
		
		let height= 0;
		let menu = listaElemento.nextElementSibling;
		if(menu.clientHeight == "0"){
			height=menu.scrollHeight;
		}
		menu.style.height = height+"px";
	})
});

// Nav scroll filter 


let sidebar = document.getElementsByClassName("sidebar")[0];
let sidebar_content = document.getElementsByClassName("nav-productos")[0];

window.onscroll = () => {
    let scrollTop = window.scrollY;
    let viewportHeight = window.innerHeight;
    let contentHeight = sidebar_content.getBoundingClientRect().height;
    let sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;
    let zero = 0;
    if(scrollTop >= contentHeight - viewportHeight + sidebarTop){
        sidebar_content.style.transform =  `translateY(-${contentHeight - viewportHeight + sidebarTop}px)`;
    } else{
        sidebar_content.style.transform = "";
        sidebar_content.style.position = "";
    }
}


// Filter by name

function filterName() {
    
    var input, filter, h3, myProducts, i, x, textValue;

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

