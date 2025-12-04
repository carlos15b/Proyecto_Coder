// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón del menú y el menú de navegación.
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // Si ambos elementos existen, se añade la funcionalidad de toggle.
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'active' en el menú para mostrarlo u ocultarlo.
            nav.classList.toggle('active');
            
            // Actualiza el atributo 'aria-expanded' para mejorar la accesibilidad.
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Animación con Anime.js para el logo de la barra de navegación.
    
    anime({
        targets: '.navbar-brand img',
        scale: [
            {value: 1, easing: 'easeOutSine', duration: 500},
            {value: 1.1, easing: 'easeInOutQuad', duration: 1200},
            {value: 1, easing: 'easeOutElastic', duration: 1000}
        ],
        loop: false // Se ejecuta solo una vez al cargar la página
    });

    // Formulario de contacto - validación y envío AJAX
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                const formData = new FormData(contactForm);
                const action = contactForm.getAttribute('action');

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        formStatus.innerHTML = '<div class="alert alert-success">¡Gracias por tu mensaje! Te contactaremos pronto.</div>';
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                formStatus.innerHTML = `<div class="alert alert-danger">${data["errors"].map(error => error["message"]).join(", ")}</div>`;
                            } else {
                                formStatus.innerHTML = '<div class="alert alert-danger">Hubo un problema al enviar tu mensaje.</div>';
                            }
                        })
                    }
                }).catch(error => {
                    formStatus.innerHTML = '<div class="alert alert-danger">Hubo un problema al enviar tu mensaje.</div>';
                });
            }

            contactForm.classList.add('was-validated');
        }, false);
    }
});