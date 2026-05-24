document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header Logic ---
  const header = document.querySelector('header.sticky-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when clicking on link
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Highlight Active Navigation Link ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Simple check if path ends with href, or if href is index.html/blank on root
    if (currentPath === href || 
        (currentPath.endsWith('/') && href === 'index.html') ||
        (currentPath.endsWith(href) && href !== '') ||
        (currentPath.includes('index.html') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Calendly Modal Embed Trigger ---
  const openModalBtns = document.querySelectorAll('[data-calendly-trigger]');
  const calendlyModal = document.getElementById('calendlyModal');
  
  if (calendlyModal) {
    const closeModalBtn = calendlyModal.querySelector('.modal-close');
    const iframe = calendlyModal.querySelector('.modal-iframe');

    const openCalendly = (e) => {
      e.preventDefault();
      // Use clean Calendly pre-fills or simply set source URL
      // Calendly URL for Azad Garten- und Gebäudeservice (placeholder or simple booking page)
      const calendlyUrl = 'https://calendly.com/azadservice1988/30min?hide_gdpr_banner=1&primary_color=0f3223';
      
      if (iframe && !iframe.getAttribute('src')) {
        iframe.setAttribute('src', calendlyUrl);
      }
      
      calendlyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeCalendly = () => {
      calendlyModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => {
      btn.addEventListener('click', openCalendly);
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeCalendly);
    }

    calendlyModal.addEventListener('click', (e) => {
      if (e.target === calendlyModal) {
        closeCalendly();
      }
    });
  }

  // --- Contact Form Handling (mailto) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !phone || !email || !service || !message) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
      }
      
      // Construct mailto parts
      const recipient = 'azadservice1988@gmail.com';
      const subject = `Neue Anfrage AS Garten- und Gebäudeservice - ${name}`;
      
      const body = `Hallo Herr Sheikhi,

Sie haben eine neue Anfrage über das Kontaktformular erhalten:

Name: ${name}
Telefon: ${phone}
E-Mail: ${email}
Gewünschte Leistung: ${service}

Nachricht:
---------------------------------------------
${message}
---------------------------------------------

Mit freundlichen Grüßen,
${name}`;

      // Create and trigger mailto link
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open default mail app
      window.location.href = mailtoUrl;
    });
  }
});
