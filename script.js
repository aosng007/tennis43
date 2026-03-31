  /* ── Language Toggle ── */
  function toggleLang() {
    const body = document.body;
    const btn  = document.getElementById('lang-toggle');
    if (body.classList.contains('lang-zh')) {
      body.classList.replace('lang-zh', 'lang-en');
      btn.textContent = 'CN';
    } else {
      body.classList.replace('lang-en', 'lang-zh');
      btn.textContent = 'EN';
    }
  }

  /* ── Navbar scroll shadow ── */
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ── Group Tabs ── */
  function switchGroup(name, btn) {
    document.querySelectorAll('.group-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.gtab').forEach(b => {
      b.classList.remove('active');
      b.style.removeProperty('background');
      b.style.removeProperty('color');
    });
    document.getElementById('panel-' + name).classList.add('active');
    btn.classList.add('active');
    if (name === 'orange') {
      btn.style.background = 'var(--orange)';
      btn.style.color = '#000';
    }
  }

  function showOrangePanel() {
    var btn = document.querySelector('[data-tab="orange"]');
    /* Brief delay lets the browser complete hash-scroll before switching the panel */
    if (btn) { setTimeout(function() { switchGroup('orange', btn); }, 50); }
  }

  /* ── Dynamic Schedule Weekdays ── */
  function updateScheduleDates() {
    document.querySelectorAll('td[data-date]').forEach(function(td) {
      var parts = td.getAttribute('data-date').split('-');
      var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var weekdayZh = date.toLocaleDateString('zh-CN', { weekday: 'short' });
      var weekdayEn = date.toLocaleDateString('en-US', { weekday: 'short' });
      var monthAbbrEn = date.toLocaleDateString('en-US', { month: 'short' });
      var zhSpan = td.querySelector('[data-lang="zh"]');
      var enSpan = td.querySelector('[data-lang="en"]');
      if (zhSpan) zhSpan.textContent = month + '月' + day + '日（' + weekdayZh + '）';
      if (enSpan) enSpan.textContent = weekdayEn + ' · ' + monthAbbrEn + ' ' + day;
    });
  }
  document.addEventListener('DOMContentLoaded', updateScheduleDates);
