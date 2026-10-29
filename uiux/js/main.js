/**
 * Explore Nagpur — Master JavaScript
 * Vanilla JavaScript for UI/UX Interactions, Filtering, Search, Modals, and SEO Validations
 * Academic Laboratory Project
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initBackToTop();
  initDestinationFilters();
  initDestinationModal();
  initAccordion();
  initNewsletterForm();
  initContactForm();
  initImageFallbackHandler();
  highlightActiveNavLink();
});

/**
 * 1. Mobile Navigation & Sticky Header
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (!navToggle || !navMenu) return;

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      navToggle.focus();
    }
  });
}

/**
 * 2. Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 3. Destination Search & Category Filter (destinations.html)
 */
function initDestinationFilters() {
  const searchInput = document.getElementById('destSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.destination-card[data-category]');
  const resultsCounter = document.getElementById('resultsCount');
  const emptyState = document.getElementById('destEmptyState');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (!cards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
      const cardLocation = card.querySelector('.card-meta')?.textContent.toLowerCase() || '';
      const cardTags = Array.from(card.querySelectorAll('.tag-pill')).map(t => t.textContent.toLowerCase()).join(' ');

      const matchesCategory = (currentCategory === 'all' || cardCategory.includes(currentCategory));
      const matchesSearch = !query ||
        cardTitle.includes(query) ||
        cardDesc.includes(query) ||
        cardLocation.includes(query) ||
        cardTags.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count indicator
    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${visibleCount} of ${cards.length} destinations`;
    }

    // Empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.add('active');
      } else {
        emptyState.classList.remove('active');
      }
    }
  }

  // Category pill click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      applyFilters();
    });
  }

  // Clear search button
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      applyFilters();
      searchInput.focus();
    });
  }

  // Reset filters button in empty state
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
      filterPills.forEach(p => {
        if (p.getAttribute('data-filter') === 'all') {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
      applyFilters();
    });
  }

  // Initial count
  applyFilters();
}

/**
 * 4. Destination Detail Modal (Accessible Dialog)
 */
function initDestinationModal() {
  const modalBackdrop = document.getElementById('destinationModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('[data-action="view-details"]');

  if (!modalBackdrop) return;

  let lastActiveElement = null;

  // Destination Data Dictionary for deep modal previews
  const destinationData = {
    'deekshabhoomi': {
      title: 'Deekshabhoomi Sacred Stupa',
      category: 'Historical & Spiritual',
      location: 'Ramdaspeth, Nagpur City (Central)',
      bestTime: 'October to March (Dhamma Chakra Pravartan Din in October attracts visitors)',
      overview: 'Deekshabhoomi is a monumental architectural and spiritual pilgrimage site where Dr. B. R. Ambedkar embraced Buddhism alongside hundreds of thousands of followers on Ashok Vijaya Dashami in 1956. The majestic dome is one of the largest hollow Buddhist stupas in Asia.',
      highlights: [
        'Dholpur stone stupa measuring over 120 feet in height',
        'Sacred central bronze Buddha statue & relic display',
        'Extensive tranquil garden complex and library',
        'Vibrant evening illumination'
      ],
      travelTips: 'Photography inside the sanctum may be restricted. Modest dress is advised. Accessible via Nagpur Metro (Congress Nagar / Rahate Colony stations).'
    },
    'futala-lake': {
      title: 'Futala Lake & Waterfront Promenade',
      category: 'Lakes & Urban Parks',
      location: 'Telangkhedi, West Nagpur (~6 km from Zero Mile)',
      bestTime: 'Evenings year-round; October to February for pleasant weather',
      overview: 'Constructed over two centuries ago by the Bhonsle kings of Nagpur, Futala Lake is celebrated for its bustling sunset promenade, colored fountains, open-air food kiosks, and historic atmosphere. It remains Nagpur\'s favorite social evening gathering destination.',
      highlights: [
        'Scenic sunset views across expansive water',
        'Lively promenade lined with heritage streetlights',
        'Local culinary stalls offering Vidarbha street foods',
        'Adjoining Telangkhedi Hanuman Temple and landscaped gardens'
      ],
      travelTips: 'Evenings on weekends can experience heavy visitor traffic. Parking is available along the designated perimeter bays. Confirm fountain show schedules before planning your evening.'
    },
    'ambazari-lake': {
      title: 'Ambazari Lake & Eco-Garden',
      category: 'Lakes & Urban Parks',
      location: 'South-West Nagpur (~8 km from Zero Mile)',
      bestTime: 'Morning walking hours (6:00 AM - 9:00 AM) and serene sunsets',
      overview: 'Ambazari is Nagpur\'s largest natural lake and the historic origin point of the Nag River from which the city takes its name. Surrounded by a mango grove ("Amba"), the expansive body of water features lush walking trails, boating facilities, and rich avian biodiversity.',
      highlights: [
        'Largest lake in Nagpur spanning over 15 square kilometers',
        'Scenic nature trails with butterfly gardens and migratory birds',
        'Children\'s play amusement zones and tranquil benches',
        'Peaceful atmosphere away from heavy downtown traffic'
      ],
      travelTips: 'Ideal for birdwatching enthusiasts during winter months. Carry binoculars and mosquito repellent for early morning or sunset walks.'
    },
    'pench-national-park': {
      title: 'Pench National Park (Mowgli Land)',
      category: 'Nature & Wildlife',
      location: 'Madhya Pradesh-Maharashtra Border (~85 km from Nagpur)',
      bestTime: 'November to June (Core safari zones open Oct 1 to June 30; buffer zones open year-round)',
      overview: 'Immortalized as the original setting of Rudyard Kipling\'s "The Jungle Book", Pench National Park is renowned for its high density of Royal Bengal tigers, Indian leopards, wild dogs (dholes), and picturesque teak forests straddling the Pench River.',
      highlights: [
        'World-famous Royal Bengal tiger population',
        'Over 285 documented species of resident and migratory birds',
        'Guided 4x4 open Gypsy safaris via Turia, Sillari, and Jamtara gates',
        'Dense dry teak forest scenery and Pench reservoir'
      ],
      travelTips: 'Safari permits MUST be booked well in advance through the official forest department booking portal. Carry official government photo identification matching your permit.'
    },
    'tadoba-reserve': {
      title: 'Tadoba-Andhari Tiger Reserve (TATR)',
      category: 'Nature & Wildlife',
      location: 'Chandrapur District (~140 km from Nagpur)',
      bestTime: 'October to June (March to May offers peak waterhole tiger sightings)',
      overview: 'Maharashtra\'s oldest and largest national park, Tadoba is recognized worldwide as one of India\'s premier tiger habitats. Featuring rugged hillocks, bamboo thickets, and permanent lakes, it offers exceptional wildlife viewing opportunities.',
      highlights: [
        'Consistently high frequency of diurnal tiger sightings',
        'Diverse wildlife: sloth bears, mugger crocodiles, leopards, gaurs',
        'Moharli, Kolara, and Navegaon safari entry zones',
        'Rich conservation lore named after local deity Taru'
      ],
      travelTips: 'Nagpur is the closest international airport and premier railhead for Tadoba. Hire forest-certified guides and respect tiger safari viewing distance guidelines.'
    },
    'chikhaldara': {
      title: 'Chikhaldara Hill Station',
      category: 'Weekend Getaways',
      location: 'Amravati District, Melghat Region (~230 km from Nagpur)',
      bestTime: 'July to September for monsoon waterfalls; October to February for crisp hill weather',
      overview: 'Perched at an elevation of 1,118 meters in the Satpura range, Chikhaldara is Vidarbha\'s only coffee-growing hill station. Blessed with deep panoramic valleys, misty viewpoints, and colonial heritage, it offers a refreshing weekend retreat.',
      highlights: [
        'Lush coffee plantations and scented flora',
        'Panoramic viewpoints: Hurricane Point, Prospect Point, Devi Point',
        'Historic Gavilgad Fort ruins atop the plateau',
        'Proximity to Melghat Tiger Reserve buffer zones'
      ],
      travelTips: 'Winding ghat roads require attentive driving, especially during monsoons. Keep warm layers as night temperatures drop noticeably in winter.'
    },
    'ramtek-temple': {
      title: 'Ramtek Historic Fort & Khindsi Lake',
      category: 'Historical & Heritage',
      location: 'Ramtek Town, Nagpur District (~48 km north-east of Nagpur)',
      bestTime: 'October to March; pleasant during monsoon season',
      overview: 'Resting on a peaceful hilltop, the 600-year-old Ramtek Gad Mandir is revered as the place where Lord Rama rested during exile, and where the classical Sanskrit poet Kalidasa composed his epic poem "Meghaduta". Khindsi Lake sits right below for watersports.',
      highlights: [
        'Ancient fort temple architecture overlooking lush plains',
        'Kalidasa memorial monument and cultural hall',
        'Water boating and adventure sports at adjacent Khindsi Lake',
        'Historic bow-and-arrow pilgrimage folklore'
      ],
      travelTips: 'Be cautious of friendly monkeys near temple stairs; keep food packed inside bags. The climb includes stone stairs, though vehicles can reach near the upper terrace.'
    },
    'dragon-palace': {
      title: 'Dragon Palace Temple (Lotus Temple of Central India)',
      category: 'Spiritual & Culture',
      location: 'Kamptee, Nagpur Metropolitan Area (~18 km from city center)',
      bestTime: 'Morning and evening hours year-round',
      overview: 'Also known as the Lotus Temple of Nagpur, Dragon Palace is an exquisitely designed Buddhist temple founded in 1999 with collaboration between Indo-Japanese societies. The temple is set inside manicured Japanese-style gardens.',
      highlights: [
        'Striking modern lotus-inspired white marble architecture',
        'Sacred central sandalwood Buddha statue sculpted in Japan',
        'Serene landscaped gardens designed for silent meditation',
        'International peace and intercultural heritage symbol'
      ],
      travelTips: 'Maintains strict silence within the meditation hall. Footwear must be removed at the designated garden counters before entering the marble sanctuary.'
    },
    'gorewada-park': {
      title: 'Balasaheb Thackeray Gorewada International Zoo & Bio Park',
      category: 'Nature & Wildlife',
      location: 'Katol Road, North-West Nagpur (~10 km from Zero Mile)',
      bestTime: 'October to March; morning safaris (8:00 AM - 11:00 AM)',
      overview: 'Spanning across nearly 1,900 hectares of dense deciduous forest surrounding Gorewada Lake, this state-of-the-art safari park offers day and nocturnal safari tracks, nature walking trails, and wildlife rescue facilities.',
      highlights: [
        'One of the largest international safari and rescue parks in India',
        'Air-conditioned safari bus tours into Indian safari enclosures',
        'Gorewada Lake reservoir and scenic walking trail',
        'Conservation education center for students and researchers'
      ],
      travelTips: 'Safari tickets should be reserved online in advance during school holidays and weekends. Closed on designated maintenance days (usually Mondays).'
    }
  };

  function openModal(destKey) {
    const data = destinationData[destKey];
    if (!data) return;

    lastActiveElement = document.activeElement;

    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalLocation = document.getElementById('modalLocation');
    const modalBestTime = document.getElementById('modalBestTime');
    const modalOverview = document.getElementById('modalOverview');
    const modalHighlights = document.getElementById('modalHighlights');
    const modalAdvisory = document.getElementById('modalAdvisory');
    const modalImg = document.getElementById('modalImg');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalLocation) modalLocation.textContent = data.location;
    if (modalBestTime) modalBestTime.textContent = data.bestTime;
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalAdvisory) modalAdvisory.textContent = data.travelTips;

    if (modalHighlights) {
      modalHighlights.innerHTML = '';
      data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalHighlights.appendChild(li);
      });
    }

    if (modalImg) {
      // Find matching card image or use fallback
      const matchingCard = document.querySelector(`.destination-card[data-id="${destKey}"] img`);
      if (matchingCard) {
        modalImg.src = matchingCard.src;
        modalImg.alt = data.title;
      }
    }

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.destination-card');
      const destKey = card ? card.getAttribute('data-id') : null;
      if (destKey) {
        openModal(destKey);
      }
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * 5. Accordion (travel-guide.html)
 */
function initAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-btn');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;

      // Close sibling items in the same accordion group for clean UX
      const parent = btn.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-btn').forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBtn.nextElementSibling) {
              otherBtn.nextElementSibling.classList.remove('open');
            }
          }
        });
      }

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('open', !isExpanded);
      }
    });
  });
}

/**
 * 6. Newsletter Form Client-Side Validation
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const alertBox = document.getElementById('newsletterAlert');

  if (!form || !emailInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      emailInput.classList.add('is-invalid');
      if (alertBox) {
        alertBox.className = 'alert-box alert-warning visible';
        alertBox.innerHTML = `
          <strong>Validation Warning:</strong> Please enter a valid email address (e.g., student@example.edu).
        `;
      }
      emailInput.focus();
      return;
    }

    // Success demonstration state
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    if (alertBox) {
      alertBox.className = 'alert-box alert-success visible';
      alertBox.innerHTML = `
        <strong>Client-Side Validation Passed!</strong>
        <span>Thank you for testing the Explore Nagpur newsletter component. As an academic laboratory project demonstration, your email (<code>${sanitizeHTML(email)}</code>) is validated client-side and not transmitted to any remote server.</span>
      `;
    }
    form.reset();
  });
}

/**
 * 7. Contact Form Client-Side Validation (about.html)
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const charCounter = document.getElementById('messageCharCount');
  const alertBox = document.getElementById('contactAlert');

  // Live character counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 500 characters`;
      if (len > 500) {
        charCounter.style.color = 'var(--color-danger)';
      } else {
        charCounter.style.color = 'var(--color-text-subtle)';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate Name
    const nameVal = nameInput?.value.trim() || '';
    const nameFeedback = document.getElementById('nameFeedback');
    if (nameVal.length < 2) {
      nameInput?.classList.add('is-invalid');
      if (nameFeedback) nameFeedback.classList.add('visible');
      hasError = true;
    } else {
      nameInput?.classList.remove('is-invalid');
      nameInput?.classList.add('is-valid');
      if (nameFeedback) nameFeedback.classList.remove('visible');
    }

    // Validate Email
    const emailVal = emailInput?.value.trim() || '';
    const emailFeedback = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      emailInput?.classList.add('is-invalid');
      if (emailFeedback) emailFeedback.classList.add('visible');
      hasError = true;
    } else {
      emailInput?.classList.remove('is-invalid');
      emailInput?.classList.add('is-valid');
      if (emailFeedback) emailFeedback.classList.remove('visible');
    }

    // Validate Subject
    const subjectVal = subjectInput?.value || '';
    const subjectFeedback = document.getElementById('subjectFeedback');
    if (!subjectVal) {
      subjectInput?.classList.add('is-invalid');
      if (subjectFeedback) subjectFeedback.classList.add('visible');
      hasError = true;
    } else {
      subjectInput?.classList.remove('is-invalid');
      subjectInput?.classList.add('is-valid');
      if (subjectFeedback) subjectFeedback.classList.remove('visible');
    }

    // Validate Message
    const msgVal = messageInput?.value.trim() || '';
    const messageFeedback = document.getElementById('messageFeedback');
    if (msgVal.length < 15 || msgVal.length > 500) {
      messageInput?.classList.add('is-invalid');
      if (messageFeedback) messageFeedback.classList.add('visible');
      hasError = true;
    } else {
      messageInput?.classList.remove('is-invalid');
      messageInput?.classList.add('is-valid');
      if (messageFeedback) messageFeedback.classList.remove('visible');
    }

    if (hasError) {
      if (alertBox) {
        alertBox.className = 'alert-box alert-warning visible';
        alertBox.innerHTML = `
          <strong>Incomplete Submission:</strong> Please correct the highlighted fields before submitting.
        `;
      }
      return;
    }

    // Success State
    if (alertBox) {
      alertBox.className = 'alert-box alert-success visible';
      alertBox.innerHTML = `
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">Message Validated Successfully!</h4>
          <p style="font-size: 0.88rem; margin: 0; color: inherit;">
            Hello <strong>${sanitizeHTML(nameVal)}</strong>, your inquiry regarding <em>"${sanitizeHTML(subjectVal)}"</em> has passed all client-side validation rules.
            <br>
            <span style="font-size: 0.8rem; opacity: 0.9;">(Academic Project Note: No backend server is connected; form data is processed purely within your browser session.)</span>
          </p>
        </div>
      `;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
    if (charCounter) charCounter.textContent = '0 / 500 characters';
    [nameInput, emailInput, subjectInput, messageInput].forEach(el => el?.classList.remove('is-valid'));
  });
}

/**
 * 8. Image Fallback Error Handler
 */
function initImageFallbackHandler() {
  const images = document.querySelectorAll('img');
  const fallbackSrc = 'assets/images/placeholder-fallback.svg';

  images.forEach(img => {
    img.addEventListener('error', function handleImgErr() {
      if (this.src !== fallbackSrc && !this.src.endsWith(fallbackSrc)) {
        this.src = fallbackSrc;
      }
    });
  });
}

/**
 * 9. Active Nav Link Highlighting
 */
function highlightActiveNavLink() {
  const path = window.location.pathname;
  let filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  if (!filename.includes('.html')) {
    filename = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === 'index.html' && (href === './' || href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Utility: HTML Sanitizer to prevent XSS in feedback demos
 */
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

