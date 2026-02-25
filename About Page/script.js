const experts = document.querySelectorAll(".expert");

experts.forEach((item) => {
  const header = item.querySelector(".expert-header");
  const body = item.querySelector(".expert-body");

  header.addEventListener("click", () => {

    if (item.classList.contains("active")) {
      item.classList.remove("active");
      body.style.maxHeight = null;
      return;
    }

    experts.forEach(e => {
      e.classList.remove("active");
      e.querySelector(".expert-body").style.maxHeight = null;
    });

    item.classList.add("active");
    body.style.maxHeight = body.scrollHeight + "px";

  });
});