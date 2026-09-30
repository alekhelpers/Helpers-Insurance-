const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }, { passive: true });
}

function closeNav() {
  if (!nav || !toggle) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "Menu";
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const cal = document.querySelector(".calendly-inline-widget");
if (cal) {
  const loadCalendly = () => {
    if (window.__calLoaded) return;
    window.__calLoaded = true;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadCalendly();
        observer.disconnect();
      }
    }, { rootMargin: "240px" });
    observer.observe(cal);
  } else {
    loadCalendly();
  }
}
