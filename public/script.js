document.getElementById('contact-form').addEventListener('submit', function(e) {
    const form = this;
    const formData = new FormData(form);

    // Disable the form while processing
    form.classList.add('loading');

    fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display server response
        document.getElementById('form-message').textContent = data;
        document.getElementById('form-message').style.color = 'green';
    })
    .catch(error => {
        // Display error message
        console.error('Error:', error);
        document.getElementById('form-message').textContent = 'Oops! Something went wrong.';
        document.getElementById('form-message').style.color = 'red';
    })
    .finally(() => {
        // Re-enable the form
        form.reset();
        form.classList.remove('loading');
    });

    // Prevent the default form submission
    e.preventDefault();
});


// Smooth scrolling when clicking navigation links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        let targetPosition = document.querySelector(targetId).offsetTop;
        
        
        if (targetId === '#Education') {
            targetPosition -= 20; //Was added to make it so when I click education, it correctly aligns with the position I need to showcase the full education section. Can adjust number as needed.
        }
        
        const startPosition = window.pageYOffset; 
        const distance = targetPosition - startPosition;
        const duration = 1000; // Adjust scrolling speed here (in milliseconds)
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    });
});

// Easing function for smooth scroll
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}
