import { REGIONS, BIZ } from './data.js';

export function buildRegions() {
  const counts = {};
  BIZ.forEach(b => { counts[b.region] = (counts[b.region] || 0) + 1; });
  const regionsGrid = document.getElementById('regionsGrid');
  if (regionsGrid) {
    regionsGrid.innerHTML = REGIONS.map(r => {
      const c = counts[r.name] || 0;
      return `<div class="rg" id="rg-${r.name.replace(/\s/g, '-')}" onclick="setReg('${r.name}')"><div class="rg-name">${r.name}</div><div class="rg-count">${c} listed</div></div>`;
    }).join('');
  }

  // selects
  const regSel = document.getElementById('regSel');
  if (regSel) {
    regSel.innerHTML = '<option value="">All Regions</option>' + REGIONS.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
  }

  const secSel = document.getElementById('secSel');
  if (secSel) {
    // We need SECTORS here, let's import it too
    import('./data.js').then(dataModule => {
      const SECTORS = dataModule.SECTORS;
      secSel.innerHTML = '<option value="">All Sectors</option>' + SECTORS.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    });
  }
}
