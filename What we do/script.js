document.querySelectorAll(".option").forEach(option => {

  const header = option.querySelector(".option-header");
  const toggle = option.querySelector(".toggle");

  header.addEventListener("click", () => {

    const isActive = option.classList.contains("active");

    // sab close karo pehle
    document.querySelectorAll(".option").forEach(item => {
      item.classList.remove("active");
      item.querySelector(".toggle").textContent = "+";
    });

    // agar already open tha toh sirf close hi rahe
    if (!isActive) {
      option.classList.add("active");
      toggle.textContent = "−";
    }

  });

});