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
      const calendlyUrl = 'https://calendly.com/azadservice1988/30min?hide_gdpr_banner=1&primary_color=0b531d';
      
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

  // --- Inline Calendly Widget Loader (GDPR compliant) ---
  const loadCalendlyBtn = document.getElementById('loadCalendlyBtn');
  const calendlyContainer = document.getElementById('calendly-container');
  
  if (loadCalendlyBtn && calendlyContainer) {
    loadCalendlyBtn.addEventListener('click', () => {
      // Clear placeholder and insert Calendly inline widget code
      calendlyContainer.innerHTML = '<div class="calendly-inline-widget" data-url="https://calendly.com/azadservice1988/30min?primary_color=0b531d" style="min-width:320px;height:700px;"></div>';
      calendlyContainer.style.padding = '0';
      calendlyContainer.style.border = 'none';
      calendlyContainer.style.boxShadow = 'none';
      calendlyContainer.style.background = 'transparent';
      
      // Dynamic loading of Calendly widget script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
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
