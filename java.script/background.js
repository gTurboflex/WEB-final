document.addEventListener("DOMContentLoaded", () => {
  const colors = ['bg-secondary', 'bg-dark'];
  const body = document.body;
  const btn = document.getElementById('colorBtn');
  let current = 0;

  
  body.classList.remove('bg-dark', 'text-white');

  
  const savedColor = localStorage.getItem('backgroundColor');
  if (savedColor && colors.includes(savedColor)) {
    body.classList.add(savedColor);
    current = colors.indexOf(savedColor);
  } else {
    body.classList.add(colors[0]);
  }

  
  btn.addEventListener('click', () => {
    
    colors.forEach(c => body.classList.remove(c));

    
    current = (current + 1) % colors.length;
    const newColor = colors[current];

    
    body.classList.add(newColor);
    localStorage.setItem('backgroundColor', newColor);
  });
});