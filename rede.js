const carousel = document.getElementById("carousel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const scrollAmount = 100; // Adjust if needed

// Center clicked button in carousel, but DON'T change classes
document.querySelectorAll(".freguesiatag").forEach((btn) => {
  btn.addEventListener("click", function () {
    setTimeout(() => {
      const active = carousel.querySelector(".freguesiatag.active") || this;
      const li = active.closest("li");
      if (!li) return;

      const liCenter = li.offsetLeft + li.offsetWidth / 2;
      const scrollTo = liCenter - carousel.clientWidth / 2;

      carousel.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }, 0);
  });
});

//   On page load, center the .active freguesia
window.addEventListener("DOMContentLoaded", () => {
  const active = carousel.querySelector(".freguesiatag.active");
  if (active) {
    const li = active.closest("li");
    if (!li) return;

    const liCenter = li.offsetLeft + li.offsetWidth / 2;
    const scrollTo = liCenter - carousel.clientWidth / 2;

    // Instantly position without animation
    carousel.scrollLeft = scrollTo;
  }
});

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

carousel.addEventListener("scroll", toggleArrows);
window.addEventListener("load", toggleArrows);

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

  
    setTimeout(function() {

        $('#container').fadeOut('slow', function () {
            });
    }, 3500);
    
 