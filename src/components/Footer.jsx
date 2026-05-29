export default function Footer() {
  return (
    <footer className="footer">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '0.8rem',
        marginBottom: '2rem'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(28,43,74,0.08)' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></div>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(28,43,74,0.08)' }}></div>
      </div>
      <div>
        <div className="footer-brand">ONE</div>
        <div className="footer-sub">Namibia Directory</div>
      </div>
      <div className="footer-links">
        <a href="#sectors">Sectors</a>
        <a href="#directory">Directory</a>
        <a href="#regions">Regions</a>
        <a href="#why">About</a>
      </div>
      <div className="footer-copy">© 2025 ONE Namibia Directory</div>
    </footer>
  );
}
