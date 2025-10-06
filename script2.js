{
let svg = document.querySelector("svg");
let as = document.querySelectorAll("#popup");

as.forEach(popup => {
  popup.addEventListener("mouseenter", e => {
    svg.appendChild(popup);
  });
});
}



// Utility function to handle open/close actions
function togglePanel(openSelector, closeSelector, targetSelector, property, openValue, closeValue) {
  const openEl = document.querySelector(openSelector);
  const closeEl = document.querySelector(closeSelector);
  const targetEl = document.querySelector(targetSelector);

  if (openEl && targetEl) {
    openEl.addEventListener("click", () => {
      targetEl.style[property] = openValue;
    });
  }

  if (closeEl && targetEl) {
    closeEl.addEventListener("click", () => {
      targetEl.style[property] = closeValue;
    });
  }
}
// All 355 sidebars
for (let i = 1; i <= 355; i++) {
  togglePanel(`.sidebar${i}`, `.CloseBTN${i}`, `.nav-links${i}`, "height", "100%", "0%");
}

const title = document.querySelector(".title");
const aboutBar = document.querySelector(".about-bar");
const closeAbout = document.querySelector(".CloseBTNlexicon1");

if (title && aboutBar) {
  title.addEventListener("click", () => {
    // Toggle between open and closed states
    if (aboutBar.style.height === "100%") {
      aboutBar.style.height = "0";
       aboutBar.style.opacity = "0";
    } else {
      aboutBar.style.height = "100%";
       aboutBar.style.opacity = "1";
    }
  });
}

if (closeAbout && aboutBar) {
  closeAbout.addEventListener("click", () => {
    aboutBar.style.height = "0";
    aboutBar.style.opacity = "0";
  });
}


// burgerMenuBtn
const burgerMenuBtn = document.querySelector(".burguermenu");
const burgerMenuBar = document.querySelector(".burguermenu-bar");
const closeBurgerMenu = document.querySelector(".CloseBTNburguermenu");

if (burgerMenuBtn && burgerMenuBar) {
  burgerMenuBtn.addEventListener("click", () => {
    // Toggle open/close
    if (burgerMenuBar.style.height === "100%") {
      burgerMenuBar.style.height = "0";
    } else {
      burgerMenuBar.style.height = "100%";
    }
  });
}

if (closeBurgerMenu && burgerMenuBar) {
  closeBurgerMenu.addEventListener("click", () => {
    burgerMenuBar.style.height = "0";
  });
}

