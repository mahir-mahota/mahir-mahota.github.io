const nav = document.getElementById("nav");
const bars = document.querySelector(".bars");
const bars_icon = document.querySelector(".fa-bars");

bars.addEventListener("click", () => {
  nav.classList.toggle("inactive");
  bars_icon.classList.toggle("fa-bars");
  bars_icon.classList.toggle("fa-close");
});
