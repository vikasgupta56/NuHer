// const track = document.querySelector(".products .container .wrapper .track");
// const cards = document.querySelectorAll(".products .container .wrapper .track .card");
// const btnNext = document.querySelector(".products .container .top .arrows .right");
// const btnPrev = document.querySelector(".products .container .top .arrows .left");

// let currentIndex = 0;
// let isDragging = false;
// let startX = 0;
// let currentTranslate = 0;
// let prevTranslate = 0;
// let animationID;

// const gap = 25;

// function getCardWidth() {
//   return cards[0].offsetWidth + gap;
// }

// function getMaxTranslate() {
//   return -(getCardWidth() * (cards.length - 1));
// }

// function setPosition() {
//   track.style.transform = `translateX(${currentTranslate}px)`;
// }

// function animation() {
//   setPosition();
//   if (isDragging) requestAnimationFrame(animation);
// }

// function snapToCard() {
//   const cardWidth = getCardWidth();

//   currentIndex = Math.round(Math.abs(currentTranslate) / cardWidth);

//   // boundary fix
//   if (currentIndex < 0) currentIndex = 0;
//   if (currentIndex > cards.length - 1) currentIndex = cards.length - 1;

//   currentTranslate = -currentIndex * cardWidth;
//   prevTranslate = currentTranslate;

//   track.style.transition = "transform 0.4s ease";
//   setPosition();
// }

// track.addEventListener("mousedown", startDrag);
// track.addEventListener("touchstart", startDrag);

// track.addEventListener("mousemove", drag);
// track.addEventListener("touchmove", drag);

// track.addEventListener("mouseup", endDrag);
// track.addEventListener("mouseleave", endDrag);
// track.addEventListener("touchend", endDrag);

// function startDrag(e) {
//   isDragging = true;
//   startX = getPositionX(e);
//   track.style.transition = "none";
//   animationID = requestAnimationFrame(animation);
// }

// function drag(e) {
//   if (!isDragging) return;

//   const currentPosition = getPositionX(e);
//   currentTranslate = prevTranslate + currentPosition - startX;

//   // clamp boundaries while dragging
//   if (currentTranslate > 0) currentTranslate = 0;
//   if (currentTranslate < getMaxTranslate())
//     currentTranslate = getMaxTranslate();
// }

// function endDrag() {
//   if (!isDragging) return;
//   isDragging = false;
//   cancelAnimationFrame(animationID);
//   snapToCard();
// }

// function getPositionX(e) {
//   return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
// }

// btnNext.addEventListener("click", () => {
//   if (currentIndex < cards.length - 1) {
//     currentIndex++;
//     moveToIndex();
//   }
// });

// btnPrev.addEventListener("click", () => {
//   if (currentIndex > 0) {
//     currentIndex--;
//     moveToIndex();
//   }
// });

// function moveToIndex() {
//   const cardWidth = getCardWidth();
//   currentTranslate = -currentIndex * cardWidth;
//   prevTranslate = currentTranslate;
//   track.style.transition = "transform 0.4s ease";
//   setPosition();
// }


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

function initFAQ(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  const items = section.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

initFAQ(".faq");

initSlider(".doctors");
initSlider(".products")
