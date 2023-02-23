const darkModeBtn = document.querySelector(".dark-mode-btn");

JSON.parse(localStorage.getItem("darkLight"))
  ? document.body.classList.add("dark-mode")
  : [];

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkLight",
    document.body.classList.contains("dark-mode")
  );
});
