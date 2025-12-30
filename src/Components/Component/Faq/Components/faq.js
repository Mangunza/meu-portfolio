export function initFaqAnimations() {
  const faqImage1 = document.querySelector(".faq-image1 img");

  if (!faqImage1) return;

  let offset = 0;
  let direction = 1;

  // Função para a animação BY johnnydurao1802@gmail.com
  function animateFloat() {
    offset += direction * 0.2;
    if (offset > 10 || offset < -10) direction *= -1;
    faqImage1.style.transform = `translateY(${ -35 + offset }px)`; 
    requestAnimationFrame(animateFloat);
  }

  animateFloat();
}
