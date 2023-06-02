const nav = document.getElementById("nav");
const bars = document.querySelector(".bars");

function nav_active_toggle() {
  nav.classList.toggle("inactive");
}

bars.addEventListener("click", nav_active_toggle);

const nav_elements = document.querySelectorAll(".text, .button-container");

nav_elements.forEach((element) => {
  element.addEventListener("click", () => {
    nav_active_toggle;
    bars.click();
  });
});

var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};
