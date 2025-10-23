document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form validation
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = '#4682b4';
            form.reset();
            setTimeout(() => formMessage.textContent = '', 3000);
        } else {
            formMessage.textContent = 'Please fill all fields.';
            formMessage.style.color = '#e63946';
        }
    });
});