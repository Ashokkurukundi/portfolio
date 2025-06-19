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

  // Resume download handler
  const resumeLink = document.getElementById('resumeLink');
  if (resumeLink) {
      resumeLink.addEventListener('click', function(e) {
          e.preventDefault();
          // Replace with actual resume URL or implement download functionality
          alert('Resume download would be triggered here in production');
          // In production, you might use:
          // window.open('path/to/your/resume.pdf', '_blank');
      });
  }

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
          
          // Send email using FormSubmit.co
          fetch('https://formsubmit.co/ajax/ashokkurukundi@gmail.com', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  name: formObject.name,
                  email: formObject.email,
                  subject: formObject.subject,
                  message: formObject.message
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log('Email sent:', data);
              // Show success message
              alert('Thank you for your message! I will get back to you soon.');
              contactForm.reset();
          })
          .catch(error => {
              console.error('Error sending email:', error);
              alert('There was an error sending your message. Please try again later or email me directly at ashokkurukundi@gmail.com');
          });
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