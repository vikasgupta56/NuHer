const options = document.querySelectorAll(".option");

options.forEach(option => {
  option.addEventListener("click", () => {

    options.forEach(o => o.classList.remove("active"));

    option.classList.add("active");

  });
});