import { BIZ } from './data.js';

export let curReg = '';
export let curSec = '';

export function getList() {
  const heroSearch = document.getElementById('heroSearch');
  const dirSearch = document.getElementById('dirSearch');
  const regSel = document.getElementById('regSel');
  const secSel = document.getElementById('secSel');
  const sortSel = document.getElementById('sortSel');

  const q = (heroSearch?.value || '') + ' ' + (dirSearch?.value || '');
  const reg = regSel?.value || '';
  const sec = secSel?.value || '';
  const sort = sortSel?.value || 'newest';

  let list = BIZ.filter(b => {
    const mq = !q ||
      b.name.toLowerCase().includes(q.toLowerCase().trim()) ||
      b.desc.toLowerCase().includes(q.toLowerCase().trim()) ||
      b.sector.toLowerCase().includes(q.toLowerCase().trim()) ||
      b.loc.toLowerCase().includes(q.toLowerCase().trim()) ||
      b.tags.some(t => t.toLowerCase().includes(q.toLowerCase().trim()));
    const mr = !reg || b.region === reg;
    const ms = !sec || b.sector === sec;
    return mq && mr && ms;
  });

  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => b.added - a.added);

  return list;
}

export function syncHeroSearch() {
  const heroSearch = document.getElementById('heroSearch');
  const dirSearch = document.getElementById('dirSearch');
  if (heroSearch && dirSearch) {
    dirSearch.value = heroSearch.value;
  }
}

export function goToDirectory() {
  const directory = document.getElementById('directory');
  if (directory) {
    directory.scrollIntoView({ behavior: 'smooth' });
  }
}

export function setSec(s) {
  const secSel = document.getElementById('secSel');
  if (secSel) {
    secSel.value = s;
  }
  curSec = s;
  goToDirectory();
}

export function setReg(r) {
  const regSel = document.getElementById('regSel');
  if (regSel) {
    regSel.value = r;
  }
  curReg = r;
  document.querySelectorAll('.rg').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('rg-' + r.replace(/\s/g, '-'));
  if (el) el.classList.add('active');
  goToDirectory();
}

export function clearReg() {
  const regSel = document.getElementById('regSel');
  if (regSel) {
    regSel.value = '';
  }
  document.querySelectorAll('.rg').forEach(el => el.classList.remove('active'));
}

export function clearSec() {
  const secSel = document.getElementById('secSel');
  if (secSel) {
    secSel.value = '';
  }
}

export function clearSearch() {
  const dirSearch = document.getElementById('dirSearch');
  const heroSearch = document.getElementById('heroSearch');
  if (dirSearch) dirSearch.value = '';
  if (heroSearch) heroSearch.value = '';
}
