import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleNavClick = (target) => {
    setMenuOpen(false);
    navigate("/", { state: { scrollTo: target } });
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <header style={navStyles.header}>
      <div style={navStyles.headerInner}>
        <img
          src={process.env.PUBLIC_URL + "/tradeinglogo.jpeg"}
          alt="Logo"
          style={{
            ...navStyles.logoImg,
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
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
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
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
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


// --- MAIN PAGE COMPONENT ---
const ImportsExportsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [path, setPath] = useState(["Imports & Exports"]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Dynamic Brochure State
  const [selectedBrochure, setSelectedBrochure] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { slideIndex, breadcrumb } = location.state;
      if (slideIndex !== undefined) setActiveSlide(slideIndex);
      if (breadcrumb) setPath(breadcrumb);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


const handleBreadcrumbClick = (index) => {
  const newPath = path.slice(0, index + 1);
  setPath(newPath);
  
  // Slide Mapping based on depth
  if (newPath.length === 1) setActiveSlide(0); // Imports & Exports
  if (newPath.length === 2) {
    if (newPath[1] === "Imports") setActiveSlide(1);
    if (newPath[1] === "Exports") setActiveSlide(6);
  }
  if (newPath.length === 3) {
    if (newPath[2] === "Prawn Feed") setActiveSlide(7);
    if (newPath[2] === "Fish Feed") setActiveSlide(5);
  }
  if (newPath.length === 4) {
    if (newPath[3] === "Nursery Feed") setActiveSlide(8); // New Slide for Top One
    if (newPath[3] === "Grower Feed") setActiveSlide(9);  // New Slide for Vannamei/Tiger
  }
  if (newPath.length === 5) {
     if (newPath[4] === "Vannamei" || newPath[4] === "Tiger") setActiveSlide(11); // New Slide for 4 cards
  }
};


  
  // UNIQUE BROCHURE HANDLER: Sets image AND triggers the slide
  const handleOpenBrochure = (productName, currentPath) => {
    setSelectedBrochure(`${productName}.png`); // Matches your filename
    setPath([...currentPath, productName]);
    setActiveSlide(10); // Slides to brochure view
  };

  const getSlideStyle = (index) => {
    const isActive = activeSlide === index;
    const isPast = activeSlide > index;

    return {
      ...localStyles.slide,
      display: isActive ? "block" : "none",
      position: isActive ? "relative" : "absolute",
      top: 0,
      left: 0,
      opacity: isActive ? 1 : 0,
      visibility: isActive ? "visible" : "hidden",
      transform: isActive
        ? "translateX(0)"
        : isPast
        ? "translateX(-100%)"
        : "translateX(100%)",
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
      width: "100%",
      zIndex: isActive ? 2 : 1,
      pointerEvents: isActive ? "auto" : "none",
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
          boxShadow: isHovered
            ? "0 12px 30px rgba(0,0,0,0.15)"
            : localStyles.importExportCard.boxShadow,
          borderColor: isHovered ? "#00b4d8" : "#f0f0f0",
          position: "relative",
        }}
      >
        <div
          style={{
            ...localStyles.imageWrapper,
            width: isMobile ? "100%" : "250px",
            height: isMobile ? "200px" : "180px",
          }}
        >
          <img
            src={cardImg}
            style={{
              ...localStyles.importExportImg,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
            alt={title}
          />
        </div>

        <div
          style={{
            ...localStyles.cardContent,
            textAlign: isMobile ? "center" : "left",
            padding: isMobile ? "20px" : "30px",
            paddingBottom: isMobile ? "40px" : "30px",
          }}
        >
          <h3 style={{ margin: 0, color: "#0d1b2a", fontSize: isMobile ? "18px" : "22px" }}>
            {title}
          </h3>
          {description && (
            <p style={{ ...localStyles.cardText, fontSize: isMobile ? "14px" : "16px" }}>
              {description}
            </p>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "10px" : "15px",
            right: isMobile ? "50%" : "20px",
            transform: isMobile ? "translateX(50%)" : "none",
            fontSize: "24px",
            color: "#00b4d8",
            opacity: isHovered || isMobile ? 1 : 0.5,
            transition: "all 0.3s",
            pointerEvents: "none",
          }}
        >
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
              style={{
                cursor: "pointer",
                color: index === path.length - 1 ? "#00b4d8" : "#0d1b2a",
              }}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {item} {index < path.length - 1 && " / "}
            </span>
          ))}
        </h2>

        <div style={localStyles.sliderWrapper}>
          {/* SLIDE 0: ROOT */}
          <div style={getSlideStyle(0)}>
            {renderCard("Imports", "Global aquaculture sourcing and supply chain excellence.", () => {
              setActiveSlide(1);
              setPath(["Imports"]);
            })}
            {renderCard("Exports", "Worldwide fresh delivery with certified quality standards.", () => {
              setActiveSlide(6);
              setPath(["Exports"]);
            })}
          </div>

          {/* SLIDE 1: IMPORTS */}
          <div style={getSlideStyle(1)}>
            {renderCard("Feed", "High-quality nutritional solutions for aquatic growth.", () => {
                setActiveSlide(2);
                setPath(["Imports", "Feed"]);
              }, images.feed)}
            {renderCard("HCP", "Specialized Healthcare & Processing products.", () => {
                setActiveSlide(3);
                setPath(["Imports", "HCP"]);
              }, images.hcp)}
          </div>

          {/* SLIDE 2: FEED CATEGORIES */}
          <div style={getSlideStyle(2)}>
            {renderCard("Prawn Feed", "Optimized nutrition for various prawn species.", () => {
                setActiveSlide(7);
                setPath(["Imports", "Feed", "Prawn Feed"]);
              }, images.prawnfeed)}
            {renderCard("Fish Feed", "Premium floating and sinking feed for fish farms.", () => {
                setActiveSlide(5);
                setPath(["Imports", "Feed", "Fish Feed"]);
              }, images.fishfeed)}
          </div>


{/* SLIDE 7: PRAWN FEED CATEGORIES */}
<div style={getSlideStyle(7)}>
  {renderCard("Nursery Feed", "High-protein starter feed.", () => {
    setActiveSlide(8);
    setPath([...path, "Nursery Feed"]);
  })}
  {renderCard("Grower Feed", "Advanced nutrition for growth stages.", () => {
    setActiveSlide(9);
    setPath([...path, "Grower Feed"]);
  })}
</div>

{/* SLIDE 8: NURSERY -> TOP ONE */}
{/* <div style={getSlideStyle(8)}>
  {renderCard("Top One", "Premium Nursery formulation.", () => {
    // Direct to brochure
    setSelectedBrochure("UNIVANA P.jpg"); 
    setPath([...path, "Top One"]);
    setActiveSlide(10);
  })}
</div> */}

{/* SLIDE 8: NURSERY -> TOP ONE (Manual Gallery) */}
<div style={getSlideStyle(8)}>
  {renderCard(
    "Top One", 
    "Premium Nursery formulation.", 
    () => {
      // Set the manual grid object for Top One
      setSelectedBrochure({
        type: "grid",
         main: "TPBOTH.png", // This is the large image at the bottom
        images: ["TP100.png", "TP000.png"] // These show up in the grid above
      }); 
      
      setPath([...path, "Top One"]);
      setActiveSlide(10);
    },
    // Adding the manual card image for Slide 8 itself
    process.env.PUBLIC_URL + "/fishone.jpg" 
  )}
</div>



{/* SLIDE 9: GROWER -> VANNAMEI / TIGER */}
<div style={getSlideStyle(9)}>
  {["Vannamei", "Tiger"].map((type) =>
    renderCard(type, `Specialized ${type} Grower feed.`, () => {
      setActiveSlide(11);
      setPath([...path, type]);
    })
  )}
</div>



<div style={getSlideStyle(10)}>
  <div style={{ textAlign: "center", padding: "20px" }}>
    
    {selectedBrochure && selectedBrochure.type === "grid" ? (
      /* --- GRID VIEW: 6 IMAGES ABOVE + BROCHURE BELOW --- */
      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        
        {/* 6 Image Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", 
          gap: "20px", 
          maxWidth: "1000px" 
        }}>
          {selectedBrochure.images.map((img) => (
            <div key={img} style={{ overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img 
                src={process.env.PUBLIC_URL + "/" + img} 
                style={{ width: "100%", display: "block", transition: "transform 0.3s" }} 
                alt="Product Detail"
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                // Hide small cards if they fail to load
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>

        {/* Large Main Brochure */}
        <img
          src={process.env.PUBLIC_URL + "/" + selectedBrochure.main}
          alt="Main Brochure"
          style={{ 
            maxWidth: "100%", 
            height: "auto", 
            borderRadius: "15px", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
          }}
          // Fallback changed to waterbg.jpeg
          onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/waterbg.jpeg"; }}
        />
      </div>
    ) : (
      /* --- SINGLE VIEW: Only renders if selectedBrochure is a standard string path --- */
      typeof selectedBrochure === 'string' && (
        <img
          src={process.env.PUBLIC_URL + "/" + selectedBrochure}
          alt="Brochure"
          style={{ 
            maxWidth: "100%", 
            height: "auto", 
            borderRadius: "12px", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
          }}
          // Fallback changed to waterbg.jpeg
          onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/waterbg.jpeg"; }}
        />
      )
    )}

    <div style={{ marginTop: "40px" }}>
      <button
        onClick={() => handleBreadcrumbClick(path.length - 2)}
        style={{
          padding: "12px 40px",
          backgroundColor: "#00b4d8",
          color: "white",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 15px rgba(0, 180, 216, 0.4)"
        }}
      >
        ← Back to List
      </button>
    </div>
  </div>
</div>


{/* SLIDE 11: FULLY MANUAL MAPPING */}
<div style={getSlideStyle(11)}>
  {(() => {
    const shrimpType = path[path.length - 1];
    const vannameiProducts = ["UNIVANA-P", "UNIVANA", "UNIVANA PEARL", "UNIVANAMI"];
    const tigerProducts = ["LA-ONE"];
    const productList = shrimpType === "Tiger" ? tigerProducts : vannameiProducts;

    // --- MANUAL DATA MAPPING ---
    // Define exactly what each card looks like and what it opens.
    const productData = {
      "UNIVANA PEARL": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg",
        brochure: {
          type: "grid",
          main: "UNIPEARL.jpg",
          images: ["UP801.jpg", "UP802.jpg", "UP803.jpg", "UP804.jpg", "UP805.jpg", "UP802S.jpg"]
        }
      },
      "UNIVANA-P": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg", 
        brochure: "UNIVANA P.jpg"
      },
      "UNIVANAMI": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg",
        brochure: "UNIVANAMI.jpg"
      },
      "UNIVANA": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg", 
        brochure: "UNIPEARL.jpg" // Set manually to whatever image you want
      },
      "LA-ONE": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg",
        brochure: "LA-ONE.png"
      }
    };

    return productList.map((stage) => {
      const itemConfig = productData[stage];
      if (!itemConfig) return null; // Safety check

      return renderCard(
        stage, // TITLE: Removed `${shrimpType} - ` prefix
        `Technical specifications for ${stage}`, 
        () => {
          setSelectedBrochure(itemConfig.brochure);
          setPath([...path, stage]);
          setActiveSlide(10);
        },
        itemConfig.cardSrc // IMAGE: Direct manual source
      );
    });
  })()}
</div>

   {/* SLIDE 5: FISH FEED PRODUCTS */}
          <div style={getSlideStyle(5)}>
            {renderCard("Marian Feed", "High-protein formula for Marian species.", () => {
              handleOpenBrochure("Marian Feed", ["Imports", "Feed", "Fish Feed"]);
            })}
            {renderCard("Fresh Water Fish Feed", "Balanced diet for diverse environments.", () => {
              handleOpenBrochure("Fresh Water Fish Feed", ["Imports", "Feed", "Fish Feed"]);
            })}
          </div>

          

{/* SLIDE 3: HCP PRODUCTS */}
<div style={getSlideStyle(3)}>
  {[
    "OXY-BESTOT", "GUTPRO", "ENGRO", "UNI-LIGHT", "NURI BSL", "ZEOLITE",
    "SAPONIN", "HC-BIO", "LIFE-HC", "PREMIX-SUPER C", "MAX C", "YUCA HONG",
    "DE-NO2", "GOLD-DINE", "UNI-BKC", "DEHP"
  ].map((item) =>
    renderCard(item, "Essential aquaculture healthcare solution.", () => {
      // Removed handleOpenBrochure - now just updates the breadcrumb
      setPath(["Imports", "HCP", item]); 
    })
  )}
</div>
          



          {/* SLIDE 6: EXPORTS */}
<div style={getSlideStyle(6)}>
  {["Shrimp", "Minerals", "Chemicals"].map((item) =>
    renderCard(item, `Top-grade ${item} processed for international export.`, () => {
      // Removed handleOpenBrochure
      setPath(["Exports", item]);
    })
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
    </div>
    <p style={styles.footerBottom}>
      © 2026 UPIN Tradeing Corporation. All Rights Reserved.
    </p>
  </footer>
);

// --- STYLES ---
const navStyles = {


  
  header: {
    // background: "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.95) 100%)",
    background: "white", 
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
    width: "81%",
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
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    display: "inline-block",
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
//     background: "linear-gradient(180deg, #e0f2f1 0%, #f0f7ff 100%)",
//     paddingTop: "70px",
//     minHeight: "100vh",
//     overflowX: "hidden",
//   },
//   importExportSection: {
//     padding: "60px 20px",
//     textAlign: "center",
//     minHeight: "calc(100vh - 150px)",
//     transition: "all 0.5s ease",
//   },
//   sectionTitle: {
//     fontSize: "36px",
//     marginBottom: "50px",
//     color: "#0d1b2a",
//     fontWeight: "bold",
//   },
//   sliderWrapper: {
//     position: "relative",
//     width: "100%",
//     maxWidth: "1000px",
//     margin: "0 auto",
//     overflow: "hidden",
//   },
//   slide: {
//     width: "100%",
//   },
//   importExportCard: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderRadius: "15px",
//     overflow: "hidden",
//     background: "#fff",
//     boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//     cursor: "pointer",
//     marginBottom: "30px",
//     border: "2px solid #f0f0f0",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.4s ease",
//   },
//   imageWrapper: {
//     width: "250px",
//     height: "180px",
//     flexShrink: 0,
//   },
//   importExportImg: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transition: "transform 0.5s ease",
//   },
//   cardContent: {
//     padding: "30px",
//     textAlign: "left",
//     flex: 1,
//   },
//   cardText: {
//     fontSize: "16px",
//     color: "#4a5568",
//     lineHeight: "1.6",
//     margin: "10px 0 0 0",
//   },
// };

const localStyles = {
  app: {
    fontFamily: "Arial, sans-serif",
    // --- ADDED WATER BACKGROUND ---
    backgroundImage: `url(${process.env.PUBLIC_URL + "/waterbg.jpeg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    // ------------------------------
    paddingTop: "70px",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  importExportSection: {
    padding: "60px 20px",
    textAlign: "center",
    minHeight: "calc(100vh - 150px)",
    transition: "all 0.5s ease",
    // Changed from solid gradient to semi-transparent glass effect
    background: "rgba(255, 255, 255, 0.3)", 
    backdropFilter: "blur(5px)", // Optional: adds a premium frosted look
  },
  sectionTitle: {
    fontSize: "36px",
    marginBottom: "50px",
    color: "#0d1b2a",
    fontWeight: "bold",
    // Added text shadow to ensure title is readable over image
    textShadow: "0 2px 4px rgba(255,255,255,0.8)",
  },
  sliderWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    overflow: "visible", // Changed to visible so shadows aren't clipped
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
    // Made cards more solid (0.95) so text remains very clear
    background: "rgba(255, 255, 255, 0.95)", 
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    cursor: "pointer",
    marginBottom: "30px",
    border: "2px solid #f0f0f0",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.4s ease",
  },
  imageWrapper: {
    width: "250px",
    height: "180px",
    flexShrink: 0,
    overflow: "hidden",
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