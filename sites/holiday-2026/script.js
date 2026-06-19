const body = document.body;
const langToggle = document.getElementById('lang-toggle');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function toggleLang() {
  const isChinese = body.classList.contains('lang-zh');
  body.classList.toggle('lang-zh', !isChinese);
  body.classList.toggle('lang-en', isChinese);
  langToggle.textContent = isChinese ? 'CN' : 'EN';
}

function toggleNav() {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function updateScheduleDates() {
  document.querySelectorAll('[data-date]').forEach((node) => {
    const dateValue = node.getAttribute('data-date');
    if (!dateValue) {
      return;
    }

    const [year, month, day] = dateValue.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const zhWeekday = date.toLocaleDateString('zh-CN', { weekday: 'short' });
    const enWeekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const enMonth = date.toLocaleDateString('en-US', { month: 'long' });

    const zhNode = node.querySelector('[data-lang="zh"]');
    const enNode = node.querySelector('[data-lang="en"]');

    if (zhNode) {
      zhNode.textContent = `${month}月${day}日 ${zhWeekday}`;
    }

    if (enNode) {
      enNode.textContent = `${enWeekday}, ${enMonth} ${day}, ${year}`;
    }
  });
}

langToggle.addEventListener('click', toggleLang);
navToggle.addEventListener('click', toggleNav);
document.querySelectorAll('#nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

updateScheduleDates();
