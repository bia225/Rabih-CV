(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('rabih-cv-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

  const isEnglish = () => root.lang === 'en';

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const label = theme === 'dark'
      ? (isEnglish() ? 'Enable light theme' : 'Activer le thème clair')
      : (isEnglish() ? 'Enable dark theme' : 'Activer le thème sombre');
    toggle?.setAttribute('aria-label', label);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#08111c' : '#0d3b66');
  };

  applyTheme(initialTheme);

  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('rabih-cv-theme', next);
    applyTheme(next);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('visible'));
  }
})();
