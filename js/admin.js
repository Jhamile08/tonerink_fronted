import { URL_PRODUCT,URL_PRODUCT_GET,URL_PRODUCT_DELETE} from "../apiConnection/URL.js";
import {get, post, update, deleteHttp} from "../apiConnection/apiConnection.js";


//Selectors
let containerForms = document.querySelector(".containerForms");
let containerFormProduct = document.querySelector("#containerFormProduct")
let buttonProductAdd = document.querySelector(".buttonProductAdd")
let productList = document.querySelector(".general")
let edit = document.querySelector(".btn-edit")
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', renderProducts())
// Create product
formProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    createProduct(token);
  });

// show the create form with click
buttonProductAdd.addEventListener("click", () => {
    containerForms.style.display = "block";
    containerFormProduct.style.display = "block";
    productList.style.display = "none";
  });


// Render products
document.addEventListener('DOMContentLoaded', renderProducts())
// Function to display products

async function renderProducts() {
 
    const products = await get(URL_PRODUCT_GET);

    tbodyProduct.innerHTML = "";
    products.content.forEach((product)=> {
        tbodyProduct.innerHTML += `
        <tr>
            <td><img src="${product.imgProduct}" width="50px" height="50px" style="border-radius: 50%;"></td>
            <td>${product.id}</td>
            <td>${product.typeProduct}</td>
            <td>${product.nameProduct}</td>
            <td>${product.brandProduct} ${product.qualityProduct}</td>
            <td>${product.performanceProduct}</td>
            <td>${product.compatibilityProduct}</td>
            <td>
                <button class="btn btn-info btn-edit btnForm" productId="${product.id}">Editar</button>
                <button class="btn btn-danger btn-delete btnForm" productId="${product.id}">Eliminar</button>
            </td>
        </tr>
        `;
    })
}

async function createProduct(token) {
  const typeProduct = document.getElementById("typeProduct").value;
  const nameProduct = document.getElementById("nameProduct").value;
  const URLProduct = document.getElementById("imgProduct").value;
  const performanceProduct = document.getElementById("performanceProduct").value;
  const compatibilityProduct = document.getElementById("compabilityProduct").value;
  const brandProduct = document.getElementById("brand").value;
  const qualityProduct = document.getElementById("quality").value;
  const productId = document.getElementById("productId").value;

  const newProduct = {
    id: productId,
    typeProduct: typeProduct,
    brandProduct: brandProduct,
    qualityProduct: qualityProduct,
    imgProduct: URLProduct,
    nameProduct: nameProduct,
    performanceProduct: performanceProduct,
    compatibilityProduct: compatibilityProduct,
  };

  if (productId) {
    try {
      await update(productId, newProduct, token);
      alert("Producto actualizado correctamente");
      window.location.href = window.location.href;
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      alert("Error al actualizar.");
    }
  } else {
    try {
      const response = await fetch(URL_PRODUCT_GET, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el producto");
      }
      const data = await response.json();

      const idExists = data.content.some(
        (product) => product.id === newProduct.id
      );
      if (idExists) {
        alert("El producto ya se encuentra registrado");
        return;
      }

      await post(newProduct, token);
      alert("Producto registrado correctamente");
      window.location.href = window.location.href;
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      alert("Error al procesar la operación.");
    }
  }
}



async function getProductId(id, token) {
  try {
    const response = await fetch(`${URL_PRODUCT_GET}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`, // Agregar el token en los encabezados
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getProductId:', error);
    throw error; // Propaga el error para manejarlo más arriba si es necesario
  }
}

async function fillProduct(id) {
  const product = await getProductId(id, token);
  // solo adkfjasdlkfj
  document.getElementById("productId").value = product.id;
  document.getElementById('typeProduct').value = product.typeProduct;
  document.getElementById('nameProduct').value = product.nameProduct;
  document.getElementById('imgProduct').value = product.imgProduct;
  document.getElementById('performanceProduct').value = product.performanceProduct;
  document.getElementById('compabilityProduct').value = product.compatibilityProduct;
  document.getElementById('priceProduct').value = product.priceProduct;
  document.getElementById('brand').value = product.brandProduct;
  document.getElementById('quality').value = product.qualityProduct;

  // Mostrar el formulario de edición
  containerForms.style.display = "block";
  containerFormProduct.style.display = "block";
  productList.style.display = "none";

}


  document.body.addEventListener("click", (event) => {
      const id = event.target.getAttribute("productId");
  
    if (id) {
      const productToAction = `${URL_PRODUCT_DELETE}/${id}`;
      console.log(productToAction)
      if (event.target.classList.contains("btn-delete")) {
        deleteHttp(productToAction, token);
        renderProducts(); // Vuelve a renderizar los tests para reflejar los cambios
      } else if (event.target.classList.contains("btn-edit")) {
        fillProduct(id, token);
      }
    }
  });

  renderProducts();
  