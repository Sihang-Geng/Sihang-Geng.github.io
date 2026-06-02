const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = () => {
  const current = sections.reduce((active, section) => {
    const box = section.getBoundingClientRect();
    return box.top <= 110 ? section : active;
  }, null);

  navLinks.forEach((link) => {
    link.classList.toggle("active", Boolean(current) && link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();
