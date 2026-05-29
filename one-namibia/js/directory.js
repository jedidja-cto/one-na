import { BIZ, av } from './data.js';
import { getList, clearReg, clearSec, clearSearch } from './filters.js';

export function renderListings() {
  const list = getList();
  const dirCount = document.getElementById('dirCount');
  if (dirCount) {
    dirCount.textContent = `${list.length} of ${BIZ.length}`;
  }

  const listingsGrid = document.getElementById('listingsGrid');
  if (!listingsGrid) return;

  if (!list.length) {
    listingsGrid.innerHTML = '<div class="no-results">No businesses found — try adjusting your filters.</div>';
    renderActiveFilters();
    return;
  }

  listingsGrid.innerHTML = list.map(b => {
    const visibleTags = b.tags.slice(0, 3);
    const extra = b.tags.length - 3;
    return `<div class="lc" onclick="openModal(${b.id})" style="--avatar-color: ${av(b.sector)}">
      <div class="lc-top">
        <div class="lc-av" style="background:${av(b.sector)}">${b.init}</div>
        <div class="lc-info">
          <div class="lc-name">${b.name}</div>
          <div class="lc-sec">• ${b.sector.toUpperCase()}</div>
        </div>
        <div class="lc-rat"><span class="lc-rn">${b.rating}</span><span class="lc-rs">★★★★★</span></div>
      </div>
      <div class="lc-desc">${b.desc}</div>
      <div class="lc-tags">${visibleTags.map(t => `<span class="lc-tag">${t}</span>`).join('')}${extra > 0 ? `<span class="lc-tag extra">+${extra}</span>` : ''}</div>
      <div class="lc-foot">
        <div class="lc-loc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${b.loc}
        </div>
        <span class="lc-vp">View Profile →</span>
      </div>
    </div>`;
  }).join('');

  renderActiveFilters();
}

function renderActiveFilters() {
  const regSel = document.getElementById('regSel');
  const secSel = document.getElementById('secSel');
  const dirSearch = document.getElementById('dirSearch');
  const activeFilters = document.getElementById('activeFilters');

  if (!activeFilters) return;

  const reg = regSel?.value || '';
  const sec = secSel?.value || '';
  const q = dirSearch?.value.trim() || '';

  const chips = [];
  if (reg) chips.push(`<div class="af-pill">Region: ${reg}<button onclick="clearReg(); applyFilters();">×</button></div>`);
  if (sec) chips.push(`<div class="af-pill">Sector: ${sec}<button onclick="clearSec(); applyFilters();">×</button></div>`);
  if (q) chips.push(`<div class="af-pill">Search: "${q}"<button onclick="clearSearch(); applyFilters();">×</button></div>`);

  activeFilters.innerHTML = chips.join('');
}

export function applyFilters() {
  renderListings();
}
