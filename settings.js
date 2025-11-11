// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const contentWrap = document.getElementById('contentWrap');

function toggleMenu() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  contentWrap.classList.toggle('shifted');
  menuToggle.classList.toggle('shifted');
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  contentWrap.classList.remove('shifted');
  menuToggle.classList.remove('shifted');
}

if (overlay) overlay.addEventListener('click', closeMenu);

// Toggle section (châu lục)
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const icon = document.getElementById(`${sectionId}-icon`);

  if (!section) return;

  if (section.style.display === 'none' || section.style.display === '') {
    section.style.display = 'block';
    if (icon) icon.classList.add('rotate-180');
  } else {
    section.style.display = 'none';
    if (icon) icon.classList.remove('rotate-180');
  }
}

// Toggle country section
function toggleCountrySection(sectionId) {
  const grid = document.getElementById(`${sectionId}-grid`);
  const arrow = document.getElementById(`${sectionId}-arrow`);
  if (!grid) return;

  if (grid.style.display === 'none' || grid.style.display === '') {
    grid.style.display = 'grid';
    if (arrow) arrow.classList.add('rotate-180');
  } else {
    grid.style.display = 'none';
    if (arrow) arrow.classList.remove('rotate-180');
  }
}

// Open modal
function openModal(country) {
  const modal = document.getElementById(`modal-${country}`);
  if (!modal) return;

  modal.style.display = 'flex';
  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
}

// Close modal
function closeModal(country) {
  const modal = document.getElementById(`modal-${country}`);
  if (!modal) return;

  modal.style.display = 'none';
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

// Reset all filters
function resetFilter(country, group) {
  const items = document.querySelectorAll(`[data-country="${country}"][data-group="${group}"]`);

  items.forEach(item => {
    item.style.display = 'block';
  });

  const search = document.getElementById(`${country}-${group}-search`);
  const filter = document.getElementById(`${country}-${group}-filter`);
  
  if (search) search.value = '';
  if (filter) filter.value = 'all';
}

// Show all items
function showAllItems(country, group) {
  const items = document.querySelectorAll(
    `[data-country="${country}"][data-group="${group}"]`
  );
  items.forEach(item => item.style.display = 'block');
}

// Search filter
function applySearch(country, group) {
  const searchBox = document.getElementById(`${country}-${group}-search`);
  if (!searchBox) return;

  const keyword = searchBox.value.toLowerCase();

  const items = document.querySelectorAll(
    `[data-country="${country}"][data-group="${group}"]`
  );

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(keyword) ? 'block' : 'none';
  });
}

// Dropdown filter
function applyCategoryFilter(country, group) {
  const filter = document.getElementById(`${country}-${group}-filter`);
  if (!filter) return;

  const category = filter.value;

  const items = document.querySelectorAll(
    `[data-country="${country}"][data-group="${group}"]`
  );

  items.forEach(item => {
    const itemType = item.getAttribute('data-item');
    if (category === 'all' || itemType === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Bind tất cả search & filter tự động
document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll("[id$='-search']");
  searchInputs.forEach(input => {
    const id = input.id.split('-');
    const country = id[0];
    const group = id[1];
    input.addEventListener("input", () => applySearch(country, group));
  });

  const filters = document.querySelectorAll("[id$='-filter']");
  filters.forEach(select => {
    const id = select.id.split('-');
    const country = id[0];
    const group = id[1];
    select.addEventListener("change", () => applyCategoryFilter(country, group));
  });
});
