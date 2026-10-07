// Header: fica sólido ao rolar e se esconde ao descer
const header = document.querySelector(".header");
let lastY = window.scrollY;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("is-solid", y > 40);
  header.classList.toggle("is-hidden", y > lastY && y > 300 && !header.classList.contains("menu-open"));
  lastY = y;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
menuBtn?.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "Fechar" : "Menu";
});

// Animação de entrada
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }),
  { rootMargin: "0px 0px -10% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Filtro de projetos (home)
const filters = document.querySelectorAll(".filters button");
filters.forEach((btn) => btn.addEventListener("click", () => {
  filters.forEach((b) => b.classList.toggle("is-active", b === btn));
  const cat = btn.dataset.filter;
  document.querySelectorAll(".card").forEach((card) => {
    card.hidden = cat !== "todos" && card.dataset.cat !== cat;
  });
}));
