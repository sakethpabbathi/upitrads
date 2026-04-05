import "./App.css";

import React, { useEffect, useState } from "react";

import ScrollToTop from "./ScrollToTop";
import { useNavigate } from "react-router-dom";

const TradingHome = () => {
  const [activeSlide, setActiveSlide] = useState(0); 
  return (
    <div style={styles.app}>
      <ScrollToTop /> 
      <Header setActiveSlide={setActiveSlide} />
      {/* <Hero />  */}
      <SubHeader /> 
      <ImportExportSection 
        activeSlide={activeSlide} 
        setActiveSlide={setActiveSlide} 
      />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

const Header = ({ setActiveSlide }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Track which link is being hovered
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", type: "scroll" },
    { name: "Import", href: "#imports-exports", type: "slide", value: 1 },
    { name: "Export", href: "#imports-exports", type: "slide", value: 6 },
    { name: "About us", href: "#about", type: "scroll" },
    { name: "Contact", href: "#contact", type: "scroll" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <img
          src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
          alt="Logo"
          style={styles.logoImg}
          onClick={() => (window.location.href = "#home")}
        />

        {isMobile && (
          <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
        )}

        {(!isMobile || menuOpen) && (
          <nav style={{ ...styles.nav, ...(isMobile ? styles.navOpen : {}) }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => {
                  setMenuOpen(false);
                  if (link.type === "slide") setActiveSlide(link.value);
                }}
                style={{
                  ...styles.navLink,
                  backgroundImage: "linear-gradient(red, red)",
                  backgroundSize: hoveredLink === link.name ? "100% 2px" : "0% 2px",
                  backgroundPosition: "left bottom",
                  backgroundRepeat: "no-repeat",
                  transition: "background-size 0.3s ease",
                  paddingBottom: "5px",
                  display: "inline-block"
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

// ... Rest of your components (Hero, SubHeader, etc.) remain exactly the same ...

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const images = [
    process.env.PUBLIC_URL + "/fishone.jpg",
    process.env.PUBLIC_URL + "/import.jpg",
    process.env.PUBLIC_URL + "/fishesfour.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      style={{
        ...styles.hero,
        ...(isMobile ? styles.heroMobile : {}),
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Trading"
          style={{
            ...styles.heroImg,
            ...(isMobile ? styles.heroImgMobile : {}),
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </section>
  );
};

const SubHeader = () => {
  return (
    <section style={styles.subHeader}>
      <div style={styles.subHeaderContent}>
        <h1>Fresh Seafood. Trusted Global Supply.</h1>
        <p>Premium Fish • Quality Prawns • Worldwide Export</p>
      </div>
    </section>
  );
};

const ImportExportSection = () => {
  const navigate = useNavigate();
  const handleImportClick = () => navigate("/imports-exports");
  const handleExportClick = () => navigate("/imports-exports");

  return (
    <section id="imports-exports" style={styles.importExportSection}>
      <h2 style={styles.sectionTitle}>Imports & Exports</h2>
      <div style={styles.gridContainer}>
        <div style={styles.importExportCard} onClick={handleImportClick}>
          <div style={styles.imageWrapper}>
            
            <img
  src={process.env.PUBLIC_URL + "/fishone.jpg"}
  style={styles.importExportImg}
  alt="Imports"
/>
          </div>
          <div style={styles.cardContent}>
            <h3>Imports</h3>
            <p>High-quality seafood and feed sourced globally.</p>
          </div>
        </div>

        <div style={styles.importExportCard} onClick={handleExportClick}>
          <div style={styles.imageWrapper}>
            <img
             src={process.env.PUBLIC_URL + "/fishone.jpg"}
              style={styles.importExportImg}
              alt="Exports"
            />
          </div>
          <div style={styles.cardContent}>
            <h3>Exports</h3>
            <p>Trusted export services delivering worldwide freshness.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" style={styles.aboutSection}>
      <h2 style={styles.sectionTitle}>About Us</h2>
      <p style={styles.aboutText}>
        UPIN Trading Corporation is a trusted name in imports and exports...specializing in high-quality seafood, aquaculture feed, and industrial
         solutions. We are committed to delivering premium products and reliable
         services to customers across the globe.
      </p>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" style={styles.contactSection}>
    <h2 style={styles.sectionTitle}>Contact Us</h2>

    <form style={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Your Name" style={styles.input} required />
      <input type="tel" placeholder="Mobile Number" style={styles.input} required />
      <textarea placeholder="Your Message" rows="4" style={styles.textarea}></textarea>

      <button type="submit" style={styles.submitBtn}>
        Submit
      </button>
    </form>

    <p style={{ marginTop: "15px", color: "#555" }}>
      We will contact you soon.
    </p>
  </section>
);


const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerTop}>
        <span>UPIN TRADING CORPORATION</span>
        <span>📍 Hyderabad, India</span>
        {/* <span>📧 upintrad@123.com</span>
        <span>📞 +91 93477 19244</span> */}
      </div>
      <p style={styles.footerBottom}>
        © 2026 UPIN Tradeing Corporation. All Rights Reserved.
      </p>
  </footer>
);


const styles = {
  app: { 
    fontFamily: "'Segoe UI', Roboto, sans-serif", 
    // Soft overall page gradient
    background: "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)", 
    paddingTop: "70px",
    minHeight: "100vh"
  },
  header: {
    // Glassmorphism effect for the header
    background: "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.95) 100%)",
    color: "#180e0e",
    padding: "12px 20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(5px)"
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoImg: { height: "50px", width: "170px", cursor: "pointer" },
  nav: { display: "flex", alignItems: "center", gap: "20px" },
  navLink: {
    color: "#1a365d",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer"
  },
  hamburger: { fontSize: "32px", cursor: "pointer", color: "#00b4d8" },
  navOpen: { 
    position: "absolute", top: "70px", left: 0, width: "100%", 
    background: "linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)", 
    flexDirection: "column", padding: "20px",
    boxShadow: "0 10px 15px rgba(0,0,0,0.1)"
  },
  hero: { height: "80vh", position: "relative", overflow: "hidden", backgroundColor: "#000" },
  heroMobile: { height: "30vh" },
  heroImg: { position: "absolute", width: "100%", height: "100%", objectFit: "cover", transition: "1s" },
  heroImgMobile: { objectFit: "contain" },
  subHeader: { 
    padding: "80px 20px", 
    textAlign: "center",
    // Transition from white to a very light "seafoam" blue
    background: "linear-gradient(180deg, #ffffff 0%, #e0f2f1 100%)",
    borderBottom: "1px solid #b2dfdb"
  },
  subHeaderContent: { maxWidth: "800px", margin: "0 auto" },
  importExportSection: { 
    padding: "70px 20px", 
    textAlign: "center",
    // Deepening the blue for the product section
    background: "linear-gradient(180deg, #e0f2f1 0%, #f0f7ff 50%, #ffffff 100%)"
  },
  sectionTitle: { 
    fontSize: "2.5rem", 
    marginBottom: "40px", 
    color: "#023e8a",
    textShadow: "1px 1px 2px rgba(0,0,0,0.05)" 
  },
  gridContainer: { display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" },
  importExportCard: { 
    width: "100%", maxWidth: "340px", borderRadius: "20px", 
    background: "linear-gradient(145deg, #ffffff, #f0f4f8)", 
    boxShadow: "10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff", 
    cursor: "pointer",
    overflow: "hidden"
  },
  imageWrapper: { height: "220px", overflow: "hidden" },
  importExportImg: { width: "100%", height: "100%", objectFit: "cover" },
  cardContent: { padding: "20px", textAlign: "center" },
  aboutSection: { 
    padding: "80px 20px", 
    textAlign: "center",
    // A warmer, sand-like light grey to differentiate the "About" story
    background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    color: "#2d3748"
  },
  aboutText: { maxWidth: "850px", margin: "15px auto", lineHeight: "1.8", fontSize: "1.1rem" },
  contactSection: { 
    padding: "80px 20px", 
    textAlign: "center",
    // Light "ice" blue to lead into the dark footer
    background: "linear-gradient(180deg, #ebedee 0%, #f1f5f9 100%)" 
  },
  contactForm: { 
    maxWidth: "550px", margin: "0 auto", display: "flex", 
    flexDirection: "column", gap: "20px", padding: "30px",
    background: "#ffffff", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
  },
  input: { padding: "14px", border: "1px solid #cbd5e0", borderRadius: "10px", background: "#f8fafc" },
  textarea: { padding: "14px", border: "1px solid #cbd5e0", borderRadius: "10px", background: "#f8fafc" },
  submitBtn: { 
    padding: "15px", 
    background: "linear-gradient(90deg, #00b4d8 0%, #0077b6 100%)", 
    color: "#fff", fontWeight: "bold", border: "none", borderRadius: "10px", 
    cursor: "pointer", transition: "transform 0.2s ease" 
  },

    footer: {
  background: "#0d1b2a",
  color: "#fff",
  padding: "10px 20px",   // 🔥 reduced height
  textAlign: "center",
  fontSize: "14px",
  marginTop: "16px",
},

footerTop: {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap", // responsive
  alignItems: "center",
},

footerBottom: {
  marginTop: "5px",
  fontSize: "12px",
  opacity: 0.8,
},
  
};

export default TradingHome;