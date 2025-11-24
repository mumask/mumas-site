document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');

    document.querySelectorAll('.accordion-content.open').forEach(c => {
      c.classList.remove('open');
      c.previousElementSibling.querySelector('.accordion-arrow').classList.remove('open');
    });

    if (!isOpen) {
      content.classList.add('open');
      arrow.classList.add('open');
    }
  });
});
