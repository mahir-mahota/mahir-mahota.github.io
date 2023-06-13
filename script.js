const nav = document.getElementById("nav");
const bars = document.querySelector(".bars");

function nav_active_toggle() {
  nav.classList.toggle("inactive");
}

bars.addEventListener("click", nav_active_toggle);

const nav_elements = document.querySelectorAll(".text, .button-container");

nav_elements.forEach((element) => {
  element.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      bars.click();
    }
    nav.classList.add("inactive");
  });
});

var prevScrollpos = window.scrollY;

window.onscroll = function () {
  var currentScrollPos = window.scrollY;
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
const project_title = document.querySelector(".project-title");
const arrows = document.querySelectorAll(".arrow");
const crosses = document.querySelectorAll(".project-close");

const TOTAL_CARDS = 4;
var current = 1;
var current_string;
var current_card;
var current_card_string = "card";

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (
      !card.classList.contains("expanded") &&
      !card.classList.contains("crossed")
    ) {
      card.classList.add("expanded");
      cards.forEach((card) => {
        if (!card.classList.contains("expanded")) {
          card.classList.add("non-focus");
        }
      });
      project_title.classList.toggle("hide");
      arrows.forEach((arrow) => {
        arrow.classList.toggle("expanded");
      });
      crosses.forEach((cross) => {
        cross.classList.add("expanded");
      });
      current_card = card;
      current = parseInt(current_card.classList[2].substring(4, 5));
    }

    card.classList.remove("crossed");
  });
});

crosses.forEach((cross) => {
  cross.addEventListener("click", () => {
    cards.forEach((card) => {
      if (card.classList.contains("expanded")) {
        card.classList.add("crossed");
        card.classList.remove("expanded");
        cards.forEach((card) => {
          card.classList.remove("non-focus");
        });
        project_title.classList.toggle("hide");
        arrows.forEach((arrow) => {
          arrow.classList.toggle("expanded");
        });
        crosses.forEach((cross) => {
          cross.classList.remove("expanded");
        });
      }
    });
  });
});

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    current_card.classList.remove("expanded");
    current_card.classList.add("non-focus");

    if (arrow.classList.contains("arrow-left")) {
      current = current == 1 ? TOTAL_CARDS : current - 1;
    } else if (arrow.classList.contains("arrow-right")) {
      current = current == TOTAL_CARDS ? 1 : current + 1;
    }

    current_card_string = current_card_string.substring(0, 4);
    current_string = current.toString();

    current_card_string = current_card_string.concat(current_string);

    cards.forEach((card) => {
      if (card.classList.contains(current_card_string)) {
        current_card = card;
      }
    });

    current_card.classList.add("expanded");
    current_card.classList.remove("non-focus");
  });
});
