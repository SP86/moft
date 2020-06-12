let burgerWrapper = document.querySelector(".menu__burger");
let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuDropDown = document.querySelector(".header__menu-dropdown");
if (iconMenu) {
  burgerWrapper.addEventListener("click", function () {
    iconMenu.classList.toggle("active");
    body.classList.toggle("lock");
    menuDropDown.classList.toggle("active");
  });
}