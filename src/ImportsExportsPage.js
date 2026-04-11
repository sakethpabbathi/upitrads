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


// const handleBreadcrumbClick = (index) => {
//   const newPath = path.slice(0, index + 1);
//   setPath(newPath);
  
  // Slide Mapping based on depth
  // if (newPath.length === 1) setActiveSlide(0); // Imports & Exports
//   if (newPath.length === 2) {
//     if (newPath[1] === "Imports") setActiveSlide(1);
//     if (newPath[1] === "Exports") setActiveSlide(6);
//   }
//   if (newPath.length === 3) {
//     if (newPath[2] === "Prawn Feed") setActiveSlide(7);
//     if (newPath[2] === "Fish Feed") setActiveSlide(5);
//   }
//   if (newPath.length === 4) {
//     if (newPath[3] === "Nursery Feed") setActiveSlide(8); // New Slide for Top One
//     if (newPath[3] === "Grower Feed") setActiveSlide(9);  // New Slide for Vannamei/Tiger
//   }
//   if (newPath.length === 5) {
//      if (newPath[4] === "Vannamei" || newPath[4] === "Tiger") setActiveSlide(11); // New Slide for 4 cards
//   }
// };


const handleBreadcrumbClick = (index) => {
  // 1. Get the new path by slicing up to the clicked index
  const newPath = path.slice(0, index + 1);
  setPath(newPath);
  
  const depth = newPath.length;
  const lastItem = newPath[depth - 1];

  // --- Depth 1: Root Categories ---
  if (depth === 1) {
    if (lastItem === "Imports" || lastItem === "Imports & Exports") setActiveSlide(1);
    if (lastItem === "Exports") setActiveSlide(6);
  }

  // --- Depth 2: Sub-Categories (e.g., Imports > Feed) ---
  else if (depth === 2) {
    if (lastItem === "Feed") setActiveSlide(2);
    if (lastItem === "HCP") setActiveSlide(3);
    // If it's an Export sub-item, stay on Slide 6 or specific export slide
  }

  // --- Depth 3: Specific Feeds (e.g., Feed > Prawn Feed) ---
  else if (depth === 3) {
    if (lastItem === "Prawn Feed") setActiveSlide(7);
    if (lastItem === "Fish Feed") setActiveSlide(5);
    // Handle HCP items if they are at depth 3
    if (newPath[1] === "HCP") setActiveSlide(10); 
  }

  // --- Depth 4: Growth Stages (e.g., Prawn Feed > Nursery) ---
  else if (depth === 4) {
    if (lastItem === "Nursery Feed") setActiveSlide(8);
    if (lastItem === "Grower Feed") setActiveSlide(9);
  }

  // --- Depth 5: Species (e.g., Grower > Vannamei) ---
  else if (depth === 5) {
    if (lastItem === "Vannamei" || lastItem === "Tiger") setActiveSlide(11);
  }
  
  // --- Depth 6: Final Product (Brochure View) ---
  else if (depth === 6) {
    setActiveSlide(10);
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
    feed: process.env.PUBLIC_URL + "/feedcardimg.png",
    hcp: process.env.PUBLIC_URL + "/hcpcardimg.png",
    fishfeed: process.env.PUBLIC_URL + "/fishfeedcardimg.jpg",
    prawnfeed: process.env.PUBLIC_URL + "/prawnfeedcardimg.jpg",
    nursery: process.env.PUBLIC_URL + "/nurseryprawnfeedcardimg.webp",
    grower: process.env.PUBLIC_URL + "/growerprawnfeedcardimg.jpg",
    vannamei: process.env.PUBLIC_URL + "/vannameicard.png",
    tiger: process.env.PUBLIC_URL + "/tigercardimg.png",
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
              setPath(["/"]);
            })}
            {renderCard("Exports", "Worldwide fresh delivery with certified quality standards.", () => {
              setActiveSlide(6);
              setPath(["/"]);
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
  
  },
  images.nursery
  )}
  {renderCard("Grower Feed", "Advanced nutrition for growth stages.", () => {
    setActiveSlide(9);
    setPath(["Imports", "Feed", "Prawn Feed", "Grower Feed"]);
  }, 
    images.grower)}
</div>


{/* SLIDE 8: NURSERY -> TOP ONE (Manual Gallery) */}
<div style={getSlideStyle(8)}>
  {renderCard(
    "Top One", 
    "Premium Nursery formulation.", 
    () => {
      // Set the manual grid object for Top One
      setSelectedBrochure({
        type: "grid",
        //  main: "TPBOTH.png", // This is the large image at the bottom
        images: ["TOPONEPackage.jpg", "TOPONEPackage1.jpg"] // These show up in the grid above
      }); 
      
      setPath([...path, "Top One"]);
      setActiveSlide(10);
    },
    // Adding the manual card image for Slide 8 itself
    process.env.PUBLIC_URL + "/Toponecardimg.png" 
  )}
</div>



{/* SLIDE 9: GROWER -> VANNAMEI / TIGER */}
{/* 
<div style={getSlideStyle(9)}>
  {["Vannamei", "Tiger"].map((type) =>
    renderCard(type, `Specialized ${type} Grower feed.`, () => {
      setActiveSlide(11);
      setPath([...path, type]);
    })
  )}
</div>
 */}

{/* SLIDE 9: GROWER -> VANNAMEI / TIGER */}
<div style={getSlideStyle(9)}>
  {renderCard(
    "Vannamei", 
    "Specialized Vannamei Grower feed.", 
    () => {
      setActiveSlide(11);
      setPath([...path, "Vannamei"]);
    }, 
    images.vannamei
  )}

  {renderCard(
    "Tiger", 
    "Specialized Tiger Grower feed.", 
    () => {
      setActiveSlide(11);
      setPath([...path, "Tiger"]);
    }, 
    images.tiger
  )}
</div>

{/* SLIDE 10: BROCHURE / GRID VIEWER */}
<div style={getSlideStyle(10)}>
  <div style={{ textAlign: "center", padding: "20px" }}>
    
    {/* 1. GRID VIEW: Updated to handle Object {url, name} */}
    {selectedBrochure && selectedBrochure.type === "grid" ? (
      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", 
          gap: "20px", 
          maxWidth: "1000px" 
        }}>
          {selectedBrochure.images.map((img, index) => {
            // FIX: Extract URL and Name from the object
            const imgSrc = typeof img === 'string' ? img : img.url;
            const imgName = typeof img === 'string' ? "" : img.name;

            return (
              <div key={index} style={{ 
                backgroundColor: '#fff',
                borderRadius: '12px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                paddingBottom: imgName ? '15px' : '0',
                overflow: 'hidden'
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <img 
                    src={process.env.PUBLIC_URL + "/" + imgSrc} 
                    style={{ 
                      width: "100%", 
                      height: isMobile ? "150px" : "220px",
                      objectFit: "cover",
                      display: "block", 
                      transition: "transform 0.3s" 
                    }} 
                    alt={imgName || "Product Detail"}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    onError={(e) => { e.target.src = ''; }}
                  />
                </div>
                {/* MANUAL NAME DISPLAYED HERE */}
                {imgName && (
                  <p style={{ 
                    marginTop: "12px", 
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    color: "#2c3e50",
                    padding: "0 5px"
                  }}>
                    {imgName}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Main Banner Image below grid (Optional) */}
        {selectedBrochure.main && (
          <img
            src={process.env.PUBLIC_URL + "/" + selectedBrochure.main}
            alt=""
            style={{ maxWidth: "100%", height: "auto", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>
    ) : 
    
    /* 2. ARRAY VIEW: Still works for HCP items like MAX C */
    Array.isArray(selectedBrochure) ? (
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}>
        {selectedBrochure.map((img, index) => (
          <img 
            key={index}
            src={process.env.PUBLIC_URL + "/" + img} 
            style={{ 
              maxWidth: "100%", 
              height: "auto", 
              borderRadius: "12px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)" 
            }} 
            alt=""
            onError={(e) => { e.target.src = ''; }}
          />
        ))}
      </div>
    ) : 
    
    /* 3. SINGLE VIEW: For strings */
    typeof selectedBrochure === 'string' && (
      <img
        src={process.env.PUBLIC_URL + "/" + selectedBrochure}
        alt=""
        style={{ maxWidth: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
        onError={(e) => { e.target.src = ''; }}
      />
    )}

    {/* BACK BUTTON */}
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


<div style={getSlideStyle(11)}>
  {(() => {
    const shrimpType = path[path.length - 1];
    const vannameiProducts = ["UNIVANA-P", "UNIVANA", "UNIVANA PEARL", "UNIVANAMI"];
    const tigerProducts = ["LA-ONE"];
    const productList = shrimpType === "Tiger" ? tigerProducts : vannameiProducts;

    const productData = {
      "UNIVANA PEARL": {
        cardSrc: process.env.PUBLIC_URL + "/pearlcardimg.png",
        brochure: {
          type: "grid",
          main: "UNIPEARL.jpg",
          images: ["UP801.jpg", "UP802.jpg", "UP803.jpg", "UP804.jpg", "UP805.jpg", "UP802S.jpg"]
        }
      },
      "UNIVANA-P": {
        cardSrc: process.env.PUBLIC_URL + "/univanapcardimg1.png",  
        brochure: "UNIVANA P.jpg"
      },
      
      "UNIVANAMI": {
        cardSrc: process.env.PUBLIC_URL + "/univanamicardimgs.png",
        brochure: "UNIVANAMI.jpg"
      },
      "UNIVANA": {
        cardSrc: process.env.PUBLIC_URL + "/univanacardimg.png", 
        brochure: "univana.png" 
      },
      // --- UPDATED LA-ONE TO GRID MODE ---
      "LA-ONE": {
        cardSrc: process.env.PUBLIC_URL + "/fishone.jpg",
        brochure: {
          type: "grid",
          // main: "LAONE.jpg", // This is the large one at the bottom
          images: ["LAONE.jpg", "LAONE1.jpg"] // These show up as cards at the top
        }
      }
    };

    return productList.map((stage) => {
      const itemConfig = productData[stage];
      if (!itemConfig) return null;

      return renderCard(
        stage, 
        `Technical specifications for ${stage}`, 
        () => {
          setSelectedBrochure(itemConfig.brochure);
          setPath([...path, stage]);
          setActiveSlide(10);
        },
        itemConfig.cardSrc 
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

        

<div style={getSlideStyle(3)}>
  {(() => {
    const disabledItems = [
      "OXY-BESTOT", "ZEOLITE", "SAPONIN", "HC-BIO", 
      "LIFE-HC", "PREMIX-SUPER C", "DE-NO2", "DEHP"
    ];

    const hcpData = {
      "OXY-BESTOT": { 
        card: "hcp.jpeg", 
        desc: "Advanced oxygen booster for pond stability." 
      },
      "GUTPRO": {
        card: "hcp.jpeg",
        desc: "Probiotic supplement for better gut health.",
        brochure: { type: "grid", main: "Gutprobro.png", images: ["Gutpro.jpg"] }
      },
      "ENGRO": {
        card: "hcp.jpeg", 
        desc: "Growth promoter for aquaculture species.",
        brochure: ["labelengro.jpg","Gutprobro.png"] 
      },
      "UNI-LIGHT": {
        card: "hcp.jpeg", 
        desc: "Water conditioner for light intensity management.",
        brochure: ["Unilight.jpg","UnilightBro.jpg"] 
      },
      "NURI BSL": {
        card: "hcp.jpeg", 
        desc: "Essential nutrients for healthy shrimp growth.",
        brochure: ["Nuribsl.jpg","NuriBsl.png"] 
      },
      "ZEOLITE": { 
        card: "hcp.jpeg", 
        desc: "Natural mineral for water purification." 
      },
      "SAPONIN": { 
        card: "hcp.jpeg", 
        desc: "Organic extract for eliminating unwanted fish." 
      },
      "HC-BIO": { 
        card: "hcp.jpeg", 
        desc: "Concentrated microbial solution for waste." 
      },
      "LIFE-HC": { 
        card: "hcp.jpeg", 
        desc: "Vital health support for pond ecosystems." 
      },
      "PREMIX-SUPER C": { 
        card: "hcp.jpeg", 
        desc: "High potency Vitamin C for stress relief." 
      },
      "MAX C": { 
        card: "hcp.jpeg", 
        desc: "Maximum strength Vitamin C for immunity.",
        brochure: ["labelmaxc.jpg","MaxCBro.png"] 
      },
      "YUCA HONG": { 
        card: "hcp.jpeg", 
        desc: "Natural ammonia binder for clean water.",
        brochure: ["yucalabel.jpg","yucabro.png"] 
      },
      "DE-NO2": { 
        card: "hcp.jpeg", 
        desc: "Effective nitrite reduction formula." 
      },
      "GOLD-DINE": { 
        card: "hcp.jpeg", 
        desc: "Iodine-based sanitizer for disease control.",
        brochure: "Goldenbro.jpg" 
      },
      "UNI-BKC": {
        card: "hcp.jpeg", 
        desc: "Broad-spectrum disinfectant for pond safety.",
        brochure: ["Bkcbro.png"] 
      },
      "DEHP": { 
        card: "hcp.jpeg", 
        desc: "Specialized treatment for aquaculture health." 
      }
    };

    const items = [
      "OXY-BESTOT", "GUTPRO", "ENGRO", "UNI-LIGHT", "NURI BSL", "ZEOLITE",
      "SAPONIN", "HC-BIO", "LIFE-HC", "PREMIX-SUPER C", "MAX C", "YUCA HONG",
      "DE-NO2", "GOLD-DINE", "UNI-BKC", "DEHP"
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map((item) => {
          const config = hcpData[item];
          const isDisabled = disabledItems.includes(item);

          return (
            <div key={item} style={{ cursor: "pointer" }}>
              {renderCard(
                item, 
                // Using the manual 'desc' from hcpData
                config?.desc || "Essential aquaculture solution.", 
                isDisabled ? () => {} : () => {
                  setSelectedBrochure(config ? config.brochure : "waterbg.jpeg");
                  setPath(["Imports", "HCP", item]);
                  setActiveSlide(10);
                },
                process.env.PUBLIC_URL + "/" + (config?.card || "hcp.jpeg")
              )}
            </div>
          );
        })}
      </div>
    );
  })()}
</div>

          {/* SLIDE 6: EXPORTS */}
{/* <div style={getSlideStyle(6)}>
  {["Shrimp", "Minerals", "Chemicals"].map((item) =>
    renderCard(item, `Top-grade ${item} processed for international export.`, () => {
      // Removed handleOpenBrochure
      setPath(["Exports", item]);
    })
  )}
</div> */}



{/* SLIDE 6: EXPORTS */}
<div style={getSlideStyle(6)}>
  {(() => {
    // Manually defined data with labels for the grid viewer
    const exportData = {
      "Shrimp": {
        type: "grid",
        main: "shrimp_main.jpg",
        images: [
          { url: "shrimp1.jpg", name: "Vannamei Shrimp" },
          { url: "shrimp2.jpg", name: "Tiger Shrimp" },
          { url: "shrimp3.jpg", name: "Head-on Shell-on" },
          { url: "shrimp4.jpg", name: "PUD Shrimp" },
          { url: "shrimp5.jpg", name: "Cooked Shrimp" }
        ]
      },
      "Minerals": {
        type: "grid",
        main: "minerals_main.jpg",
        images: [
          { url: "lightgreenquartz.jpeg", name: "Light Green Quartz" },
          { url: "mileyquartz.jpeg", name: "Milky Quartz" },
          { url: "pinkquartz.jpeg", name: "Pink Quartz" },
          { url: "quartzbgrade.jpeg", name: "Quartz B-Grade" },
          { url: "quartzgranual.jpeg", name: "Quartz Granules" }
        ]
      },
      "Chemicals": {
        type: "grid",
        main: "chem_main.jpg",
        images: [
          { url: "chem1.jpg", name: "Water Treatment" },
          { url: "chem2.jpg", name: "Soil Conditioner" },
          { url: "chem3.jpg", name: "Disinfectant" },
          { url: "chem4.jpg", name: "Oxygen Enhancer" }
        ]
      }
    };

    return Object.keys(exportData).map((item) =>
      renderCard(
        item,
        `Top-grade ${item} processed for international export.`,
        () => {
          // Set the specific grid data for Slide 10
          setSelectedBrochure(exportData[item]);
          // Update breadcrumb path
          setPath(["Exports", item]);
          // Navigate to the Grid Viewer
          setActiveSlide(10);
        }
      )
    );
  })()}
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