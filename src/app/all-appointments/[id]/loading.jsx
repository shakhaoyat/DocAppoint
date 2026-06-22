// app/doctors/[id]/loading.jsx
// ✅ Next.js automatically shows this while the page.jsx fetch is in-flight

export default function Loading() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>
            <span style={{ color: "#0891b2" }}>♥</span> DocAppoint
          </span>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.heroCard}>
          {/* Photo skeleton */}
          <div style={{ ...styles.skeleton, width: 220, height: 260, borderRadius: 16, flexShrink: 0 }} />

          {/* Info skeleton */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ ...styles.skeleton, width: 120, height: 14, borderRadius: 8 }} />
            <div style={{ ...styles.skeleton, width: 300, height: 36, borderRadius: 8 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ ...styles.skeleton, width: 160, height: 32, borderRadius: 20 }} />
              <div style={{ ...styles.skeleton, width: 140, height: 32, borderRadius: 20 }} />
            </div>
            <div style={{ ...styles.skeleton, width: "100%", height: 56, borderRadius: 8 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ ...styles.skeleton, height: 80, borderRadius: 12 }} />
              ))}
            </div>
            <div style={{ ...styles.skeleton, width: 200, height: 48, borderRadius: 12, marginTop: 8 }} />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  header: { background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center" },
  logo: { fontSize: 20, fontWeight: 700, color: "#0f172a" },
  main: { maxWidth: 1100, margin: "48px auto", padding: "0 24px" },
  heroCard: {
    background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(8,145,178,0.10)",
    display: "flex", gap: 48, padding: 40, flexWrap: "wrap",
  },
  skeleton: {
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  },
};
