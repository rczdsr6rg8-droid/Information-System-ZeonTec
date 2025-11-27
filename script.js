// Анимация появления букв (blur, большой интервал)
const title = "Z E O N T E K";
const container = document.getElementById("header-title");
container.innerHTML = '';
const spacing = '';
container.setAttribute('data-text', title);

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
  }, 180 * i + 180);
});

window.onload = function() {
  document.querySelector('.glass-panel').style.opacity = '0';
  document.querySelector('.glass-panel').style.transform = 'translateY(10px) scale(0.99)';
  setTimeout(() => {
    document.querySelector('.glass-panel').style.transition = 'opacity 0.7s cubic-bezier(.33,1.42,.56,1), transform 0.8s cubic-bezier(.33,1.2,.38,1)';
    document.querySelector('.glass-panel').style.opacity = '1';
    document.querySelector('.glass-panel').style.transform = 'translateY(0) scale(1)';
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

  const potentialItems = document.querySelectorAll('.potential-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(potentialItems).indexOf(entry.target);
        entry.target.style.animationDelay = `${index * 90}ms`;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  potentialItems.forEach((item) => observer.observe(item));

  const sections = document.querySelectorAll('.info, .potential');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach((section) => sectionObserver.observe(section));

  const blurs = document.querySelectorAll('.floating-blur');
  const tiltTargets = document.querySelectorAll('.logo-block, .badge-strip, .developer-info, .subtitle');
  const centerMove = (event) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (event.clientX / innerWidth - 0.5);
    const offsetY = (event.clientY / innerHeight - 0.5);

    blurs.forEach((blur, idx) => {
      const intensity = 14 + idx * 6;
      const x = offsetX * intensity;
      const y = offsetY * intensity;
      blur.style.setProperty('--shift-x', `${x}px`);
      blur.style.setProperty('--shift-y', `${y}px`);
    });

    const tiltX = offsetX * 10;
    const tiltY = offsetY * 8;
    tiltTargets.forEach((target) => {
      target.style.setProperty('--tilt-x', `${tiltX}px`);
      target.style.setProperty('--tilt-y', `${tiltY}px`);
    });
  };

  document.addEventListener('mousemove', centerMove);
});
