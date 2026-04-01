const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
const navLinks = document.querySelectorAll(".nav-list a");
const themeToggle = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("year");

// Mobile navigation toggle
if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Smooth scrolling with sticky-header offset
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = 78;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Dark/light theme toggle with localStorage persistence
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

if (themeToggle) {
  const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.innerHTML = `<span aria-hidden="true">${isDark ? "☀️" : "🌙"}</span>`;
  };

  updateThemeIcon();
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
  });
}

// Project filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const shouldShow = filterValue === "all" || filterValue === category;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Contact form validation
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    if (name.length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (message.length < 10) {
      messageError.textContent = "Please enter at least 10 characters.";
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = "Please fix the highlighted fields.";
      return;
    }

    formStatus.textContent = "Message sent successfully (demo).";
    contactForm.reset();
  });
}

// Fade-in on scroll
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => observer.observe(el));

// Footer year
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
