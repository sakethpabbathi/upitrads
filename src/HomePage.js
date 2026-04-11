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
  const navigate = useNavigate(); 
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
  { name: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { 
    name: "Import", 
    action: () => document.getElementById("imports-exports")?.scrollIntoView({ behavior: "smooth" }) 
  },
  { 
    name: "Export", 
    action: () => document.getElementById("imports-exports")?.scrollIntoView({ behavior: "smooth" }) 
  },
  { 
    name: "About us", 
    action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) 
  },
  { 
    name: "Contact", 
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) 
  },
];

  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>

<img
  src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
  alt="Logo"
  style={{
    ...styles.logoImg,
    // If mobile, move it 15px from the left edge. 
    // If desktop, keep your original -120px.
    marginLeft: isMobile ? "-45px" : "-70px", 
  }}
  // onClick={() => (window.location.href = "#")}
  onClick={() => navigate("/")}
/>

        {isMobile && (
          <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
        )}

        {(!isMobile || menuOpen) && (
          <nav style={{ ...styles.nav, ...(isMobile ? styles.navOpen : {}) }}>



            {navLinks.map((link) => (
              


  <button
  key={link.name}
  onMouseEnter={() => setHoveredLink(link.name)}
  onMouseLeave={() => setHoveredLink(null)}
  onClick={() => {
    setMenuOpen(false);
    link.action();
  }}
  style={{
    ...styles.navLink,
    backgroundImage: "linear-gradient(red, red)",
    backgroundSize: hoveredLink === link.name ? "100% 2px" : "0% 2px",
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    transition: "background-size 0.3s ease",
    paddingBottom: "5px",
    display: "inline-block",
    cursor: "pointer",
    border: "none",              // ✅ remove button border
    backgroundColor: "transparent" // ✅ make it look like text
  }}
>
  {link.name}
</button>


))}
          </nav>
        )}
      </div>
    </header>
  );
};



// const SubHeader = () => {
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <section style={styles.subHeader}>
//       <div style={{
//         ...styles.subHeaderInner,
//         flexDirection: isMobile ? "column" : "row"
//       }}>
//         {/* Left Image */}
//         {!isMobile && (
//           <img 
//             src={process.env.PUBLIC_URL + "/sunsetfishing.jpg"} 
//             alt="Seafood Left" 
//             style={styles.subHeaderSideImg} 
//           />
//         )}

//         <div style={styles.subHeaderContent}>
//           <h1 style={styles.subHeaderTitle}>
//             Trusted Global Supply<br />Fresh Seafood
//           </h1>
//           <p style={styles.subHeaderSubtitle}>
//             Premium Fish • Quality Prawns • Worldwide Export
//           </p>
//         </div>

//         {/* Right Image */}
//         <img 
//           src={process.env.PUBLIC_URL + "/sunsetfishing.jpg"} 
//           alt="Seafood Right" 
//           style={{
//             ...styles.subHeaderSideImg,
//             marginTop: isMobile ? "20px" : "0"
//           }} 
//         />
//       </div>
//     </section>
//   );
// };


const SubHeader = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <section style={styles.subHeader}>
      <div style={styles.subHeaderInner}>
        {/* Centered Hero Image */}
        <img 
          src={process.env.PUBLIC_URL + "/busyshipport.png"} 
          alt="Seafood Hero" 
          style={{
            ...styles.subHeaderSideImg,
            width: isMobile ? "90%" : "800px", // Larger width for the center image
            height: isMobile ? "250px" : "450px", // Adjusted height for impact
            margin: "0 auto",
            display: "block"
          }} 
        />
      </div>
    </section>
  );
};


const ImportExportSection = () => {
  const navigate = useNavigate();

  const handleImportClick = () =>
    navigate("/imports-exports", {
      state: { slideIndex: 1, breadcrumb: ["Imports"] }
    });

  const handleExportClick = () =>
    navigate("/imports-exports", {
      state: { slideIndex: 6, breadcrumb: ["Exports"] }
    });

  return (
    <section id="imports-exports" style={styles.importExportSection}>
      <h2 style={styles.sectionTitle}>Imports & Exports</h2>
      <div style={styles.gridContainer}>
        
        {/* Transparent Import Card */}
        <div 
          style={{ ...styles.importExportCard, ...styles.transparentCard }} 
          onClick={handleImportClick}
        >
          <div style={styles.imageWrapper}>
            <img
              src={process.env.PUBLIC_URL + "/importimg.webp"}
              style={styles.importExportImg}
              alt="Imports"
            />
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Imports</h3>
            <p style={styles.cardText}>High-quality seafood and feed sourced globally.</p>
          </div>
        </div>

        {/* Transparent Export Card */}
        <div 
          style={{ ...styles.importExportCard, ...styles.transparentCard }} 
          onClick={handleExportClick}
        >
          <div style={styles.imageWrapper}>
            <img
              src={process.env.PUBLIC_URL + "/exportimg.png"}
              style={styles.importExportImg}
              alt="Exports"
            />
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Exports</h3>
            <p style={styles.cardText}>Trusted export services delivering worldwide freshness.</p>
          </div>
        </div>

      </div>
    </section>
  );
};


const AboutSection = () => {
  return (
    <section id="about" style={styles.aboutSection}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>About Us</h2>
        
        {/* Core Company Profile */}
        <div style={styles.textBlock}>
          <p style={styles.paragraph}>
            UPIN Trading Corporation is a professionally managed trading organization engaged in the import, export, and supply of high-quality aqua feed, seafood products, minerals, and chemicals. With a strong commitment to quality, traceability, and customer satisfaction, we operate across multiple sectors while maintaining rigorous standards at every stage of our operations.
          </p>
          <p style={styles.paragraph}>
            We specialize in the import and trading of premium aqua feed from UNI-President Vietnam, a globally recognized brand known for its quality and performance in aquaculture nutrition. Our focus is to support farmers with reliable, nutritionally balanced feed solutions that enhance productivity, sustainability, and long-term farm success.
          </p>
          <p style={styles.paragraph}>
            In addition to aqua feed trading, UPIN Trading Corporation is actively involved in the export of premium-quality seafood products. We handle a wide range of seafood products, ensuring that each consignment meets stringent quality checks and international standards. Our export operations emphasize freshness, safety, and traceability, enabling us to deliver superior seafood products to customers across global markets.
          </p>
        </div>

        {/* Quality & Support Section */}
        <div style={styles.textBlock}>
          <h3 style={styles.subHeading}>Quality, Traceability, and Farmer Support</h3>
          <p style={styles.paragraph}>
            Quality is the foundation of everything we do. We have established a robust end-to-end traceability system, allowing us to monitor and track every stage of the farming and supply process. Our dedicated field team maintains daily follow-ups with farms, ensuring consistent monitoring, data collection, and quality assessment at every step.
          </p>
          <p style={styles.paragraph}>
            Our employees work closely with farmers on a daily basis, offering practical guidance, technical suggestions, and continuous support to improve farming practices, optimize feed usage, and maintain healthy production environments. This hands-on approach enables us to ensure consistent product quality while building long-term partnerships with the farming community.
          </p>
        </div>

        {/* Minerals & Chemicals Section */}
        <div style={styles.textBlock}>
          <h3 style={styles.subHeading}>Minerals and Chemicals Export</h3>
          <p style={styles.paragraph}>
            UPIN Trading Corporation is also expanding its global footprint in the export of high-quality minerals and chemicals. We supply carefully sourced and tested materials that meet industry-specific requirements and quality standards. Our focus is on providing reliable, consistent, and compliant products suitable for various industrial and commercial applications.
          </p>
          <p style={styles.paragraph}>
            We are committed to positioning ourselves as a trusted and leading supplier of minerals and chemicals, with a strong emphasis on quality assurance, ethical sourcing, and dependable logistics.
          </p>
        </div>

        {/* Mission & Vision Row */}
        <div style={styles.mvContainer}>
          <div style={styles.mvCard}>
            <h3 style={styles.cardTitle}>Our Mission</h3>
            <p style={styles.cardText}>
              To become a reliable and quality-focused aqua feed supplier for farmers, deliver premium seafood products to global customers, and establish us as a leading exporter of high-quality minerals and chemicals, while maintaining transparency, traceability, and ethical business practices.
            </p>
          </div>
          <div style={styles.mvCard}>
            <h3 style={styles.cardTitle}>Our Vision</h3>
            <ul style={styles.cardList}>
              <li>To be recognized as a trusted partner to farmers by supplying superior-quality aqua feed and continuous technical support.</li>
              <li>To deliver world-class seafood products that meet international quality and safety standards.</li>
              <li>To become one of the largest and most dependable suppliers of minerals and chemicals in the global market.</li>
            </ul>
          </div>
        </div>

        {/* Key Highlights */}
        <div style={styles.highlightsBox}>
          <h3 style={styles.highlightsTitle}>Why Choose UPIN Trading Corporation</h3>
          <ul style={styles.checkList}>
            <li>Strong association with reputed international suppliers such as UNI-President Vietnam</li>
            <li>End-to-end quality control and traceability systems</li>
            <li>Dedicated field teams with daily farm monitoring and follow-up</li>
            <li>Commitment to premium quality, compliance, and ethical trading</li>
            <li>Multi-sector expertise in aqua feed, seafood, minerals, and chemicals</li>
          </ul>
        </div>

        {/* Closing Quote */}
        <div style={styles.closingBlock}>
          <p>
            At UPIN Trading Corporation, we believe that sustainable growth is built on quality, trust, technical expertise, and long-term relationships. Our integrated approach and commitment to excellence enable us to deliver value across the aquaculture, seafood, and industrial trading sectors.
          </p>
        </div>
      </div>
    </section>
  );
};


const ContactSection = () => {

  const [mobileError, setMobileError] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const mobile = e.target[1].value;
    const message = e.target[2].value;

    // ✅ Mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    } else {
      setMobileError("");
    }

    const finalMessage = message.trim() ? message : "General enquiry";

    const text = `Enquiry:\nName: ${name}\nMobile: ${mobile}\nMessage: ${finalMessage}`;

    const whatsappNumber = "919347719244";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    // ✅ Clear form
    e.target.reset();

    // ✅ Show success popup
    setSuccessMsg(true);

    // ✅ Auto hide after 3 sec
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    e.target.value = value;

    if (value.length === 10 && /^[6-9]\d{9}$/.test(value)) {
      setMobileError("");
    } else {
      setMobileError("Enter a valid 10-digit mobile number");
    }
  };

  return (
    <section id="contact" style={styles.contactSection}>
      <h2 style={styles.sectionTitle}>Contact Us</h2>

      {/* ✅ Success Popup */}
      {successMsg && (
        <div style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "12px",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          ✅ Message sent successfully!
        </div>
      )}

      <form style={styles.contactForm} onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Your Name"
          style={styles.input}
          required
        />

        <input
          type="tel"
          placeholder="Enter 10-digit Mobile Number"
          style={{
            ...styles.input,
            border: mobileError ? "2px solid red" : "1px solid #ccc"
          }}
          required
          onInput={handleMobileChange}
        />

        {mobileError && (
          <span style={{ color: "red", fontSize: "13px", marginTop: "-10px" }}>
            {mobileError}
          </span>
        )}

        <textarea
          placeholder="Your Message (Optional)"
          rows="4"
          style={styles.textarea}
        ></textarea>

        <button type="submit" style={styles.submitBtn}>
          Submit
        </button>
      </form>

      <p style={{ marginTop: "15px", color: "#555" }}>
        We will contact you soon.
      </p>
    </section>
  );
};


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
  // Global Layout & Background
  app: { 
    fontFamily: "'Segoe UI', Roboto, sans-serif", 
    backgroundImage: `url(${process.env.PUBLIC_URL + "/waterbg.jpeg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", 
    backgroundRepeat: "no-repeat",
    paddingTop: "70px",
    minHeight: "100vh"
  },

  // Header & Navigation
  header: {
    background: "white", 
    color: "#180e0e",
    padding: "12px 20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoImg: {
    height: "50px",
    width: "170px",
    cursor: "pointer",
    objectFit: "contain",
  },
  nav: { display: "flex", alignItems: "center", gap: "20px" },
  navLink: {
    color: "#023e8a",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    background: "none",
    border: "none"
  },
  hamburger: { fontSize: "32px", cursor: "pointer", color: "#0077b6","marginRight": "20px" },
  navOpen: { 
    position: "absolute", 
    top: "70px", 
    left: 0, 
    width: "100%", 
    background: "rgba(255, 255, 255, 0.95)", 
    flexDirection: "column", 
    padding: "20px",
    boxShadow: "0 10px 15px rgba(0,0,0,0.1)"
  },

  // Hero / SubHeader
  subHeader: { 
    padding: "80px 20px", 
    background: "rgba(255, 255, 255, 0.3)", 
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  subHeaderInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    gap: "40px",
    width: "100%"
  },
  subHeaderTitle: {
    fontSize: "2.5rem",
    color: "#023e8a",
    margin: "0 0 10px 0",
    lineHeight: "1.2"
  },
  subHeaderSubtitle: {
    fontSize: "1.2rem",
    color: "#023e8a",
    fontWeight: "600",
    letterSpacing: "1px"
  },
  subHeaderSideImg: {
    width: "220px",
    height: "160px",
    borderRadius: "15px",
    objectFit: "cover",
    // boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    // border: "4px solid #fff"
  },

  // Import / Export Section & Small Cards
  importExportSection: { 
    padding: "80px 20px", 
    textAlign: "center",
    background: "rgba(240, 249, 255, 0.5)", 
  },
  gridContainer: { 
    display: "flex", 
    justifyContent: "center", 
    gap: "35px", 
    flexWrap: "wrap" 
  },
  importExportCard: { 
    width: "100%", 
    maxWidth: "300px",          // Smaller Width
    borderRadius: "24px", 
    background: "rgba(255, 255, 255, 0.9)", 
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)", 
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    border: "1px solid rgba(255,255,255,0.3)"
  },
  transparentCard: {
    background: "rgba(255, 255, 255, 0.2)", 
    backdropFilter: "blur(10px)",            
    WebkitBackdropFilter: "blur(10px)",      
    border: "1px solid rgba(255, 255, 255, 0.4)",
  },
  imageWrapper: { height: "180px", overflow: "hidden" }, // Smaller Image
  importExportImg: { width: "100%", height: "100%", objectFit: "cover" },
  cardContent: { padding: "15px 20px", textAlign: "center" }, // Less Padding

  // Enhanced About Section
  aboutSection: { 
    padding: "100px 20px", 
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.7)", 
    color: "#001233"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto"
  },
  sectionTitle: { 
    fontSize: "3rem", 
    marginBottom: "50px", 
    color: "#001233",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  textBlock: {
    textAlign: "left",
    marginBottom: "45px"
  },
  subHeading: {
    fontSize: "1.9rem",
    marginBottom: "20px",
    color: "#001233",
    borderLeft: "5px solid #001233",
    paddingLeft: "15px"
  },
  paragraph: {
    fontSize: "1.15rem",
    lineHeight: "1.8",
    marginBottom: "15px",
    fontWeight: "500"
  },
  mvContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    margin: "60px 0"
  },
  mvCard: {
    flex: "1 1 450px",
    padding: "40px",
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "15px",
    textAlign: "left",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
  },
  cardTitle: {
    fontSize: "1.7rem",
    color: "#001233",
    marginBottom: "20px",
    fontWeight: "bold"
  },
  cardText: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#001233",
    fontWeight: "500"
  },
  cardList: {
    paddingLeft: "20px",
    lineHeight: "1.7",
    fontSize: "1.1rem"
  },
  highlightsBox: {
    background: "#001233",
    color: "#ffffff",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "left"
  },
  highlightsTitle: {
    fontSize: "2rem",
    marginBottom: "30px"
  },
  checkList: {
    fontSize: "1.2rem",
    lineHeight: "2.2",
    listStyleType: "square",
    paddingLeft: "25px"
  },
  closingBlock: {
    marginTop: "60px",
    fontSize: "1.4rem",
    lineHeight: "1.9",
    fontStyle: "italic",
    fontWeight: "600",
    color: "#001233",
    borderTop: "1px solid rgba(0, 18, 51, 0.1)",
    paddingTop: "40px"
  },

  // Contact Section
  contactSection: { 
    padding: "100px 20px", 
    textAlign: "center",
    background: "rgba(235, 245, 255, 0.6)" 
  },
  contactForm: { 
    maxWidth: "550px", 
    margin: "0 auto", 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px", 
    padding: "40px",
    background: "rgba(255, 255, 255, 0.95)", 
    borderRadius: "20px", 
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  },
  input: { 
    padding: "15px", 
    border: "1px solid #d1d9e6", 
    borderRadius: "12px", 
    background: "#fff",
    fontSize: "16px"
  },
  textarea: { 
    padding: "15px", 
    border: "1px solid #d1d9e6", 
    borderRadius: "12px", 
    background: "#fff",
    fontSize: "16px"
  },
  submitBtn: { 
    padding: "16px", 
    background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)", 
    color: "#fff", 
    fontWeight: "bold", 
    border: "none", 
    borderRadius: "12px", 
    cursor: "pointer", 
    fontSize: "17px",
    transition: "all 0.3s ease"
  },

  // Footer
  footer: {
    background: "rgba(13, 27, 42, 0.95)", 
    color: "#fff",
    padding: "25px 20px",
    textAlign: "center",
    fontSize: "14px",
    backdropFilter: "blur(5px)"
  },
  footerTop: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "10px"
  },
  footerBottom: {
    fontSize: "12px",
    opacity: 0.7,
  },
};


export default TradingHome;