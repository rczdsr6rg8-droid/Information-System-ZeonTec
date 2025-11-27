// Анимация появления букв (blur, большой интервал)
const title = "Z E O N T E K";
const container = document.getElementById("header-title");
container.innerHTML = '';
const spacing = ' ';

for (let i = 0; i < title.length; i++) {
  const letter = document.createElement("span");
  letter.textContent = title[i] + spacing;
  letter.className = "title-letter";
  container.appendChild(letter);
}
const animatedLetters = container.querySelectorAll('.title-letter');
animatedLetters.forEach((letter, i) => {
  setTimeout(() => {
    letter.classList.add('visible');
  }, 220 * i + 200);
});

window.onload = function() {
  document.querySelector('.glass-panel').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.glass-panel').style.transition = 'opacity 0.7s cubic-bezier(.33,1.42,.56,1)';
    document.querySelector('.glass-panel').style.opacity = '1';
  }, 180);
};

// Футер подсвечивается при нажатии на CONTACT:
document.addEventListener("DOMContentLoaded", function() {
  let btn = document.getElementById("show-footer-btn");
  btn.addEventListener("click", function() {
    let cards = document.querySelectorAll('.footer-card');
    cards.forEach((el, i) => {  
      setTimeout(() => {
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 1500 + i*80); // красиво "затухает"
      }, i*160);
    });
  });
});
