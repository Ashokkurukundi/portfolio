document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typed = new Typed('#typing', {
      strings: [
        'Frontend Lead',
        'Cloud Security Specialist',
        'Smart City Dashboards'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: true
    });
  
    // Animate numbers in metrics
    const animateNumbers = () => {
      const numberElements = document.querySelectorAll('.number');
      
      numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const value = Math.floor(progress * target);
          
          element.textContent = value;
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        };
        
        requestAnimationFrame(updateNumber);
      });
    };
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          
          if (entry.target.classList.contains('metrics')) {
            animateNumbers();
          }
        }
      });
    }, { threshold: 0.1 });
  
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });