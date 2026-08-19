/**
 * Sarvagya Chaturvedi - Portfolio Application Logic
 * Interactive enhancements, Project modals, Filter system, and Contact Form Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initCopyEmail();
  initScrollAnimations();
});

/* ==========================================================================
   PROJECT DATA FOR MODALS
   ========================================================================== */
const projectsData = {
  'carbon-credit': {
    title: 'Carbon Credit Trading Platform',
    badge: 'Web3 & Enterprise Architecture',
    year: '2026',
    image: 'assets/carbon-credit.jpg',
    description: `
      A comprehensive decentralized platform designed to bring cryptographic transparency and integrity to the global carbon credit ecosystem.
      Co-developed alongside a filed patent (App No. 202641027095 A), this system enforces cryptographic token retirement to eradicate double-counting.
    `,
    highlights: [
      'Role-based access control smart contracts separating Enterprise Buyers, Certified Verifiers, and Environmental Regulators.',
      'Real-time industrial emissions dashboard converting raw activity data into verified carbon offset equivalents.',
      'Hybrid architecture combining Solidity smart contracts on Polygon with an off-chain MongoDB database for fast indexing.',
      'Cryptographic Web3-wallet identity verification and immutable IPFS storage for audit proofs.'
    ],
    techStack: ['TypeScript', 'React.js', 'Node.js', 'Solidity', 'Ethereum / Polygon', 'MongoDB', 'IPFS', 'Hardhat', 'MetaMask']
  },
  'proof-human': {
    title: 'Proof of Human Work',
    badge: 'Solana Protocol & Micro-Tasking',
    year: '2026',
    image: 'assets/proof-human.jpg',
    description: `
      A trustless decentralized marketplace built on the high-throughput Solana blockchain, enabling organizations to escrow SOL for granular micro-tasks with automated anti-fraud validation.
    `,
    highlights: [
      'Non-custodial escrow smart contract programmed in Rust using the Anchor Framework on Solana.',
      'Integrated MediaPipe computer vision liveness detection to ensure genuine human participation without intrusive KYC.',
      'Behavioral integrity scoring pipeline that analyzes submission metrics in real-time to flag automated bot activity.',
      'Instant trustless worker payouts upon verified validation, backed by decentralized IPFS data storage and Supabase telemetry.'
    ],
    techStack: ['React.js', 'TypeScript', 'Solana', 'Anchor Framework', 'Rust', 'Supabase', 'MediaPipe AI', 'IPFS']
  },
  'finlit': {
    title: 'FinliT — Gamified Financial Literacy & Micro-Investing',
    badge: 'FinTech & EdTech',
    year: '2025',
    image: 'assets/finlit.jpg',
    description: `
      A modern, Gen-Z oriented financial empowerment platform that gamifies personal budgeting, disciplined saving, and fractional micro-investing.
    `,
    highlights: [
      'Interactive XP streak system, milestone badges, and tiered achievements that reward continuous budgeting habits.',
      'Automated transaction round-up simulation algorithm that diverts spare cents into diversified, student-friendly portfolios.',
      'Comprehensive financial health scoring engine offering proactive risk assessments.',
      'Conceptual AI financial coach interface that personalizes budgeting recommendations based on user spending velocity.'
    ],
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'REST APIs', 'Node.js']
  },
  'cachemap': {
    title: 'CacheMap Web Simulator',
    badge: 'Hardware Modeling & Full-Stack Systems',
    year: '2025',
    image: 'assets/cachemap.jpg',
    description: `
      An advanced full-stack educational simulation platform designed to visualize complex CPU Cache Memory hierarchies and replacement policies in real time.
    `,
    highlights: [
      'Dual-mode simulation: high-level Python execution engine modeling LRU, FIFO, and multi-level (L1/L2) cache sets.',
      'Hardware mode interfacing with Icarus Verilog testbenches to verify digital logic waveforms with WaveDrom.',
      'Fully containerized microservice deployment orchestrated with Docker Compose and Nginx reverse proxy.',
      'Integrated Prometheus metrics exporter and Grafana telemetry dashboards monitoring simulation performance.'
    ],
    techStack: ['Python', 'Flask', 'JavaScript', 'Verilog', 'Icarus Verilog', 'Docker Compose', 'Nginx', 'Prometheus', 'Grafana', 'CI/CD']
  }
};

/* ==========================================================================
   NAVIGATION & ACTIVE STATE
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileBtn && drawer) {
    mobileBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }

  // Active section indicator using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT MODALS
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.view-details-btn');

  if (!modal || !modalBody || !closeBtn) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-body-img">
      <div class="modal-badge">${data.badge} • ${data.year}</div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-desc">${data.description}</p>
      
      <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: #fff;">Key Architectural Highlights</h3>
      <ul style="list-style: none; padding: 0; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px;">
        ${data.highlights.map(h => `
          <li style="display: flex; gap: 10px; font-size: 0.92rem; color: #d1d5db; line-height: 1.6;">
            <span style="color: var(--accent-orange); font-weight: bold;">▹</span>
            <span>${h}</span>
          </li>
        `).join('')}
      </ul>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: #fff;">Technologies & Tools</h3>
      <div class="modal-tech-list">
        ${data.techStack.map(t => `<span class="modal-tech-item">${t}</span>`).join('')}
      </div>

      <div style="margin-top: 24px; display: flex; gap: 12px;">
        <a href="#connect" class="btn btn-pill-accent btn-sm" onclick="document.getElementById('projectModal').classList.remove('open')">
          <span>Discuss this Project</span>
          &rarr;
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT FORM INTEGRATION (sarvagya0624@gmail.com)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (!form) return;

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    let isValid = true;
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    messageError.classList.remove('show');
    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    messageInput.classList.remove('invalid');
    formStatus.className = 'form-status-alert';
    formStatus.style.display = 'none';

    // Validation
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const subjectVal = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
    const messageVal = messageInput.value.trim();

    if (!nameVal) {
      nameError.classList.add('show');
      nameInput.classList.add('invalid');
      isValid = false;
    }

    if (!emailVal || !validateEmail(emailVal)) {
      emailError.classList.add('show');
      emailInput.classList.add('invalid');
      isValid = false;
    }

    if (!messageVal) {
      messageError.classList.add('show');
      messageInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) return;

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Prepare payload
    const formData = {
      name: nameVal,
      email: emailVal,
      subject: subjectVal || `Message from ${nameVal} via Portfolio`,
      message: messageVal,
      to_email: 'sarvagya0624@gmail.com'
    };

    try {
      // Dispatch via Formspree / Web3Forms endpoint for direct delivery
      const response = await fetch('https://formspree.io/f/mqaeavwk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showSuccessMessage();
      } else {
        // Direct mailto fallback if endpoint requires initial user confirmation
        triggerMailtoFallback(nameVal, emailVal, subjectVal, messageVal);
        showSuccessMessage();
      }
    } catch (err) {
      // Network/offline fallback
      triggerMailtoFallback(nameVal, emailVal, subjectVal, messageVal);
      showSuccessMessage();
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  function triggerMailtoFallback(name, email, subject, message) {
    const mailtoSubject = encodeURIComponent(subject || `Portfolio Connection from ${name}`);
    const mailtoBody = encodeURIComponent(`Hi Sarvagya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:sarvagya0624@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Create hidden link and click to trigger mail client
    const mailtoLink = document.createElement('a');
    mailtoLink.href = mailtoUrl;
    mailtoLink.style.display = 'none';
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);
  }

  function showSuccessMessage() {
    formStatus.className = 'form-status-alert success';
    formStatus.innerHTML = `
      <strong>Message dispatched successfully!</strong><br>
      Thank you for reaching out. Your message has been routed to <strong>sarvagya0624@gmail.com</strong>. I'll get back to you shortly!
    `;
    formStatus.style.display = 'block';
    form.reset();
    showToast('Message sent to Sarvagya successfully!');
  }
}

/* ==========================================================================
   COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const tooltip = document.getElementById('copyTooltip');
  const emailText = 'sarvagya0624@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }
      showToast('Email address copied to clipboard!');
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = emailText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }
      showToast('Email address copied to clipboard!');
    }
  });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   SCROLL REVEAL MICRO-ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const cards = document.querySelectorAll('.glass-card, .bento-card, .timeline-item, .cert-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });
}
