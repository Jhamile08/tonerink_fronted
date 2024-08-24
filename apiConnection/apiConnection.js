
import {URL_PRODUCT, URL_PRODUCT_CREATE} from "../apiConnection/URL.js";

// METODO POST - para subir algo al json recibe la url donde se va a subir y la info de lo que se va a subir
export async function post(info, token) {
  const response = await fetch(URL_PRODUCT_CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Agregar el token en los encabezados
    },
    body: JSON.stringify(info),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }
}

// READ - OBTENER DATOS DEL JSON
export async function get(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Log detailed error message
    console.error(`Failed to fetch from ${url}:`, error.message);

    // Re-throw the error if necessary
    throw error;
  }
}


// METODO UPDATE - para actualizar datos de la base de datos json
export async function update(product, info, token) {
  const url = `${URL_PRODUCT}/${product}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Agregar el token en los encabezados
    },
    body: JSON.stringify(info),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }
}



// METODO DELETE - REcibe la URL de lo que se va a borrar, concatendad con el id
export async function deleteHttp(url, token) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // Agregar el token en los encabezados
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el recurso: ${response.statusText}`);
    }

    console.log("Eliminado");
    window.location.href = window.location.href;
  } catch (error) {
    console.error(error);
  }
}
