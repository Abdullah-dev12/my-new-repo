// ===== Dark / Light Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Restore saved theme on load
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
  }
})();

// ===== Toast Notification Helper =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Card Click — Highlight Active Card =====
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    // Don't trigger when the download button itself is clicked
    if (e.target.classList.contains('download-btn')) return;

    cards.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');

    const name = card.querySelector('h2').textContent;
    showToast(name + ' selected!');
  });
});

// ===== Download Button — Toast Confirmation =====
const downloadBtns = document.querySelectorAll('.download-btn');

downloadBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const name = btn.closest('.card').querySelector('h2').textContent;
    showToast('Downloading ' + name + ' logo...');
  });
});

// ===== Search / Filter Cards =====
const searchInput = document.getElementById('search-input');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    cards.forEach((card) => {
      const name = card.querySelector('h2').textContent.toLowerCase();
      card.style.display = name.includes(query) ? '' : 'none';
    });
  });
}

// ===== Keyboard Accessibility: Enter key activates card =====
cards.forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });
});
