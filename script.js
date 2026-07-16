document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Mobile Menu Toggle ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  // Toggle menu when hamburger icon is clicked
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // --- 2. Smooth Scrolling & Header Offset ---
  // Select all links that have hashes (anchors)
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default instant jump

      // Close mobile menu if it's open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Ignore empty hashes

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate height of fixed header to offset the scroll
        const headerHeight = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- 3. Active Navigation Link Highlighting on Scroll ---
  const sections = document.querySelectorAll("section, footer");
  const navItems = document.querySelectorAll(".nav-links li a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const headerHeight = header.offsetHeight;

    // Determine which section is currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Subtracting header height and a bit of extra padding for better trigger accuracy
      if (window.scrollY >= sectionTop - headerHeight - 50) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Loop through nav items and apply/remove active styling
    navItems.forEach((link) => {
      // Reset color
      link.style.color = "";

      // Apply active color (Sea Green) dynamically to the current section link
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.style.color = "var(--secondary-color)";
      }
    });
  });

  // --- 4. Header Shrink Effect on Scroll (Optional polish) ---
  window.addEventListener("scroll", () => {
    const headerContainer = document.querySelector(".header-container");
    if (window.scrollY > 50) {
      headerContainer.style.padding = "10px 0"; // Shrink padding
      headerContainer.style.transition = "padding 0.3s ease";
    } else {
      headerContainer.style.padding = "20px 0"; // Original padding
    }
  });
});
