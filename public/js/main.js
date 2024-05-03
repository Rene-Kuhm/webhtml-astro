function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;
    script.integrity = "sha512-+k1pnlgt4F1H8L7t3z95o3/KO+o78INEcXTbnoJQ/F2VqDVhWoaiVml/OEHv9HsVgxUaVW+IbiZPUJQfF/YxZw==";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    document.body.appendChild(script);
}

var button = document.getElementById('backToTopBtn');
button.addEventListener('click', function () {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js');
});
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("NVVFxSIjNX0Vhh-ik");

    var form = document.getElementById('footer-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

            // Recoge los datos del formulario
            var formData = new FormData(form);

            // Convierte los datos del formulario en un objeto JavaScript
            var formProps = Object.fromEntries(formData);

            // Envía los datos del formulario a través de emailjs
            emailjs.send('service_qwt25jr', 'template_v9objjp', formProps)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    swal({
                        title: '¡Éxito!',
                        text: 'Formulario enviado con éxito!',
                        icon: 'success',
                        timer: 2000,// La alerta se cerrará automáticamente después de 2 segundos
                        buttons: false, // Oculta los botones
                    });
                    form.reset(); // Limpia el formulario
                }, function (error) {
                    console.log('FAILED...', error);
                    swal({
                        title: '¡Error!',
                        text: 'Error al enviar el formulario.',
                        icon: 'error',
                        timer: 2000, // La alerta se cerrará automáticamente después de 2 segundos
                        buttons: false, // Oculta los botones
                    });
                });
        });
    } else {
        console.log('Form with id "footer-form" does not exist');
    }
});
function toggleCollapse(elementId) {
    var element = document.getElementById(elementId);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/index.html').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/css/easy.css',
    '/css/responsive.css',
    '/css//slick.min.css',
    '/css/style.css',
    '/js/script-min.js',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

window.addEventListener('load', function () {
    const lazyImage = document.querySelector('img[loading="lazy"]');
    lazyImage.src = lazyImage.dataset.src;
    lazyImage.removeAttribute('loading');
});

fetch('https://api.cloudflare.com/client/v4/zones/fe69ccaa5bb3fdd6e8ac542547c4dae4/settings/transformations', {
    method: 'PATCH',
    headers: {
        'Authorization': 'JRVZ0cyQyCjkKUXAwrIP61bqIIGe68Yb',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Tus parámetros de transformación van aquí...
        "fit": "cover",
        "width": 800,
        "quality": "auto",
        "format": "auto"
    })
})
    .then(response => response.json())
    .then(data => console.log(data));