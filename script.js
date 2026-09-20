const progressBar = document.getElementById("progressBar");
const cursorGlow = document.getElementById("cursorGlow");
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrollTop / height) * 100}%`;
});

document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

menuBtn?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// Reveal-on-scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
  observer.observe(el);
});

// Experience filters
const filterButtons = document.querySelectorAll(".filter-btn");
const timelineItems = document.querySelectorAll(".timeline-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    timelineItems.forEach(item => {
      const categories = item.dataset.category || "";
      const show = filter === "all" || categories.includes(filter);
      item.classList.toggle("hidden", !show);
    });
  });
});

// Gentle 3D tilt for the hero photo
const photoFrame = document.querySelector(".photo-frame");
if (photoFrame && window.matchMedia("(pointer:fine)").matches) {
  photoFrame.addEventListener("mousemove", (e) => {
    const r = photoFrame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    photoFrame.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });
  photoFrame.addEventListener("mouseleave", () => {
    photoFrame.style.transform = "";
  });
}
