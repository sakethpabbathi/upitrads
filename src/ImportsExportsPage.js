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
            marginLeft: isMobile ? "-8px" : "-99px",
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
  // const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(1);
  const [path, setPath] = useState(["Imports"]);

 
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const localStyles = getLocalStyles(isMobile);
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
//   // 1. Get the new path by slicing up to the clicked index
//   const newPath = path.slice(0, index + 1);
//   setPath(newPath);
  
//   const depth = newPath.length;
//   const lastItem = newPath[depth - 1];

//   // --- Depth 1: Root Categories ---
//   if (depth === 1) {
//     if (lastItem === "Imports" || lastItem === "Imports & Exports") setActiveSlide(1);
//     if (lastItem === "Exports") setActiveSlide(6);
//   }

// // if (depth === 1) {
// //   // Use the actual item name instead of guessing
// //   if (lastItem === "Imports" || lastItem === "Imports & Exports") {
// //     setActiveSlide(1);
// //   } else if (lastItem === "Exports") {
// //     setActiveSlide(6);
// //   }
// // }


//   // --- Depth 2: Sub-Categories (e.g., Imports > Feed) ---
//   else if (depth === 2) {
//     if (lastItem === "Feed") setActiveSlide(2);
//     if (lastItem === "HCP") setActiveSlide(3);
//     // If it's an Export sub-item, stay on Slide 6 or specific export slide
//   }

//   // --- Depth 3: Specific Feeds (e.g., Feed > Prawn Feed) ---
//   else if (depth === 3) {
//     if (lastItem === "Prawn Feed") setActiveSlide(7);
//     if (lastItem === "Fish Feed") setActiveSlide(5);
//     // Handle HCP items if they are at depth 3
//     if (newPath[1] === "HCP") setActiveSlide(10); 
//   }

//   // --- Depth 4: Growth Stages (e.g., Prawn Feed > Nursery) ---
//   else if (depth === 4) {
//     if (lastItem === "Nursery Feed") setActiveSlide(8);
//     if (lastItem === "Grower Feed") setActiveSlide(9);
//   }

//   // --- Depth 5: Species (e.g., Grower > Vannamei) ---
//   else if (depth === 5) {
//     if (lastItem === "Vannamei" || lastItem === "Tiger") setActiveSlide(11);
//   }
  
//   // --- Depth 6: Final Product (Brochure View) ---
//   else if (depth === 6) {
//     setActiveSlide(10);
//   }
// };

// const handleBreadcrumbClick = (index, providedPath = null) => {
//   // Use providedPath if available (useful for handleBack), otherwise use current state
//   const currentPath = providedPath || path;
//   const newPath = currentPath.slice(0, index + 1);
  
//   // Only update state if we aren't already handling it elsewhere
//   if (!providedPath) setPath(newPath);

//   const depth = newPath.length;
//   const lastItem = newPath[depth - 1];

//   switch (depth) {
//     case 1:
//       // Root Level: Logic for Imports vs Exports
//       if (lastItem === "Exports") {
//         setActiveSlide(6);
//       } else {
//         // Handles "Imports" or "Imports & Exports"
//         setActiveSlide(1);
//       }
//       break;

//     case 2:
//       // Sub-Categories
//       if (lastItem === "Feed") setActiveSlide(2);
//       else if (lastItem === "HCP") setActiveSlide(3);
//       else if (newPath[0] === "Exports") setActiveSlide(10); // Export details
//       break;

//     case 3:
//       // Specific Feeds or HCP Details
//       if (lastItem === "Prawn Feed") setActiveSlide(7);
//       else if (lastItem === "Fish Feed") setActiveSlide(5);
//       else if (newPath[1] === "HCP") setActiveSlide(10);
//       break;

//     case 4:
//       // Growth Stages
//       if (lastItem === "Nursery Feed") setActiveSlide(8);
//       else if (lastItem === "Grower Feed") setActiveSlide(9);
//       break;

//     case 5:
//       // Species Selection
//       if (lastItem === "Vannamei" || lastItem === "Tiger") setActiveSlide(11);
//       break;

//     case 6:
//       // Final Product View
//       setActiveSlide(10);
//       break;

//     default:
//       setActiveSlide(1);
//       break;
//   }
// };



const handleBreadcrumbClick = (index, providedPath = null) => {
    const currentPath = providedPath || path;
    const newPath = currentPath.slice(0, index + 1);
    
    if (!providedPath) setPath(newPath);

    const depth = newPath.length;
    const lastItem = newPath[depth - 1];

    switch (depth) {
      case 1:
        lastItem === "Exports" ? setActiveSlide(6) : setActiveSlide(1);
        break;
      case 2:
        if (lastItem === "Feed") setActiveSlide(2);
        else if (lastItem === "HCP") setActiveSlide(3);
        else if (newPath[0] === "Exports") setActiveSlide(10); 
        break;
      case 3:
        if (lastItem === "Prawn Feed") setActiveSlide(7);
        else if (lastItem === "Fish Feed") setActiveSlide(5);
        else if (newPath[1] === "HCP") setActiveSlide(10);
        break;
      case 4:
        if (lastItem === "Nursery Feed") setActiveSlide(8);
        else if (lastItem === "Grower Feed") setActiveSlide(9);
        break;
      case 5:
        if (lastItem === "Vannamei" || lastItem === "Tiger") setActiveSlide(11);
        break;
      case 6:
        setActiveSlide(10);
        break;
      default:
        setActiveSlide(1);
        break;
    }
  };




const handleOpenBrochure = (data, currentPath) => {
  // If data is just a string (e.g. "Marian Feed"), add .png. 
  // If it's already an object (the Grid), just use it.
  const finalData = typeof data === "string" ? `${data}.png` : data;
  
  setSelectedBrochure(finalData);
  setPath([...currentPath, typeof data === "string" ? data : "Details"]); 
  setActiveSlide(10);
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
    feed: process.env.PUBLIC_URL + "/feedicon.jpeg",
    hcp: process.env.PUBLIC_URL + "/hcpicon.jpeg",
    fishfeed: process.env.PUBLIC_URL + "/fishfeedicon.jpeg",
    // marian: process.env.PUBLIC_URL + "/marianfishfeedAi.png",
       marian: process.env.PUBLIC_URL + "/marianicon.jpeg",
    freshwater: process.env.PUBLIC_URL + "/freshwatericon.jpeg",
    prawnfeed: process.env.PUBLIC_URL + "/prawnfeedicon.jpeg",
    nursery: process.env.PUBLIC_URL + "/nurseryfeedicon.jpeg",
    grower: process.env.PUBLIC_URL + "/growerfeedicon.jpeg",
    vannamei: process.env.PUBLIC_URL + "/vannameiicon.jpeg",
    tiger: process.env.PUBLIC_URL + "/tigericon.jpeg",
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
const handleBack = () => {
  if (path.length > 1) {
    const newPath = path.slice(0, -1);
    setPath(newPath);

    // Trigger same logic as breadcrumb click
    handleBreadcrumbClick(newPath.length - 1,newPath);
  }
};

  return (
    <div style={localStyles.app}>
      <Navbar setActiveSlide={setActiveSlide} setPath={setPath} />

      <section id="imports-exports" style={localStyles.importExportSection}>

        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
  {path.length > 1 && (
    <button
      onClick={handleBack}
      style={{
        padding: "12px 20px",
        backgroundColor: "transparent",
        // color: "#fff",
        color: "lightblue",
        borderRadius: "10px",
        border: "0.8px solid lightblue",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginLeft: "8px",
      
      }}
    >
      ← Back
    </button>
  )}
</div>


<h2 style={localStyles.sectionTitle}>
  <div style={localStyles.breadcrumbContainer}>
    {path.map((item, index) => (
      <span key={index} style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            cursor: "pointer",
            color: index === path.length - 1 ? "#00b4d8" : "#0d1b2a",
          }}
          onClick={() => handleBreadcrumbClick(index)}
        >
          {item}
          {/* {index === 0 ? "Imports" : item} */}
        </span>
        {index < path.length - 1 && (
          <span style={{ margin: "0 10px", color: "#00b4d8" }}>➔</span>
        )}
      </span>
    ))}
  </div>
</h2>



        <div style={localStyles.sliderWrapper}>
        
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

{/* 
<div style={getSlideStyle(1)}>
  {renderCard(
    "Feed",
    "High-quality nutritional solutions for aquatic growth.",
    () => {
      setActiveSlide(2);
      setPath(["Imports", "Feed"]);
    },
    images.feed
  )}

  {renderCard(
    "HCP",
    "Specialized Healthcare & Processing products.",
    () => {
      setActiveSlide(3);
      setPath(["Imports", "HCP"]);
    },
    images.hcp
  )}
</div> */}
          

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
    process.env.PUBLIC_URL + "/Toponeicon.jpeg" 
  )}
</div>




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
  {/* REMOVED: padding from outer div if it causes white gaps */}
  <div style={{ textAlign: "center", padding: "20px", backgroundColor: "transparent" }}>
    
    {selectedBrochure && selectedBrochure.type === "grid" ? (
      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
          gap: "30px", 
          width: "100%",
          maxWidth: "1100px"
        }}>
          {selectedBrochure.images.map((img, index) => {
            const imgSrc = typeof img === 'string' ? img : img.url;
            const imgName = typeof img === 'string' ? "" : img.name;

            return (
              <div key={index} style={{ 
                // CHANGED: backgroundColor to transparent
                backgroundColor: 'transparent',
                borderRadius: '16px', 
                // OPTIONAL: Reduced shadow opacity since background is gone
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                paddingBottom: imgName ? '20px' : '0',
                overflow: 'hidden'
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <img 
                    src={process.env.PUBLIC_URL + "/" + imgSrc} 
                    style={{ 
                      width: "100%", 
                      height: isMobile ? "300px" : "450px", 
                      objectFit: "contain", 
                      // CHANGED: backgroundColor to transparent
                      backgroundColor: "transparent",
                      display: "block", 
                      transition: "transform 0.3s" 
                    }} 
                    alt={imgName || "Product Detail"}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
                {imgName && (
                  <p style={{ 
                    marginTop: "15px", 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    // Make sure color is visible against your app's main background
                    color: "#2c3e50" 
                  }}>
                    {imgName}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        {selectedBrochure.main && (
          <img
            src={process.env.PUBLIC_URL + "/" + selectedBrochure.main}
            alt=""
            style={{ 
              width: "100%", 
              maxWidth: "1100px", 
              height: "auto", 
              borderRadius: "15px", 
              // CHANGED: backgroundColor to transparent if applicable
              backgroundColor: "transparent",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
            }}
          />
        )}
      </div>
    ) : 
    
    (Array.isArray(selectedBrochure) || typeof selectedBrochure === 'string') && (
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}>
        {(Array.isArray(selectedBrochure) ? selectedBrochure : [selectedBrochure]).map((img, index) => (
          <img 
            key={index}
            src={process.env.PUBLIC_URL + "/" + img} 
            style={{ 
              width: "100%", 
              maxWidth: "1000px", 
              height: "auto", 
              borderRadius: "12px", 
              // CHANGED: Added transparent background just in case
              backgroundColor: "transparent",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
            }} 
            alt=""
          />
        ))}
      </div>
    )}

    
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
        cardSrc: process.env.PUBLIC_URL + "/univanapearlicon.jpeg",
        brochure: {
          type: "grid",
          main: "UNIPEARL.jpg",
          images: ["UP801.jpg", "UP802.jpg", "UP803.jpg", "UP804.jpg", "UP805.jpg", "UP802S.jpg"]
        }
      },
      "UNIVANA-P": {
        cardSrc: process.env.PUBLIC_URL + "/univanapicon.jpeg",  
        brochure: "UNIVANA P.jpg"
      },
      
      "UNIVANAMI": {
        cardSrc: process.env.PUBLIC_URL + "/univanamiicon.jpeg",
        brochure: "UNIVANAMI.jpg"
      },
      "UNIVANA": {
        cardSrc: process.env.PUBLIC_URL + "/univanaicon.jpeg", 
        brochure: "univana.png" 
      },
      // --- UPDATED LA-ONE TO GRID MODE ---
      "LA-ONE": {
        cardSrc: process.env.PUBLIC_URL + "/Laoneicon.jpeg",
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
        ``, 
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
  {renderCard(
    "Marian Feed", 
    "High-protein formula for Marian species.", 
    () => {
      handleOpenBrochure(
        {
          type: "grid",
          main: "", // The large featured image at the bottom
          images: [
            { url: "marinefishcard.png", name: "Marian Starter" },
            { url: "marinefishcardimg.png", name: "Marian Grower" },
            { url: "marinefeedseed.jpg", name: "Marian Finisher" }
          ]
        }, 
        ["Imports", "Feed", "Fish Feed"]
      );
    },
    images.marian // Card background
  )}

  {renderCard(
    "Fresh Water Fish Feed", 
    "Balanced diet for diverse environments.", 
    () => {
      handleOpenBrochure(
        {
          type: "grid",
          main: "freshwater_main.jpg", // The large featured image at the bottom
          images: [
            { url: "freshwatercard.png" },
            { url: "freshwaterseeds.jpg" },
            // { url: "fw3.jpg", name: "Catfish Feed" }
            
          ]
        }, 
        ["Imports", "Feed", "Fish Feed"]
      );
    },
    images.freshwater // Card background
  )}
</div>


<div style={getSlideStyle(3)}>
  {(() => {
    const disabledItems = [
        
        
    ];

    const hcpData = {
      "OXY-BESTOT": { 
        card: "Bestoto2.png", 
        desc: "Advanced oxygen booster for pond stability." ,
        brochure: { type: "grid", main: "", images: ["oxybestotimg.jpg"] }
      },
      "GUTPRO": {
        card: "gutproicon.png",
        desc: "Probiotic supplement for better gut health.",
        brochure: { type: "grid", main: "Gutprobro.png", images: ["GutPro.jpg"] }
      },
      "ENGRO": {
        card: "engroicon.png", 
        desc: "Growth promoter for aquaculture species.",
        brochure: ["labelengro.jpg","Engrobro.png"] 
      },
      "UNI-LIGHT": {
        card: "unilighticon.png", 
        desc: "Water conditioner for light intensity management.",
        brochure: ["Unilight.jpg","UnilightBro.jpg"] 
      },
      "NURI BSL": {
        card: "nuribslicon.png", 
        desc: "Essential nutrients for healthy shrimp growth.",
        brochure: ["NuriBsl.jpg","Nuribsl.png"] 
      },
      "ZEOLITE": { 
        card: "zeoliteicon.png", 
        desc: "Natural mineral for water purification." ,
        brochure: { type: "grid", main: "", images: ["zeoliteimg.jpg"] }
      },
      "SAPONIN": { 
        card: "saponinicon.png", 
        desc: "Organic extract for eliminating unwanted fish." ,
        brochure: { type: "grid", main: "", images: ["saponinimg.jpg","saponinimg1.png"] }
      },
      "HC-BIO": { 
        card: "hcbioicon.png", 
        desc: "Concentrated microbial solution for waste." ,
        brochure: { type: "grid", main: "", images: ["hcbioimg.png"] }
      },
      "LIFE-HC": { 
        card: "lifehcicon.png", 
        desc: "Vital health support for pond ecosystems." ,
        brochure: { type: "grid", main: "", images: ["lifehcimg.jpg"] }
      },
      "PREMIX-SUPER C": { 
        card: "supercicon.png", 
        desc: "High potency Vitamin C for stress relief." ,
        brochure: { type: "grid", main: "", images: ["superc.png"] }
      },
      "MAX C": { 
        card: "maxcicon.png", 
        desc: "Maximum strength Vitamin C for immunity.",
        brochure: ["labelmaxc.jpg","MaxCBro.png"] 
      },
      "YUCA HONG": { 
        card: "yucahongicon.png", 
        desc: "Natural ammonia binder for clean water.",
        brochure: ["yucalabel.jpg","yucabro.png"] 
      },
      "DE-NO2": { 
        card: "deno2icon.png", 
        desc: "Effective nitrite reduction formula." ,
        brochure: { type: "grid", main: "", images: ["deno2.jpg"] }
      },
      "GOLD-DINE": { 
        card: "golddineicon.png", 
        desc: "Iodine-based sanitizer for disease control.",
        brochure: "Goldenbro.jpg" 
      },
      "UNI-BKC": {
        card: "unibkcicon.png", 
        desc: "Broad-spectrum disinfectant for pond safety.",
        brochure: ["Bkcbro.png"] 
      },
      "DEHP": { 
        card: "dehpicon.png", 
        desc: "Specialized treatment for aquaculture health." ,
        brochure: { type: "grid", main: "", images: ["dehpimg1.jpg"] }
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
  {(() => {
    // Manually defined data with cardImg added for each category
    const exportData = {
      "Shrimp": {
        cardImg: "shrimpcard.jpg", // Manual card image for Shrimp
        type: "grid",
        main: "shrimp_main.jpg",
        images: [
          { url: "shrimp1.jpg" },
          { url: "shrimp2.jpg" },
          { url: "shrimp3.jpg"},
          { url: "shrimp4.jpg" },
          { url: "shrimp5.jpg" }
        ]
      },
      "Minerals": {
        cardImg: "mineralscard.jpg", // Manual card image for Minerals
        type: "grid",
        main: "minerals_main.jpg",
        images: [
          { url: "lightgreenquartz.jpeg", name: "Light Green Quartz" },
          { url: "milkyquartzimg.png", name: "Milky Quartz" },
          { url: "pinkquartz.jpeg", name: "Pink Quartz" },
          { url: "quartzbgrade.jpeg", name: "Quartz B-Grade" },
          { url: "quartzgranual.jpeg", name: "Quartz Granules" }
        ]
      },
      "Chemicals": {
        cardImg: "chemicalcard.jpg", // Manual card image for Chemicals
        type: "grid",
        main: "chem_main.jpg",
        images: [
          { url: "cacl2chemical.jpeg", name: "Calcium Chloride" },
          { url: "mgcl2chemical.jpeg", name: "Magnesium Chloride" }
        ]
      }
    };

    return Object.keys(exportData).map((item) => {
      const config = exportData[item];
      return renderCard(
        item,
        ``,
        () => {
          setSelectedBrochure(config);
          setPath(["Exports", item]);
          setActiveSlide(10);
        },
        process.env.PUBLIC_URL + "/" + config.cardImg // Passing the manual card image here
      );
    });
  })()}
</div> */}


<div style={getSlideStyle(6)}>

  {/* ✅ BACK TO HOME BUTTON */}

  {(() => {
    const exportData = {
      "Shrimp": {
        cardImg: "shrimpcard.jpg",
        type: "grid",
        main: "shrimp_main.jpg",
        images: [
          { url: "shrimp1.jpg", name: "Head-Less-Shell on Vannamei " },
          { url: "shrimp2.jpg", name: "Peald and Devined Vannamei " },
          { url: "shrimp3.jpg", name: "Peald and unDevined Vannamei" },
          { url: "shrimp4.jpg", name: "Head On Shell On Vannamei" },
          { url: "shrimp5.jpg", name: "Peald Devined Tail On Vannamei" }
        ]
      },
      "Minerals": {
        cardImg: "mineralscard.jpg",
        type: "grid",
        main: "minerals_main.jpg",
        images: [
          { url: "lightgreenquartz.jpeg", name: "Light Green Quartz" },
          { url: "milkyquartzimg.png", name: "Milky Quartz" },
          { url: "pinkquartz.jpeg", name: "Pink Quartz" },
          { url: "quartzbgrade.jpeg", name: "Quartz B-Grade" },
          { url: "quartzgranual.jpeg", name: "Quartz Granules" }
        ]
      },
      "Chemicals": {
        cardImg: "chemicalcard.jpg",
        type: "grid",
        main: "chem_main.jpg",
        images: [
          { url: "cacl2chemical.jpeg", name: "Calcium Chloride" },
          { url: "mgcl2chemical.jpeg", name: "Magnesium Chloride" }
        ]
      }
    };

    return Object.keys(exportData).map((item) => {
      const config = exportData[item];
      return renderCard(
        item,
        ``,
        () => {
          setSelectedBrochure(config);
          setPath(["Exports", item]);
          setActiveSlide(10);
        },
        process.env.PUBLIC_URL + "/" + config.cardImg
      );
    });
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
        <span>UPIN TRADING CORPORATION<br></br>
       📍 Chennai, India</span>
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
    fontFamily: "'Times New Roman'",
    boxSizing: "border-box",
    
  },
  headerInner: {
    display: "flex",
    fontFamily: "'Times New Roman'",
    justifyContent: "space-between",
    alignItems: "center",
    width: "81%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoImg: {
    height: "50px",
    fontFamily: "'Times New Roman'",
    width: "185px",
    objectFit: "contain",
    cursor: "pointer",
  },
  nav: {
    fontFamily: "'Times New Roman'",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "-36px",
  },
  navLink: {
    margin: "10px 0",
    color: "#023e8a",
    fontFamily: "'Times New Roman'",
    // color: "black",
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
     background: "rgba(13, 27, 42, 0.95)", 
    color: "#fff",
    padding: "25px 20px",
    textAlign: "center",
    fontSize: "14px",
    backdropFilter: "blur(5px)",
    // background:"transparent",
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

// const localStyles = {
//   app: {
    
//     // --- ADDED WATER BACKGROUND ---
//     fontFamily: "'Times New Roman'",
//     backgroundImage: `url(${process.env.PUBLIC_URL + "/waterbg.jpeg"})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundAttachment: "fixed",
//     backgroundRepeat: "no-repeat",
//     // ------------------------------
//     paddingTop: "70px",
//     minHeight: "100vh",
//     overflowX: "hidden",
//   },
//   importExportSection: {
//     padding: "60px 20px",
//     textAlign: "center",
//     minHeight: "calc(100vh - 150px)",
//     transition: "all 0.5s ease",
//     // Changed from solid gradient to semi-transparent glass effect
//     background: "rgba(255, 255, 255, 0.3)", 
//     backdropFilter: "blur(5px)", // Optional: adds a premium frosted look
//   },
//   // sectionTitle: {
//   //   fontSize: "30px",
//   //   marginBottom: "50px",
//   //   color: "#0d1b2a",
//   //   fontWeight: "bold",
//   //   // Added text shadow to ensure title is readable over image
//   //   textShadow: "0 2px 4px rgba(255,255,255,0.8)",
//   //   fontFamily: "'Times New Roman'",
//   //   marginLeft: "-240px",
//   // },
// sectionTitle: {
//   fontSize: isMobile ? "20px" : "28px", // Smaller font for long paths
//   marginBottom: isMobile ? "20px" : "40px",
//   color: "#0d1b2a",
//   fontWeight: "bold",
//   textShadow: "0 2px 4px rgba(255,255,255,0.8)",
//   fontFamily: "'Times New Roman'",
//   textAlign: "left", // Force text to start from left
//   width: "100%",
//   maxWidth: "1000px", // Match your card width
//   margin: "0 auto 40px auto", // Centers the container, but text inside is left-aligned
//   paddingLeft: isMobile ? "10px" : "0px",
//   display: "flex",
//   flexWrap: "wrap", // Allows path to wrap to next line if it's too long
// },
  
//   sliderWrapper: {
//     position: "relative",
//     width: "100%",
//     maxWidth: "1000px",
//     margin: "0 auto",
//     overflow: "visible", // Changed to visible so shadows aren't clipped
//     fontFamily: "'Times New Roman'",
//   },
//   slide: {
//     width: "100%",
//   },
//   importExportCard: {
//     display: "flex",
//     flexDirection: "row",
//     fontFamily: "'Times New Roman'",
//     alignItems: "center",
//     width: "100%",
//     borderRadius: "15px",
//     overflow: "hidden",
//     // Made cards more solid (0.95) so text remains very clear
//     background: "rgba(255, 255, 255, 0.95)", 
//     boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//     cursor: "pointer",
//     marginBottom: "30px",
//     border: "2px solid #f0f0f0",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.4s ease",
//   },
//   imageWrapper: {
//     width: "250px",
//     height: "180px",
//     flexShrink: 0,
//     overflow: "hidden",
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
//     fontFamily: "'Times New Roman'",
//   },
//   cardText: {
//     fontSize: "16px",
//     color: "#4a5568",
//     lineHeight: "1.6",
//     fontFamily: "'Times New Roman'",
//     margin: "10px 0 0 0",
//   },
// };


// Function that takes isMobile as an argument
const getLocalStyles = (isMobile) => ({

breadcrumbContainer: {
    display: "inline-flex", // Box only takes up as much space as the text
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white
    padding: isMobile ? "8px 15px" : "12px 25px",
    borderRadius: "10px", // Rounded pill shape
    border: "0.8px solid lightblue", // Subtle blue border
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "5px",
    backgroundColor:"transparent",
    borderColor: "lightblue",
  },
  
  sectionTitle: {
    fontSize: isMobile ? "20px" : "28px",
    marginBottom: isMobile ? "20px" : "40px",
    color: "#0d1b2a",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(255,255,255,0.8)",
    fontFamily: "'Times New Roman'",
    textAlign: "left",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto 40px auto",
    paddingLeft: isMobile ? "10px" : "0px",
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },


  
  app: {
    fontFamily: "'Times New Roman'",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/waterbg.jpeg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    paddingTop: "70px",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  importExportSection: {
    padding: isMobile ? "20px 15px" : "60px 20px",
    textAlign: "center",
    minHeight: "calc(100vh - 150px)",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(5px)",
   },
  // sectionTitle: {
  //   fontSize: isMobile ? "20px" : "28px",
  //   marginBottom: isMobile ? "20px" : "40px",
  //   color: "#0d1b2a",
  //   fontWeight: "bold",
  //   textShadow: "0 2px 4px rgba(255,255,255,0.8)",
  //   fontFamily: "'Times New Roman'",
  //   textAlign: "left",
  //   width: "100%",
  //   maxWidth: "1000px",
  //   margin: "0 auto 40px auto",
  //   paddingLeft: isMobile ? "10px" : "0px",
  //   display: "flex",
  //   flexWrap: "wrap",
  //   gap: "5px",
  // },
  sliderWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    overflow: "visible",
    fontFamily: "'Times New Roman'",
  },
  slide: {
    width: "100%",
  },
  importExportCard: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    fontFamily: "'Times New Roman'",
    alignItems: "center",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    cursor: "pointer",
    marginBottom: "30px",
    border: "2px solid #f0f0f0",
    transition: "all 0.3s ease",
  },
  imageWrapper: {
    width: isMobile ? "100%" : "250px",
    height: isMobile ? "200px" : "180px",
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
    padding: isMobile ? "20px" : "30px",
    textAlign: isMobile ? "center" : "left",
    flex: 1,
    fontFamily: "'Times New Roman'",
  },
  cardText: {
    fontSize: "16px",
    color: "#4a5568",
    lineHeight: "1.6",
    fontFamily: "'Times New Roman'",
    margin: "10px 0 0 0",
  },
});

export default ImportsExportsPage;