import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Update this line below:

// --- NAVBAR COMPONENT ---
const Navbar = ({ setActiveSlide, setPath }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

const navItems = [
    { label: "Home", target: "home" },
    { label: "Import", target: "imports-exports" }, 
    { label: "Export", target: "imports-exports" }, 
    { label: "About us", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const handleNavClick = (target, slideIndex = null, breadcrumb = null) => {
  setMenuOpen(false);

  if (slideIndex !== null) {
    // Navigate to Imports/Exports page with state
    navigate("/imports-exports", { state: { slideIndex, breadcrumb } });
  } else {
    // Navigate to homepage with scroll target
    navigate("/", { state: { scrollTo: target } });
  }
};
  const [hoveredIndex, setHoveredIndex] = useState(null);



  return (
    <header style={navStyles.header}>
      <div style={navStyles.headerInner}>
        {/* <img
          src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
          alt="Logo"
          style={navStyles.logoImg}
          onClick={() => navigate("/")}
        /> */}

        <img
  src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
  alt="Logo"
  style={{
    ...navStyles.logoImg,
    // On mobile, use 0px or a small positive value to move it right
    // On desktop, keep your -110px
    marginLeft: isMobile ? "-8px" : "-110px", 
  }}
  onClick={() => navigate("/")}
/>

        {isMobile && (
          <div style={navStyles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
        )}

        {(!isMobile || menuOpen) && (
          <nav style={{ ...navStyles.nav, ...(isMobile ? navStyles.navOpen : {}) }}>
            {navItems.map((item, index) => (

              
              // <a
              //   key={item.label}
              //   onClick={() => handleNavClick(item.target, item.slide, item.path)}
              //   onMouseEnter={() => setHoveredIndex(index)}
              //   onMouseLeave={() => setHoveredIndex(null)}
              //   style={{
              //     ...navStyles.navLink,
              //     // The underline effect using linear-gradient background
              //     backgroundImage: "linear-gradient(red, red)",
              //     backgroundSize: hoveredIndex === index ? "100% 2px" : "0% 2px",
              //     backgroundPosition: "left bottom",
              //     backgroundRepeat: "no-repeat",
              //     transition: "background-size 0.3s ease",
              //     paddingBottom: "4px"
              //   }}
              // >
              //   {item.label}
              // </a>

<button
  key={item.label}
  onClick={() => handleNavClick(item.target, item.slide, item.path)}
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    ...navStyles.navLink,
    backgroundImage: "linear-gradient(red, red)",
    backgroundSize: hoveredIndex === index ? "100% 2px" : "0% 2px",
    backgroundPosition: "left bottom",
    backgroundRepeat: "no-repeat",
    transition: "background-size 0.3s ease",
    paddingBottom: "4px",
    border: "none",              // ✅ important
    backgroundColor: "transparent", // ✅ important
    cursor: "pointer"
  }}
>
  {item.label}
</button>


            ))}
          </nav>
        )}
      </div>
    </header>
  );
};


const ImportsExportsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [path, setPath] = useState(["Imports & Exports"]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);

  const location = useLocation();

  // 1. Listen for navigation state changes
  useEffect(() => {
    if (location.state) {
      const { slideIndex, breadcrumb } = location.state;
      if (slideIndex !== undefined) setActiveSlide(slideIndex);
      if (breadcrumb) setPath(breadcrumb);
    }
  }, [location]);

  // 2. Handle Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBreadcrumbClick = (index) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
    if (newPath.length === 1) setActiveSlide(0);
    if (newPath.length === 2) {
      if (newPath[0] === "Imports") setActiveSlide(1);
      if (newPath[0] === "Exports") setActiveSlide(6);
    }
  };

  // UPDATED: Slide logic to allow vertical expansion
  const getSlideStyle = (index) => {
    const isActive = activeSlide === index;
    return {
      ...localStyles.slide,
      display: isActive ? "block" : "none", // Hide inactive to prevent overlap
      position: "relative", // Changed from absolute to keep document flow
      opacity: isActive ? 1 : 0,
      transform: isActive ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      width: "100%",
    };
  };

  const commonImg = process.env.PUBLIC_URL + "/fishone.jpg";
  const images = {
    feed: process.env.PUBLIC_URL + "/feedone.jpeg",
    hcp: process.env.PUBLIC_URL + "/hcp.jpeg",
    fishfeed: process.env.PUBLIC_URL + "/fishfeeds.png",
    prawnfeed: process.env.PUBLIC_URL + "/prawnfeed.jpg",
  };

  
const renderCard = (title, description, onClickAction, imgOverride = null) => {
  const isHovered = hoveredCard === title;
  const cardImg = imgOverride || commonImg;

  return (
    <div
      key={title}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClickAction}
      style={{
        ...localStyles.importExportCard,
        flexDirection: isMobile ? "column" : "row", 
        minHeight: isMobile ? "350px" : "180px",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isHovered ? "0 12px 30px rgba(0,0,0,0.15)" : localStyles.importExportCard.boxShadow,
        borderColor: isHovered ? "#00b4d8" : "#f0f0f0",
        position: "relative", // Ensure the arrow can be positioned absolutely
      }}
    >
      {/* ... Image and Content Divs stay exactly the same ... */}
      <div style={{
        ...localStyles.imageWrapper,
        width: isMobile ? "100%" : "250px",
        height: isMobile ? "200px" : "180px",
      }}>
        <img src={cardImg} style={{...localStyles.importExportImg, transform: isHovered ? "scale(1.1)" : "scale(1)"}} alt={title} />
      </div>
      
      <div style={{
        ...localStyles.cardContent,
        textAlign: isMobile ? "center" : "left",
        padding: isMobile ? "20px" : "30px",
        paddingBottom: isMobile ? "40px" : "30px", // Add space for the arrow on mobile
      }}>
        <h3 style={{ margin: 0, color: "#0d1b2a", fontSize: isMobile ? "18px" : "22px" }}>{title}</h3>
        {description && <p style={{...localStyles.cardText, fontSize: isMobile ? "14px" : "16px"}}>{description}</p>}
      </div>

      {/* UPDATED ARROW LOGIC: Condition removed so it shows on mobile */}
      <div style={{
        position: "absolute",
        bottom: isMobile ? "10px" : "15px", // Slightly closer to bottom on mobile
        right: isMobile ? "50%" : "20px",    // Center it on mobile, keep right on desktop
        transform: isMobile ? "translateX(50%)" : "none", // Perfect centering for mobile
        fontSize: "24px",
        color: "#00b4d8",
        opacity: (isHovered || isMobile) ? 1 : 0.5, // Always visible on mobile for better UX
        transition: "all 0.3s",
        pointerEvents: "none",
      }}>
        &#8594;
      </div>
    </div>
  );
};


  return (
    <div style={localStyles.app}>
      <Navbar setActiveSlide={setActiveSlide} setPath={setPath} />

      <section id="imports-exports" style={localStyles.importExportSection}>
        <h2 style={localStyles.sectionTitle}>
          {path.map((item, index) => (
            <span
              key={index}
              style={{ cursor: "pointer", color: index === path.length - 1 ? "#00b4d8" : "#0d1b2a" }}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {item} {index < path.length - 1 && " / "}
            </span>
          ))}
        </h2>

        {/* sliderWrapper is now a simple container that grows with its children */}
        <div style={localStyles.sliderWrapper}>
          
          <div style={getSlideStyle(0)}>
            {renderCard("Imports", "Global aquaculture sourcing and supply chain excellence.", () => { setActiveSlide(1); setPath(["Imports"]); })}
            {renderCard("Exports", "Worldwide fresh delivery with certified quality standards.", () => { setActiveSlide(6); setPath(["Exports"]); })}
          </div>

          <div style={getSlideStyle(1)}>
            {renderCard("Feed", "High-quality nutritional solutions for aquatic growth.", () => { setActiveSlide(2); setPath(["Imports", "Feed"]); }, images.feed)}
            {renderCard("HCP", "Specialized Healthcare & Processing products.", () => { setActiveSlide(3); setPath(["Imports", "HCP"]); }, images.hcp)}
          </div>

          <div style={getSlideStyle(2)}>
            {renderCard("Prawn Feed", "Optimized nutrition for various prawn species.", () => { setActiveSlide(7); setPath(["Imports", "Feed", "Prawn Feed"]); }, images.prawnfeed)}
            {renderCard("Fish Feed", "Premium floating and sinking feed for fish farms.", () => { setActiveSlide(5); setPath(["Imports", "Feed", "Fish Feed"]); }, images.fishfeed)}
          </div>

          <div style={getSlideStyle(7)}>
            {["Nursery Feed", "Grower Feed", "Vannamei Feed", "Tiger Feed"].map((type) => 
              renderCard(type, `Specially formulated ${type} for maximum yield.`, () => {
                if (type === "Vannamei Feed") { setActiveSlide(8); setPath(["Imports", "Feed", "Prawn Feed", "Vannamei Feed"]); }
                else if (type === "Tiger Feed") { setActiveSlide(9); setPath(["Imports", "Feed", "Prawn Feed", "Tiger Feed"]); }
                else { setPath(["Imports", "Feed", "Prawn Feed", type]); }
              })
            )}
          </div>

          <div style={getSlideStyle(8)}>
            {["UNIVANA-P", "UNIVANA"].map(prod => renderCard(prod, "Premium Vannamei Choice for professional farmers.", null))}
          </div>
          
          <div style={getSlideStyle(9)}>
            {renderCard("LA ONE", "The industry standard for Tiger Prawn growth and health.", null)}
          </div>

          <div style={getSlideStyle(3)}>
            {/* Removed the internal scroll here so the whole PAGE scrolls instead */}
            {["OXY-BESTOT", "GUTPRO", "ENGRO", "UNI-LIGHT", "NURI BSL", "ZEOLITE", "SAPONIN", "HC-BIO", "LIFE-HC", "PREMIX-SUPER C", "MAX C", "YUCA HONG", "DE-NO2", "GOLD-DINE", "UNI-BKC", "DEHP"].map((item) => 
              renderCard(item, "Essential aquaculture healthcare solution.", null)
            )}
          </div>

          <div style={getSlideStyle(5)}>
            {renderCard("Marian Feed", "High-protein formula for Marian species.", () => setPath(["Imports", "Feed", "Fish Feed", "Marian Feed"]))}
            {renderCard("Fresh Water Fish Feed", "Balanced diet for diverse freshwater environments.", () => setPath(["Imports", "Feed", "Fish Feed", "Fresh Water Fish Feed"]))}
          </div>

          <div style={getSlideStyle(6)}>
            {["Shrimp", "Minerals", "Chemicals"].map((item) => 
              renderCard(item, `Top-grade ${item} processed for international export.`, () => setPath(["Exports", item]))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
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

// --- STYLES ---
const navStyles = {
  header: {
    // background: "#ffffff",
    background: "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.95) 100%)",
    color: "#180e0e",
    padding: "12px 20px",
    marginLeft: "-8px",
    position: "fixed",
    width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    top: 0,
    zIndex: 100,
    boxSizing: "border-box",
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoImg: {
    height: "50px",
    width: "185px",
    objectFit: "contain",
    cursor: "pointer",
    // marginLeft: "-110px",
    marginLeft: window.innerWidth <= 768 ? "10px" : "-110px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "-36px",
  },
  navLink: {
    margin: "10px 0",
    color: "black",
    textDecoration: "none",
    // color: "#1a365d",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    display: "inline-block", // Required for background sizing to work well
  },
  hamburger: {
    fontSize: "32px",
    cursor: "pointer",
    userSelect: "none",
    zIndex: 9999,
  },
  navOpen: {
    position: "absolute",
    top: "70px",
    left: 0,
    width: "100%",
    background: "#fff",
    flexDirection: "column",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

const styles = {
  footer: {
    background: "#0d1b2a",
    color: "#fff",
    padding: "10px 20px",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "16px",
  },
  footerTop: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  footerBottom: {
    marginTop: "5px",
    fontSize: "12px",
    opacity: 0.8,
  },
};


const localStyles = {
  app: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(180deg, #e0f2f1 0%, #f0f7ff 100%)",
    paddingTop: "70px",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  importExportSection: {
    padding: "60px 20px",
    textAlign: "center",
    minHeight: "calc(100vh - 150px)", // Ensures content takes up screen space
  },
  sectionTitle: {
    fontSize: "36px",
    marginBottom: "50px",
    color: "#0d1b2a",
    fontWeight: "bold",
  },
  sliderWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    // No fixed height or absolute positioning here
  },
  slide: {
    width: "100%",
  },
  importExportCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    cursor: "pointer",
    marginBottom: "30px",
    border: "2px solid #f0f0f0",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.4s ease",
  },
  imageWrapper: {
    width: "250px",
    height: "180px",
    flexShrink: 0,
  },
  importExportImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  cardContent: {
    padding: "30px",
    textAlign: "left",
    flex: 1,
  },
  cardText: {
    fontSize: "16px",
    color: "#4a5568",
    lineHeight: "1.6",
    margin: "10px 0 0 0",
  },
};

export default ImportsExportsPage;

