const nav = document.getElementById("nav");
const bars = document.querySelector(".bars");

function nav_active_toggle() {
  nav.classList.toggle("inactive");
}

bars.addEventListener("click", nav_active_toggle);

const nav_elements = document.querySelectorAll(".text, .button-container");

nav_elements.forEach((element) => {
  element.addEventListener("click", () => {
    bars.click();
    nav.classList.add("inactive");
  });
});

var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    nav.style.top = "0";
  } else if (nav.classList.contains("inactive")) {
    nav.style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((element) => observer.observe(element));

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("expanded")) {
      card.classList.remove("expanded");
      cards.forEach((card) => {
        card.classList.remove("non-focus");
      });
    } else {
      card.classList.add("expanded");
      cards.forEach((card) => {
        if (!card.classList.contains("expanded")) {
          card.classList.add("non-focus");
        }
      });
    }
  });
});
