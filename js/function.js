let scrollUp = document.querySelector(".scroll_up");
window.addEventListener("scroll", function () {
  if(window.scrollY > 200){
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
  }
});

scrollUp.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
