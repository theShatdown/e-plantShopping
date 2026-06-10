import React from "react";

function AboutUs() {
  return (
    <div style={styles.container}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🌿 About Paradise Nursery</h1>
        <p style={styles.heroSub}>
          Growing happiness, one plant at a time.
        </p>
      </div>

      {/* Company Overview */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Who We Are</h2>
        <p style={styles.text}>
          Paradise Nursery is a family-owned online plant shop dedicated to
          bringing the beauty and calm of nature into every home and workspace.
          Founded in 2018, we started as a small greenhouse in Hanoi, Vietnam,
          and have grown into a trusted destination for plant lovers across the
          country. We believe that every space — no matter how small — deserves
          a touch of green.
        </p>
      </section>

      {/* Mission */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.text}>
          Our mission is to make plant ownership accessible, enjoyable, and
          rewarding for everyone — from first-time growers to seasoned plant
          parents. We carefully curate our collection to include plants that are
          beautiful, easy to care for, and proven to improve air quality and
          overall well-being.
        </p>
      </section>

      {/* Why Choose Us */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us</h2>
        <div style={styles.cardGrid}>
          {[
            {
              icon: "🌱",
              title: "Hand-Picked Plants",
              desc: "Every plant in our collection is personally selected for health, beauty, and ease of care.",
            },
            {
              icon: "📦",
              title: "Safe Delivery",
              desc: "We use eco-friendly packaging designed to keep your plants safe and thriving in transit.",
            },
            {
              icon: "💬",
              title: "Expert Support",
              desc: "Our plant care team is always available to answer questions and help your plants flourish.",
            },
            {
              icon: "♻️",
              title: "Sustainability First",
              desc: "We source responsibly, minimize waste, and give back to reforestation programs.",
            },
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <span style={styles.cardIcon}>{item.icon}</span>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Meet the Team</h2>
        <div style={styles.teamGrid}>
          {[
            { name: "Linh Nguyen", role: "Founder & Head Horticulturist", emoji: "👩‍🌾" },
            { name: "Minh Tran",   role: "Operations Manager",            emoji: "👨‍💼" },
            { name: "Thu Pham",    role: "Plant Care Specialist",          emoji: "🌻" },
          ].map((member, i) => (
            <div key={i} style={styles.teamCard}>
              <div style={styles.teamAvatar}>{member.emoji}</div>
              <h3 style={styles.teamName}>{member.name}</h3>
              <p style={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ ...styles.section, ...styles.contactBox }}>
        <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Get In Touch</h2>
        <p style={{ ...styles.text, color: "rgba(255,255,255,0.85)", textAlign: "center" }}>
          We'd love to hear from you! Reach out for plant advice, order support, or just to say hello.
        </p>
        <div style={styles.contactInfo}>
          <span>📧 hello@paradisenursery.com</span>
          <span>📞 +84 90 123 4567</span>
          <span>📍 Hanoi, Vietnam</span>
        </div>
      </section>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  container: {
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a1a",
    backgroundColor: "#faf7f2",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1.5rem 4rem",
  },
  hero: {
    background: "linear-gradient(135deg, #1a2e1a 0%, #2d5a27 60%, #4a8c3f 100%)",
    borderRadius: "16px",
    padding: "3.5rem 2rem",
    textAlign: "center",
    marginBottom: "3rem",
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.8rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "0.75rem",
  },
  heroSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "1.05rem",
    fontStyle: "italic",
  },
  section: {
    marginBottom: "2.75rem",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#2d5a27",
    marginBottom: "1rem",
    borderBottom: "2px solid #e8f0e4",
    paddingBottom: "0.4rem",
  },
  text: {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: "#444",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    textAlign: "center",
  },
  cardIcon: { fontSize: "1.8rem" },
  cardTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1a2e1a",
    margin: "0.5rem 0 0.3rem",
  },
  cardDesc: { fontSize: "0.82rem", color: "#666", lineHeight: 1.6 },
  teamGrid: {
    display: "flex",
    gap: "1.25rem",
    flexWrap: "wrap",
    marginTop: "0.5rem",
  },
  teamCard: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem 1.25rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    textAlign: "center",
    flex: "1 1 180px",
  },
  teamAvatar: { fontSize: "2.5rem", marginBottom: "0.5rem" },
  teamName: { fontSize: "1rem", fontWeight: 600, color: "#1a2e1a", marginBottom: "0.2rem" },
  teamRole: { fontSize: "0.82rem", color: "#7c5c3a" },
  contactBox: {
    background: "linear-gradient(135deg, #1a2e1a, #2d5a27)",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    textAlign: "center",
  },
  contactInfo: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginTop: "1.25rem",
    color: "rgba(255,255,255,0.9)",
    fontSize: "0.92rem",
    fontWeight: 500,
  },
};

export default AboutUs;
