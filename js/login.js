import { URL_AUTH } from "../apiConnection/URL.js";
let userAdmin = document.querySelector('#username');
let passwordAdmin = document.querySelector('#password');
let buttonLogin = document.querySelector('#button-login');
let alertBox = document.querySelector('#alert');

/* Descifrar Token */
function decodeToken(token) {
    try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub; // Cambia 'sub' por el nombre del campo que contiene el ID en tu token
        localStorage.setItem('userId', userId);
    } catch (error) {
        console.error('Error al decodificar el token:', error);
    }
}

buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    validateLoginForm();
});

async function validateLoginForm() {
    const formData = {
        userName: userAdmin.value,
        password: passwordAdmin.value,
    };


    try {
        const response = await fetch(URL_AUTH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log(response);

        if (response.ok) {
            const accessToken = await response.json();
            console.log(accessToken);

            const token = accessToken.token;
            console.log(token);

            decodeToken(token);
            localStorage.setItem('token', token);
            window.location.href = './admin.html';

        } else {
            const errorMessage = await response.text();
            console.error('Error al iniciar sesión:', errorMessage);
            showAlert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        showAlert('An error occurred. Please try again later.');
    }
}

function showAlert(message) {
    alertBox.textContent = message;
    alertBox.style.display = 'flex'; // Mostrar la alerta
    setTimeout(() => {
        alertBox.style.display = 'none'; // Ocultar la alerta después de 5 segundos
    }, 5000);
}



