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
    nav.classList.add("no");
    nav.classList.add("inactive");
    setTimeout(function () {
      nav.classList.remove("no");
    }, 1000);
  });
});

var prevScrollpos = window.scrollY;

window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos && !nav.classList.contains("no")) {
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
const cards_container = document.querySelector(".cards-container");
const project_title = document.querySelector(".project-title");
const arrows = document.querySelectorAll(".project-arrow");
const crosses = document.querySelectorAll(".project-close");

const TOTAL_CARDS = 6;
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
      cards_container.classList.add("expanded");
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

      nav.classList.add("no");
      document.getElementById("projects").scrollIntoView();
    }

    card.classList.remove("crossed");
    setTimeout(function () {
      nav.classList.remove("no");
    }, 1000);
  });
});

crosses.forEach((cross) => {
  cross.addEventListener("click", () => {
    cards.forEach((card) => {
      if (card.classList.contains("expanded")) {
        card.classList.add("crossed");
        card.classList.remove("expanded");
        cards_container.classList.remove("expanded");
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

document.addEventListener("keydown", function (event) {
  if (cards_container.classList.contains("expanded")) {
    if (event.key === "ArrowLeft") {
      current_card.classList.remove("expanded");
      current_card.classList.add("non-focus");

      current = current == 1 ? TOTAL_CARDS : current - 1;

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
    } else if (event.key === "ArrowRight") {
      current_card.classList.remove("expanded");
      current_card.classList.add("non-focus");

      current = current == TOTAL_CARDS ? 1 : current + 1;

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
    } else if (event.key === "Escape") {
      cards.forEach((card) => {
        if (card.classList.contains("expanded")) {
          card.classList.add("crossed");
          card.classList.remove("expanded");
          cards_container.classList.remove("expanded");
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
    }
  }
});
