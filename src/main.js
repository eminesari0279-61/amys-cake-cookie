const menuButton = document.querySelector('#menuButton');
const nav = document.querySelector('#nav');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
const toast = document.querySelector('#toast');
let count = 0;

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

function toggleSearch(open) {
  searchPanel.classList.toggle('open', open);
  searchPanel.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('no-scroll', open);
  if (open) setTimeout(() => searchInput.focus(), 300);
}

document.querySelector('#searchButton').addEventListener('click', () => toggleSearch(true));
document.querySelector('#closeSearch').addEventListener('click', () => toggleSearch(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleSearch(false); });

document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => {
  count += 1;
  document.querySelector('#cartCount').textContent = count;
  toast.firstChild.textContent = `${button.dataset.product} sepetinize eklendi. `;
  toast.classList.add('show');
  button.classList.add('added');
  button.childNodes[0].textContent = 'Sepette ';
  setTimeout(() => toast.classList.remove('show'), 2600);
}));

document.querySelector('#cartButton').addEventListener('click', () => {
  toast.firstChild.textContent = count ? `Sepetinizde ${count} ürün var. ` : 'Sepetiniz henüz boş. ';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#newsletter').addEventListener('submit', (event) => {
  event.preventDefault();
  toast.firstChild.textContent = 'Tatlı haberlerimize kaydoldunuz! ';
  toast.classList.add('show');
  event.currentTarget.reset();
  setTimeout(() => toast.classList.remove('show'), 2600);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
