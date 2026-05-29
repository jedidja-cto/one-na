import { SECTORS, BIZ } from './data.js';

export function buildSectors() {
  const counts = {};
  BIZ.forEach(b => { counts[b.sector] = (counts[b.sector] || 0) + 1; });
  const sectorsGrid = document.getElementById('sectorsGrid');
  if (!sectorsGrid) return;
  sectorsGrid.innerHTML = SECTORS.map(s => {
    const c = counts[s.name] || 0;
    return `<div class="sc" onclick="setSec('${s.name}')" style="--sector-color: ${s.color}"><div class="sc-num">${s.num}</div><div class="sc-icon">${s.svg}</div><div class="sc-name">${s.name}</div><div class="sc-count">${c} listing${c !== 1 ? 's' : ''}</div></div>`;
  }).join('');

  // hero pills
  const heroPills = document.getElementById('heroPills');
  if (!heroPills) return;
  const pills = ['Agriculture & Farming', 'Mining & Resources', 'Tourism & Hospitality', 'Retail & Shopping', 'Construction & Real Estate', 'Finance & Banking'];
  heroPills.innerHTML = pills.map(p => `<button class="hero-pill" onclick="setSec('${p}')">${p}</button>`).join('');
}
