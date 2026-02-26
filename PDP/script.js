document.querySelectorAll(".faq-question").forEach(button => {

  button.addEventListener("click", () => {

    const item = button.parentElement;
    const answer = item.querySelector(".faq-answer");

    // Close others
    document.querySelectorAll(".faq-item").forEach(el => {
      if (el !== item) {
        el.classList.remove("active");
        el.querySelector(".faq-answer").style.height = 0;
      }
    });

    // Toggle current
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      answer.style.height = 0;
    } else {
      item.classList.add("active");
      answer.style.height = answer.scrollHeight + "px";
    }

  });

});


function initSlider(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  const track = section.querySelector(".track");
  const cards = section.querySelectorAll(".card");
  const btnNext = section.querySelector(".right");
  const btnPrev = section.querySelector(".left");

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  const gap = 25;

  const getCardWidth = () => cards[0].offsetWidth + gap;
  const getMaxTranslate = () =>
    -(getCardWidth() * (cards.length - 1));

  const setPosition = () => {
    track.style.transform = `translateX(${currentTranslate}px)`;
  };

  const animation = () => {
    setPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const snapToCard = () => {
    const cardWidth = getCardWidth();

    currentIndex = Math.round(Math.abs(currentTranslate) / cardWidth);

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > cards.length - 1)
      currentIndex = cards.length - 1;

    currentTranslate = -currentIndex * cardWidth;
    prevTranslate = currentTranslate;

    track.style.transition = "transform 0.4s ease";
    setPosition();
  };

  const getPositionX = (e) =>
    e.type.includes("mouse")
      ? e.pageX
      : e.touches[0].clientX;

  const startDrag = (e) => {
    isDragging = true;
    startX = getPositionX(e);
    track.style.transition = "none";
    animationID = requestAnimationFrame(animation);
  };

  const drag = (e) => {
    if (!isDragging) return;

    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startX;

    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < getMaxTranslate())
      currentTranslate = getMaxTranslate();
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    snapToCard();
  };

  const moveToIndex = () => {
    const cardWidth = getCardWidth();
    currentTranslate = -currentIndex * cardWidth;
    prevTranslate = currentTranslate;
    track.style.transition = "transform 0.4s ease";
    setPosition();
  };

  btnNext.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      moveToIndex();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      moveToIndex();
    }
  });

  track.addEventListener("mousedown", startDrag);
  track.addEventListener("touchstart", startDrag);

  track.addEventListener("mousemove", drag);
  track.addEventListener("touchmove", drag);

  track.addEventListener("mouseup", endDrag);
  track.addEventListener("mouseleave", endDrag);
  track.addEventListener("touchend", endDrag);
}


initSlider(".products")