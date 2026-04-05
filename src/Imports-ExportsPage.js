import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

// --- NAVBAR COMPONENT ---
const Navbar = ({ setActiveSlide, setPath }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (target, slideIndex = null, breadcrumb = null) => {
    setMenuOpen(false);

    if (window.location.pathname === "/imports-exports" && slideIndex !== null) {
      setActiveSlide(slideIndex);
      if (breadcrumb) setPath(breadcrumb);
      return;
    }

    if (slideIndex !== null) {
      navigate("/imports-exports");
      setTimeout(() => {
        if (setActiveSlide) setActiveSlide(slideIndex);
        if (breadcrumb && setPath) setPath(breadcrumb);
      }, 100);
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Helper to handle the hover state for inline styles
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { label: "Home", target: "home" },
    { label: "Import", target: "imports-exports", slide: 1, path: ["Imports"] },
    { label: "Export", target: "imports-exports", slide: 6, path: ["Exports"] },
    { label: "About us", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <header style={navStyles.header}>
      <div style={navStyles.headerInner}>
        <img
          src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
          alt="Logo"
          style={navStyles.logoImg}
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
              <a
                key={item.label}
                onClick={() => handleNavClick(item.target, item.slide, item.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  ...navStyles.navLink,
                  // The underline effect using linear-gradient background
                  backgroundImage: "linear-gradient(red, red)",
                  backgroundSize: hoveredIndex === index ? "100% 2px" : "0% 2px",
                  backgroundPosition: "left bottom",
                  backgroundRepeat: "no-repeat",
                  transition: "background-size 0.3s ease",
                  paddingBottom: "4px"
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

// --- MAIN PAGE COMPONENT ---
const ImportsExportsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [path, setPath] = useState(["Imports & Exports"]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const getSlideStyle = (index) => {
    const isActive = activeSlide === index;
    if (isMobile) {
      return {
        ...localStyles.slide,
        position: isActive ? "relative" : "absolute",
        display: isActive ? "flex" : "none",
        opacity: isActive ? 1 : 0,
        transform: "none",
      };
    }
    return {
      ...localStyles.slide,
      transform: `translateX(${(index - activeSlide) * 100}%)`,
      opacity: isActive ? 1 : 0,
      zIndex: isActive ? 2 : 1,
    };
  };

  const commonImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75hzrt-cwrOqmIMGXWOP3aNi4RQSfHgesVA&s";

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

        <div style={{ ...localStyles.sliderWrapper, minHeight: isMobile ? "auto" : "450px" }}>
          {/* SLIDE 0 */}
          <div style={getSlideStyle(0)}>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(1); setPath(["Imports"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} style={localStyles.importExportImg} alt="Imports" /></div>
              <div style={localStyles.cardContent}><h3>Imports</h3><p>Global aquaculture sourcing.</p></div>
            </div>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(6); setPath(["Exports"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} style={localStyles.importExportImg} alt="Exports" /></div>
              <div style={localStyles.cardContent}><h3>Exports</h3><p>Worldwide fresh delivery.</p></div>
            </div>
          </div>

          {/* SLIDE 1 */}
          <div style={getSlideStyle(1)}>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(2); setPath(["Imports", "Feed"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} style={localStyles.importExportImg} alt="Feed" /></div>
              <div style={localStyles.cardContent}><h3>Feed</h3><p>Nutritional solutions.</p></div>
            </div>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(3); setPath(["Imports", "HCP"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} style={localStyles.importExportImg} alt="HCP" /></div>
              <div style={localStyles.cardContent}><h3>HCP</h3><p>Healthcare & Processing.</p></div>
            </div>
          </div>
          
          <div style={getSlideStyle(2)}>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(7); setPath(["Imports", "Feed", "Prawn Feed"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} alt="Prawn" style={localStyles.importExportImg} /></div>
              <div style={localStyles.cardContent}><h3>Prawn Feed</h3></div>
            </div>
            <div style={localStyles.importExportCard} onClick={() => { setActiveSlide(5); setPath(["Imports", "Feed", "Fish Feed"]); }}>
              <div style={localStyles.imageWrapper}><img src={commonImg} alt="Fish" style={localStyles.importExportImg} /></div>
              <div style={localStyles.cardContent}><h3>Fish Feed</h3></div>
            </div>
          </div>

          <div style={getSlideStyle(7)}>
            {["Nursery Feed", "Grower Feed", "Vannamei Feed", "Tiger Feed"].map((type) => (
              <div key={type} style={localStyles.importExportCard} onClick={() => {
                if (type === "Vannamei Feed") { 
                  setActiveSlide(8); 
                  setPath(["Imports", "Feed", "Prawn Feed", "Vannamei Feed"]); 
                } else if (type === "Tiger Feed") { 
                  setActiveSlide(9); 
                  setPath(["Imports", "Feed", "Prawn Feed", "Tiger Feed"]); 
                } else { setPath(["Imports", "Feed", "Prawn Feed", type]); }
              }}>
                <div style={localStyles.imageWrapper}><img src={commonImg} alt={type} style={localStyles.importExportImg} /></div>
                <div style={localStyles.cardContent}><h3>{type}</h3></div>
              </div>
            ))}
          </div>

          <div style={getSlideStyle(8)}>
            {["UNIVANA-P", "UNIVANA"].map((prod) => (
              <div key={prod} style={localStyles.importExportCard}>
                <div style={localStyles.imageWrapper}><img src={commonImg} alt={prod} style={localStyles.importExportImg} /></div>
                <div style={localStyles.cardContent}><h3>{prod}</h3><p>Premium Vannamei Choice.</p></div>
              </div>
            ))}
          </div>

          <div style={getSlideStyle(9)}>
            <div style={localStyles.importExportCard}>
              <div style={localStyles.imageWrapper}><img src={commonImg} alt="LA ONE" style={localStyles.importExportImg} /></div>
              <div style={localStyles.cardContent}><h3>LA ONE</h3><p>Standard for Tiger Prawn growth.</p></div>
            </div>
          </div>

          <div style={{ ...getSlideStyle(3), maxHeight: isMobile ? "none" : "70vh", overflowY: isMobile ? "visible" : "auto" }}>
            {["OXY-BESTOT", "GUTPRO", "ENGRO", "UNI-LIGHT", "NURI BSL", "ZEOLITE", "SAPONIN", "HC-BIO", "LIFE-HC", "PREMIX-SUPER C", "MAX C", "YUCA HONG", "DE-NO2", "GOLD-DINE", "UNI-BKC", "DEHP"].map((item) => (
              <div key={item} style={{...localStyles.importExportCard, margin: "10px"}}>
                <div style={localStyles.imageWrapper}><img src={commonImg} alt={item} style={localStyles.importExportImg} /></div>
                <div style={localStyles.cardContent}><h3>{item}</h3></div>
              </div>
            ))}
          </div>

          <div style={getSlideStyle(5)}>
             <div style={localStyles.importExportCard} onClick={() => setPath(["Imports", "Feed", "Fish Feed", "Marian Feed"])}>
              <div style={localStyles.imageWrapper}><img src={commonImg} alt="Marian" style={localStyles.importExportImg} /></div>
              <div style={localStyles.cardContent}><h3>Marian Feed</h3></div>
            </div>
            <div style={localStyles.importExportCard} onClick={() => setPath(["Imports", "Feed", "Fish Feed", "Fresh Water Fish Feed"])}>
              <div style={localStyles.imageWrapper}><img src={commonImg} alt="Freshwater" style={localStyles.importExportImg} /></div>
              <div style={localStyles.cardContent}><h3>Fresh Water Fish Feed</h3></div>
            </div>
          </div>

          <div style={getSlideStyle(6)}>
            {["Shrimp", "Minerals", "Chemicals"].map((item) => (
              <div key={item} style={localStyles.importExportCard} onClick={() => setPath(["Exports", item])}>
                <div style={localStyles.imageWrapper}><img src={commonImg} alt={item} style={localStyles.importExportImg} /></div>
                <div style={localStyles.cardContent}><h3>{item}</h3></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.footerTop}>
        <span>UPIN TRADING CORPORATION</span>
        <span>📍 Hyderabad, India</span>
        <span>📧 upintrad@123.com</span>
        <span>📞 +91 93477 19244</span>
      </div>
      <p style={styles.footerBottom}>
        © 2026 UPIN Tradeing Corporation. All Rights Reserved.
      </p>
    </footer>
  );
};

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
    width: "80%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoImg: {
    height: "50px",
    width: "185px",
    objectFit: "contain",
    cursor: "pointer",
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
    color: "#1a365d",
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

// const localStyles = {
//   app: {
//     fontFamily: "Arial, sans-serif",
//     background: "#f9fafc",
//     paddingTop: "70px",
//     minHeight: "100vh",
//     overflowX: "hidden",
//   },
//   importExportSection: {
//     padding: "50px 20px",
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: "2rem",
//     marginBottom: "30px",
//     color: "#0d1b2a",
//     fontWeight: "bold",
//   },
//   sliderWrapper: {
//     position: "relative",
//     width: "100%",
//     overflow: "visible",
//   },
//   slide: {
//     position: "absolute",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     gap: "40px",
//     transition: "transform 0.6s ease, opacity 0.6s ease",
//     flexWrap: "wrap",
//     top: 0,
//     left: 0,
//   },
//   importExportCard: {
//     width: "100%",
//     maxWidth: "320px",
//     borderRadius: "15px",
//     overflow: "hidden",
//     background: "#fff",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//     transition: "0.4s",
//     cursor: "pointer",
//     flex: "1 1 280px",
//     margin: "10px",
//   },
//   imageWrapper: {
//     position: "relative",
//     height: "200px",
//     overflow: "hidden",
//   },
//   importExportImg: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transition: "0.5s",
//   },
//   cardContent: {
//     padding: "20px",
//     textAlign: "center",
//   },
// };


const localStyles = {
  app: {
    fontFamily: "Arial, sans-serif",
    // background: "#f9fafc",
    background: "linear-gradient(180deg, #e0f2f1 0%, #f0f7ff 100%)",
    paddingTop: "70px",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  importExportSection: {
    padding: "60px 20px",
    textAlign: "center",
    // background: "#ffffff",
    background: "linear-gradient(180deg, #e0f2f1 0%, #f0f7ff 100%)",
  },

  sectionTitle: {
    fontSize: "36px",
    marginBottom: "50px",
    color: "#0d1b2a",
    textAlign: "center",
    fontWeight: "bold",
  },

  sliderWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexWrap: "nowrap",
    height: "350px",
  },

  slide: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    transition: "transform 0.6s ease, opacity 0.6s ease",
    flexWrap: "wrap",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  importExportContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
    width: "100%",
    transition: "all 0.6s ease",
  },

  importExportCard: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "15px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "0.4s",
    cursor: "pointer",
    flex: "1 1 280px",
    height: "45vh",
    margin: "10px",
  },

  imageWrapper: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },

  importExportImg: {
    width: "100%",
    height: "85%",
    objectFit: "cover",
    transition: "0.5s",
  },

  cardContent: {
    padding: "0px",
    textAlign: "center",
    marginTop: "-20px",
  },

  cardBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    background: "#00b4d8",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ImportsExportsPage;