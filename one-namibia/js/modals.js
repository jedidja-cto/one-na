import { BIZ, av, SECTORS, REGIONS } from './data.js';

export function openModal(id) {
  const b = BIZ.find(x => x.id === id);
  if (!b) return;
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-av-wrap">
      <div class="modal-av" style="background:${av(b.sector)}">${b.init}</div>
      <div class="modal-av-info">
        <div class="modal-name">${b.name}</div>
        <div class="modal-sec">• ${b.sector.toUpperCase()}</div>
      </div>
    </div>
    <div class="modal-rat-row"><span class="modal-rat-big">${b.rating}</span><span class="modal-rat-stars">★★★★★</span></div>
    <hr class="modal-hr">
    <div class="modal-lbl">About</div>
    <div class="modal-val" style="margin-bottom:14px">${b.desc}</div>
    <div class="modal-lbl">Location</div>
    <div class="modal-contact-row" style="margin-bottom:14px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>${b.loc}</span>
    </div>
    <div class="modal-lbl">Contact</div>
    <div class="modal-contact-row">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
      </svg>
      <span>${b.phone}</span>
    </div>
    <div class="modal-contact-row">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      <span>${b.email}</span>
    </div>
    <div class="modal-contact-row" style="margin-bottom:14px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      <span>${b.web}</span>
    </div>
    <hr class="modal-hr">
    <div class="modal-lbl">Services & Tags</div>
    <div class="modal-tags">${b.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
    <button class="modal-contact-btn" onclick="toast('Email client feature coming soon!')">Contact This Business</button>
  `;

  const modalBg = document.getElementById('modalBg');
  if (modalBg) modalBg.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal(event) {
  if (!event || event.target === document.getElementById('modalBg')) {
    const modalBg = document.getElementById('modalBg');
    if (modalBg) modalBg.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export function openListForm() {
  const formBody = document.getElementById('formBody');
  if (!formBody) return;

  formBody.innerHTML = `
    <div class="form-title">List Your Business</div>
    <div class="form-subtitle">Free forever. Your listing goes live immediately.</div>
    <div class="form-row">
      <div class="form-group"><label>Business Name</label><input type="text" placeholder="e.g. Acme Namibia (Pty) Ltd"></div>
      <div class="form-group"><label>Trading Name</label><input type="text" placeholder="e.g. Acme"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Sector</label>
        <select>${SECTORS.map(s => `<option>${s.name}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Region</label>
        <select>${REGIONS.map(r => `<option>${r.name}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Town / City</label><input type="text" placeholder="e.g. Windhoek"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Phone</label><input type="tel" placeholder="+264 61 000 000"></div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="info@yourbusiness.com.na"></div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Website</label><input type="url" placeholder="www.yourbusiness.com.na"></div>
    </div>
    <div class="form-row full">
      <div class="form-group"><label>Business Description</label><textarea placeholder="Describe your products, services and what makes your business unique…"></textarea></div>
    </div>
    <div class="form-actions">
      <button class="form-submit" onclick="submitForm()">Submit Listing</button>
      <button class="form-cancel" onclick="closeForm()">Cancel</button>
    </div>
  `;

  const formBg = document.getElementById('formBg');
  if (formBg) formBg.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function submitForm() {
  const formBody = document.getElementById('formBody');
  if (!formBody) return;
  formBody.innerHTML = `
    <div class="form-success">
      <div class="form-success-icon">✓</div>
      <h3>Listing Submitted!</h3>
      <p>Thank you. Your business will be reviewed and listed on ONE within 24 hours.<br>You'll receive a confirmation at the email provided.</p>
      <button class="form-submit" style="margin-top:1.5rem" onclick="closeForm()">Done</button>
    </div>
  `;

  const statBiz = document.getElementById('statBiz');
  if (statBiz) {
    statBiz.textContent = BIZ.length + 1;
  }
}

export function closeForm(event) {
  if (!event || event.target === document.getElementById('formBg')) {
    const formBg = document.getElementById('formBg');
    if (formBg) formBg.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export function toast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2800);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeForm();
  }
});
