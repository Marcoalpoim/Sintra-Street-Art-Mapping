
const carousel = document.getElementById("carousel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const scrollAmount = 100; // Adjust if needed

// Left / right arrows
prev.addEventListener("click", () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

next.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Toggle arrow opacity
function toggleArrows() {
  prev.style.opacity = carousel.scrollLeft > 0 ? "1" : "0.3";
  next.style.opacity =
    carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth
      ? "1"
      : "0.3";
}

// Center the active item on page load
window.addEventListener("load", () => {
  const active = carousel.querySelector(".freguesiatag.active");
  if (active) {
    const li = active.closest("li");
    if (li) {
      const liCenter = li.offsetLeft + li.offsetWidth / 2;
      const scrollTo = liCenter - carousel.clientWidth / 2;

      carousel.scrollTo({
        left: scrollTo,
        behavior: "smooth", // Use "smooth" if you want animation
      });
    }
  }

  toggleArrows();
});

// Update arrows on scroll
carousel.addEventListener("scroll", toggleArrows);


  setTimeout(function() {

      $('#container').fadeOut('slow', function () {
          });
  }, 3500);
  

const items = document.querySelectorAll(".info-extra button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

