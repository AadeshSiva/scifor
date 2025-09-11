import { Footer } from "@/components/Footer";
import React, { useState, useEffect, CSSProperties, MouseEvent } from "react";

// Type definitions
interface StyleProps {
  [key: string]: string | number;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface OpenItemsState {
  [key: number]: boolean;
}

// Placeholder SVG Logo component
const Logo: React.FC = () => (
  <img
    src="assets/Logo.svg"
    alt="Logo"
    className="inline-block align-middle"
    style={{
      width: "178px",
      height: "34px",
      transform: "rotate(0deg)",
      opacity: 1,
      display: "block",
    }}
  />
);

// Black Logo component for member card
const LogoBlack: React.FC = () => (
  <img
    src="/assets/LogoBlack.svg"
    alt="LogoBlack"
    className="inline-block align-middle"
    style={{
      width: "178px",
      height: "34px",
      transform: "rotate(0deg)",
      opacity: 1,
      display: "block",
    }}
  />
);

// Plus icon component
const PlusIcon: React.FC = () => (
  <img
    src="/assets/Plus.svg"
    alt="Plus"
    style={
      {
        display: "block",
        width: "24px",
        height: "24px",
        flexShrink: 0,
        WebkitFlexShrink: 0,
      } as CSSProperties
    }
  />
);

// Close icon component
const CloseIcon: React.FC = () => (
  <img
    src="/assets/Plus.svg"
    alt="Close"
    style={
      {
        display: "block",
        width: "24px",
        height: "24px",
        flexShrink: 0,
        WebkitFlexShrink: 0,
        transform: "rotate(45deg)",
        WebkitTransform: "rotate(45deg)",
        MozTransform: "rotate(45deg)",
        msTransform: "rotate(45deg)",
      } as CSSProperties
    }
  />
);

// Tick icon component (for free plan)
const TickIcon: React.FC = () => (
  <img
    src="/assets/Tick.svg"
    alt="Tick"
    style={
      {
        minWidth: "20px",
        minHeight: "20px",
        width: "20px",
        height: "20px",
        display: "block",
        flexShrink: 0,
        WebkitFlexShrink: 0,
      } as CSSProperties
    }
  />
);

// Black Tick icon component (for member plan)
const TickBlackIcon: React.FC = () => (
  <img
    src="/assets/TickBlack.svg"
    alt="TickBlack"
    style={
      {
        minWidth: "20px",
        minHeight: "20px",
        width: "20px",
        height: "20px",
        display: "block",
        flexShrink: 0,
        WebkitFlexShrink: 0,
      } as CSSProperties
    }
  />
);

// Grow Richer SVG component (for free plan)
const GrowRicherIcon: React.FC = () => (
  <img
    src="/assets/Grow richer.svg"
    alt="Grow Richer"
    style={
      {
        position: "absolute",
        left: "8px",
        top: "16px",
        width: "15px",
        height: "auto",
        transformOrigin: "center",
        WebkitTransformOrigin: "center",
        MozTransformOrigin: "center",
        msTransformOrigin: "center",
        display: "block",
      } as CSSProperties
    }
  />
);

// Grow Richer Black SVG component (for member plan)
const GrowRicherBlackIcon: React.FC = () => (
  <img
    src="/assets/GrowricherBlack.svg"
    alt="Grow Richer Black"
    style={
      {
        position: "absolute",
        left: "8px",
        top: "16px",
        width: "15px",
        height: "auto",
        transformOrigin: "center",
        WebkitTransformOrigin: "center",
        MozTransformOrigin: "center",
        msTransformOrigin: "center",
        display: "block",
      } as CSSProperties
    }
  />
);

const saffronColor: string = "#F4A460";

const featuresFree: string[] = [
  "SAMPLE each of the 12 services",
  "Enjoy FREE Tools and Gifts",
  "Chance to WIN our monthly lotteries of each of our offerings",
  "Be FIRST in line for exclusive platform updates and offers",
];

const featuresMember: string[] = [
  "Grow Smarter to Exit Richer Immediately",
  "Get TIME on your side and STOP value destruction in your business NOW",
  "Start RECOVERING hard earned value in your business",
  "Find Out How Valuable You Truly Are — Then Pivot the Business, Strategize Value, and Structure For Tax Efficiency Before Time (and Value) Run Out.",
];

// Pricing Plan Section
const PricingPlan: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleLearnMoreClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Redirecting to JoinPage.tsx");
    window.location.href = "/pricing-plan";
  };

  const featureTextStyle: CSSProperties = {
    fontFamily:
      'Linear Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: 300,
    fontStyle: "normal",
    fontSize: windowWidth < 640 ? "14px" : windowWidth < 768 ? "16px" : "18px",
    lineHeight: windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
    letterSpacing: "0%",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  } as CSSProperties;

  const headerTextStyle: CSSProperties = {
    fontFamily:
      'Linear Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: windowWidth < 640 ? "18px" : windowWidth < 768 ? "20px" : "24px",
    fontWeight: 300,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  } as CSSProperties;

  const priceTextStyle: CSSProperties = {
    fontFamily:
      'Linear Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: windowWidth < 640 ? "28px" : windowWidth < 768 ? "32px" : "36px",
    fontWeight: 700,
    lineHeight: "1.2",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  } as CSSProperties;

  const bottomBoxTextStyle: CSSProperties = {
    fontFamily:
      'Linear Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: 300,
    fontSize: windowWidth < 640 ? "18px" : windowWidth < 768 ? "20px" : "24px",
    lineHeight: windowWidth < 640 ? "28px" : windowWidth < 768 ? "36px" : "44px",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  } as CSSProperties;

  const featuresContainerStyle: CSSProperties = {
    width: "80%",
    maxWidth: "100%",
    margin: "0 auto",
  };

  const containerStyle: CSSProperties = {
    backgroundColor: "#e5e7eb",
    padding: windowWidth < 640 ? "8px" : windowWidth < 768 ? "16px" : "32px",
    borderRadius: "12px",
    maxWidth: "1280px",
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    msBoxSizing: "border-box",
  } as CSSProperties;

  const cardsWrapperStyle: CSSProperties = {
    display: "flex",
    WebkitDisplay: "flex",
    msFlexDirection: windowWidth < 640 ? "column" : "row",
    flexDirection: windowWidth < 640 ? "column" : "row",
    WebkitFlexDirection: windowWidth < 640 ? "column" : "row",
    justifyContent: "center",
    WebkitJustifyContent: "center",
    msFlexPack: "center",
    alignItems: windowWidth < 640 ? "center" : "stretch",
    WebkitAlignItems: windowWidth < 640 ? "center" : "stretch",
    msFlexAlign: windowWidth < 640 ? "center" : "stretch",
    gap: windowWidth < 640 ? "16px" : windowWidth < 768 ? "20px" : "32px",
    width: "100%",
    margin: "0 auto",
  } as CSSProperties;

  const cardStyle: CSSProperties = {
    backgroundColor: "black",
    color: "white",
    position: "relative",
    display: "flex",
    WebkitDisplay: "flex",
    msFlexDirection: "column",
    flexDirection: "column",
    WebkitFlexDirection: "column",
    overflow: "hidden",
    width: windowWidth < 640 ? "100%" : "auto",
    maxWidth:
      windowWidth < 640
        ? "400px"
        : windowWidth < 768
        ? "350px"
        : windowWidth < 1024
        ? "380px"
        : "400px",
    minHeight:
      windowWidth < 640
        ? "550px"
        : windowWidth < 768
        ? "600px"
        : windowWidth < 1024
        ? "650px"
        : "700px",
    borderRadius: windowWidth < 640 ? "15px" : "20px",
    padding: windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
    boxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    msBoxSizing: "border-box",
    flex: windowWidth >= 640 ? "0 1 400px" : "none",
    WebkitFlex: windowWidth >= 640 ? "0 1 400px" : "none",
    msFlex: windowWidth >= 640 ? "0 1 400px" : "none",
  } as CSSProperties;

  const memberCardStyle: CSSProperties = {
    ...cardStyle,
    backgroundColor: "white",
    color: "#111827",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    WebkitBoxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e5e7eb",
        paddingTop: windowWidth < 640 ? "16px" : windowWidth < 768 ? "32px" : "64px",
        paddingBottom: windowWidth < 640 ? "16px" : windowWidth < 768 ? "32px" : "64px",
        paddingLeft: windowWidth < 640 ? "8px" : "16px",
        paddingRight: windowWidth < 640 ? "8px" : "16px",
      }}
    >
      <div style={{ maxWidth: "1536px", margin: "0 auto" }}>
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: windowWidth < 640 ? "24px" : windowWidth < 768 ? "32px" : "64px",
          }}
        >
          <h1
            style={
              {
                fontFamily: 'walbaum, Georgia, "Times New Roman", Times, serif',
                fontWeight: 300,
                fontStyle: "normal",
                fontSize:
                  windowWidth < 480
                    ? "28px"
                    : windowWidth < 640
                    ? "32px"
                    : windowWidth < 768
                    ? "36px"
                    : windowWidth < 1024
                    ? "42px"
                    : windowWidth < 1280
                    ? "48px"
                    : "56px",
                lineHeight:
                  windowWidth < 480
                    ? "32px"
                    : windowWidth < 640
                    ? "36px"
                    : windowWidth < 768
                    ? "40px"
                    : windowWidth < 1024
                    ? "46px"
                    : windowWidth < 1280
                    ? "52px"
                    : "60px",
                color: "#374151",
                textAlign: "center",
                marginBottom: windowWidth < 640 ? "16px" : windowWidth < 768 ? "24px" : "48px",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              } as CSSProperties
            }
          >
            Pricing Plan
          </h1>
        </div>

        <div style={containerStyle}>
          <div style={cardsWrapperStyle}>
            {/* Free Plan Card */}
            <div style={cardStyle}>
              {/* <GrowRicherIcon /> */}

              <div
                style={
                  {
                    flex: "1",
                    WebkitFlex: "1",
                    msFlex: "1",
                    display: "flex",
                    WebkitDisplay: "flex",
                    flexDirection: "column",
                    WebkitFlexDirection: "column",
                    msFlexDirection: "column",
                    paddingTop: windowWidth < 640 ? "12px" : windowWidth < 768 ? "24px" : "32px",
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    marginBottom: windowWidth < 640 ? "16px" : windowWidth < 768 ? "24px" : "32px",
                  }}
                >
                  <p
                    style={{
                      ...headerTextStyle,
                      color: "#d1d5db",
                      marginBottom: windowWidth < 640 ? "4px" : "8px",
                      textAlign: "center",
                    }}
                  >
                    Become a
                  </p>
                  <div
                    style={
                      {
                        display: "flex",
                        WebkitDisplay: "flex",
                        alignItems: "center",
                        WebkitAlignItems: "center",
                        msFlexAlign: "center",
                        justifyContent: "center",
                        WebkitJustifyContent: "center",
                        msFlexPack: "center",
                        gap: windowWidth < 640 ? "4px" : "8px",
                        marginBottom: windowWidth < 640 ? "8px" : "16px",
                      } as CSSProperties
                    }
                  >
                    <div
                    // style={
                    //   {
                    //     transform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     WebkitTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     MozTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     msTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //   } as CSSProperties
                    // }
                    >
                      <Logo />
                    </div>
                    <span style={{ ...headerTextStyle, color: "#d1d5db" }}>Guest</span>
                  </div>
                  <h2
                    style={{
                      ...priceTextStyle,
                      marginBottom: windowWidth < 640 ? "8px" : "16px",
                      textAlign: "center",
                    }}
                  >
                    Free
                  </h2>
                </div>

                <div
                  style={
                    {
                      flex: "1",
                      WebkitFlex: "1",
                      msFlex: "1",
                      marginBottom:
                        windowWidth < 640 ? "20px" : windowWidth < 768 ? "28px" : "32px",
                    } as CSSProperties
                  }
                >
                  <div style={featuresContainerStyle}>
                    {featuresFree.map((feature, idx) => (
                      <div
                        key={idx}
                        style={
                          {
                            display: "flex",
                            WebkitDisplay: "flex",
                            alignItems: "flex-start",
                            WebkitAlignItems: "flex-start",
                            msFlexAlign: "start",
                            gap: "12px",
                            marginBottom:
                              windowWidth < 640 ? "12px" : windowWidth < 768 ? "16px" : "20px",
                          } as CSSProperties
                        }
                      >
                        <div
                          style={
                            {
                              flexShrink: 0,
                              WebkitFlexShrink: 0,
                              msFlexNegative: 0,
                              marginTop: "4px",
                            } as CSSProperties
                          }
                        >
                          <TickIcon />
                        </div>
                        <p
                          style={
                            {
                              ...featureTextStyle,
                              flex: "1",
                              WebkitFlex: "1",
                              msFlex: "1",
                              color: "white",
                            } as CSSProperties
                          }
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={
                    {
                      border: `1px solid ${saffronColor}`,
                      borderRadius: "8px",
                      minHeight: windowWidth < 640 ? "50px" : windowWidth < 768 ? "60px" : "70px",
                      display: "flex",
                      WebkitDisplay: "flex",
                      flexDirection: "column",
                      WebkitFlexDirection: "column",
                      msFlexDirection: "column",
                      alignItems: "center",
                      WebkitAlignItems: "center",
                      msFlexAlign: "center",
                      justifyContent: "center",
                      WebkitJustifyContent: "center",
                      msFlexPack: "center",
                      padding: windowWidth < 640 ? "6px 8px" : "8px 12px",
                      marginTop: "auto",
                      marginLeft: windowWidth < 640 ? "-4px" : "-8px",
                      marginRight: windowWidth < 640 ? "-4px" : "-8px",
                      width: windowWidth < 640 ? "calc(100% + 8px)" : "calc(100% + 16px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      WebkitTransition: "all 0.3s ease",
                      MozTransition: "all 0.3s ease",
                      msTransition: "all 0.3s ease",
                    } as CSSProperties
                  }
                  onClick={handleLearnMoreClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(244, 164, 96, 0.1)";
                    e.currentTarget.style.borderColor = "#F4A460";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = saffronColor;
                  }}
                >
                  <div
                    style={
                      {
                        display: "flex",
                        WebkitDisplay: "flex",
                        alignItems: "center",
                        WebkitAlignItems: "center",
                        msFlexAlign: "center",
                        gap: windowWidth < 640 ? "4px" : "8px",
                        marginBottom: windowWidth < 640 ? "8px" : "12px",
                        pointerEvents: "none",
                      } as CSSProperties
                    }
                  >
                    <div
                    // style={
                    //   {
                    //     transform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     WebkitTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     MozTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     msTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //   } as CSSProperties
                    // }
                    >
                      <Logo />
                    </div>
                    <span style={{ ...bottomBoxTextStyle, color: "#d1d5db" }}>Guest</span>
                  </div>
                  <span
                    style={{
                      color: saffronColor,
                      fontSize: "12px",
                      fontWeight: 500,
                      textDecoration: "none",
                      pointerEvents: "none",
                    }}
                  >
                    Click to Learn More
                  </span>
                </div>
              </div>
            </div>

            {/* Member Plan Card */}
            <div style={memberCardStyle}>
              {/* <GrowRicherBlackIcon /> */}

              <div
                style={
                  {
                    flex: "1",
                    WebkitFlex: "1",
                    msFlex: "1",
                    display: "flex",
                    WebkitDisplay: "flex",
                    flexDirection: "column",
                    WebkitFlexDirection: "column",
                    msFlexDirection: "column",
                    paddingTop: windowWidth < 640 ? "12px" : windowWidth < 768 ? "24px" : "32px",
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    marginBottom: windowWidth < 640 ? "16px" : windowWidth < 768 ? "24px" : "32px",
                  }}
                >
                  <p
                    style={{
                      ...headerTextStyle,
                      color: "#6b7280",
                      marginBottom: windowWidth < 640 ? "4px" : "8px",
                      textAlign: "center",
                    }}
                  >
                    Become a
                  </p>
                  <div
                    style={
                      {
                        display: "flex",
                        WebkitDisplay: "flex",
                        alignItems: "center",
                        WebkitAlignItems: "center",
                        msFlexAlign: "center",
                        justifyContent: "center",
                        WebkitJustifyContent: "center",
                        msFlexPack: "center",
                        gap: windowWidth < 640 ? "4px" : "8px",
                        marginBottom: windowWidth < 640 ? "8px" : "16px",
                      } as CSSProperties
                    }
                  >
                    <div
                    // style={
                    //   {
                    //     transform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     WebkitTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     MozTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     msTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //   } as CSSProperties
                    // }
                    >
                      <LogoBlack />
                    </div>
                    <span style={{ ...headerTextStyle, color: "#4b5563" }}>Member</span>
                  </div>
                  <h2
                    style={{
                      ...priceTextStyle,
                      marginBottom: windowWidth < 640 ? "8px" : "16px",
                      textAlign: "center",
                      color: "#111827",
                    }}
                  >
                    $1797
                  </h2>
                </div>

                <div
                  style={
                    {
                      flex: "1",
                      WebkitFlex: "1",
                      msFlex: "1",
                      marginBottom:
                        windowWidth < 640 ? "20px" : windowWidth < 768 ? "28px" : "32px",
                    } as CSSProperties
                  }
                >
                  <div style={featuresContainerStyle}>
                    {featuresMember.map((feature, idx) => (
                      <div
                        key={idx}
                        style={
                          {
                            display: "flex",
                            WebkitDisplay: "flex",
                            alignItems: "flex-start",
                            WebkitAlignItems: "flex-start",
                            msFlexAlign: "start",
                            gap: "12px",
                            marginBottom:
                              windowWidth < 640 ? "12px" : windowWidth < 768 ? "16px" : "20px",
                          } as CSSProperties
                        }
                      >
                        <div
                          style={
                            {
                              flexShrink: 0,
                              WebkitFlexShrink: 0,
                              msFlexNegative: 0,
                              marginTop: "4px",
                            } as CSSProperties
                          }
                        >
                          <TickBlackIcon />
                        </div>
                        <p
                          style={
                            {
                              ...featureTextStyle,
                              flex: "1",
                              WebkitFlex: "1",
                              msFlex: "1",
                              color: "#111827",
                            } as CSSProperties
                          }
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={
                    {
                      backgroundColor: "black",
                      border: `1px solid ${saffronColor}`,
                      borderRadius: "8px",
                      minHeight: windowWidth < 640 ? "50px" : windowWidth < 768 ? "60px" : "70px",
                      display: "flex",
                      WebkitDisplay: "flex",
                      flexDirection: "column",
                      WebkitFlexDirection: "column",
                      msFlexDirection: "column",
                      alignItems: "center",
                      WebkitAlignItems: "center",
                      msFlexAlign: "center",
                      justifyContent: "center",
                      WebkitJustifyContent: "center",
                      msFlexPack: "center",
                      padding: windowWidth < 640 ? "6px 8px" : "8px 12px",
                      marginTop: "auto",
                      marginLeft: windowWidth < 640 ? "-4px" : "-8px",
                      marginRight: windowWidth < 640 ? "-4px" : "-8px",
                      width: windowWidth < 640 ? "calc(100% + 8px)" : "calc(100% + 16px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      WebkitTransition: "all 0.3s ease",
                      MozTransition: "all 0.3s ease",
                      msTransition: "all 0.3s ease",
                    } as CSSProperties
                  }
                  onClick={handleLearnMoreClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                    e.currentTarget.style.borderColor = "#F4A460";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.borderColor = saffronColor;
                  }}
                >
                  <div
                    style={
                      {
                        display: "flex",
                        WebkitDisplay: "flex",
                        alignItems: "center",
                        WebkitAlignItems: "center",
                        msFlexAlign: "center",
                        gap: windowWidth < 640 ? "4px" : "8px",
                        marginBottom: windowWidth < 640 ? "8px" : "12px",
                        pointerEvents: "none",
                      } as CSSProperties
                    }
                  >
                    <div
                    // style={
                    //   {
                    //     transform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     WebkitTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     MozTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     msTransform:
                    //       windowWidth < 640
                    //         ? "scale(0.75)"
                    //         : windowWidth < 768
                    //         ? "scale(0.9)"
                    //         : "scale(1)",
                    //     color: "white",
                    //   } as CSSProperties
                    // }
                    >
                      <Logo />
                    </div>
                    <span style={{ ...bottomBoxTextStyle, color: "#d1d5db" }}>Member</span>
                  </div>
                  <span
                    style={{
                      color: saffronColor,
                      fontSize: "12px",
                      fontWeight: 500,
                      textDecoration: "none",
                      pointerEvents: "none",
                    }}
                  >
                    Click to Learn More
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Section
const faqs = [
  {
    question: "I already have a profitable business. Why should I care about PRSPERA?",
    answer:
      "Because profit ≠ value. And value ≠ exit. 80% of businesses never sell. Not because they weren't profitable — but because they weren't transferable, defensible, or structured to be bought. You may be generating income. But if 84% of your value is intangible and unmanaged, the market won't pay for it when it counts. PRSPERA makes sure they do.",
  },
  {
    question: "Why do I need a platform to tell me what my team should already be doing?",
    answer:
      "Because your team wasn't hired, trained, or incentivized to build enterprise value. They're executing — not capitalizing. And statistically? 77% of them are disengaged. So yes — they're doing work, but they're not building value. PRSPERA gives you the structure, the tools, and the visibility to turn daily work into equity growth.",
  },
  {
    question: "I already have advisors — accountants, lawyers, even a coach.",
    answer:
      "Great. But PRSPERA doesn't replace your advisors. It activates your internal value engine so your advisors can actually protect and scale something worth defending. Most advisors come in after the value's been eroded. PRSPERA starts before — where value is built (or lost): inside your team, systems, and strategy.",
  },
  {
    question: "This sounds like theory. How do I know this stuff works?",
    answer:
      "It's not theory, it's facts: 84% of your enterprise value is inside your intangible assets – if you have not maximized that value (across at least 11 value drivers), made that value monetizable, and tax effective then you risk everything you have built so far. Jeff Cullen proved that these intangible assets' value can be maximized, monetized tax effectively by all management and staff – if done early enough and operationalized on a daily basis via the Unifying Philosophy – a proprietary PRSPERA Strategy System. This isn't a \"nice-to-have\". PRSPERA is the difference between a life-changing exit… and a massive regret that will last generations.",
  },
  {
    question: "Can't I just wait until I'm ready to sell?",
    answer:
      "Sure. If you're okay with watching your value silently rot while you wait. Every day without action = compounding decay of your intangibles. By the time you're \"ready,\" it's often too late to recover what you've lost. PRSPERA is for founders who want control over when, how, and how much they exit for.",
  },
  {
    question: "What exactly do I get with PRSPERA? Break it down.",
    answer:
      "Here's what you unlock: A real-world M&A opinion of your street valuation. A quantified Exit Richer Gap Report. A mapped de-risking action plan (top 10 plays, customized). Access to our vetted advisory network. Templates, scorecards, and team-driven value acceleration tools. A system to activate your people to build transferable value daily. Tax-efficient exit design strategy (yes, the real stuff). And if you're one of the first 111: You get lifetime access, a private session with Jeff, and the complete exit stack for $1797. One-time.",
  },
  {
    question: "What happens if I do nothing?",
    answer:
      "Simple: You'll keep thinking you're worth more than the market will pay. Your team will stay disengaged, and their work will keep leaking value. You'll exit with less. Maybe nothing. And you'll never know what you could have had — until it's too late.",
  },
  {
    question: "Why is it so cheap? $1797 isn't for all that?",
    answer:
      "Because this is the founding member round. You're betting on the only platform designed to protect your exit before it's at risk. Later, this goes full enterprise. Full price. Full-stack. For now? We want the bold, the committed, the no-BS founders who get it — and want in. \"What if my business is 'too small' or 'not ready yet' for this?\" If you're profitable, if you've got people, and if you've built anything worth protecting — you're ready. This isn't just for $50M enterprises. This is for the $2M–$30M founder who wants to get smart before it's too late. PRSPERA is how you scale with intelligence, not ignorance. \"Can't I just get a valuation from a broker or banker instead?\" Sure — if you want a number based on theory that no real buyer will ever pay. Most valuations are inflated. Most founders never hit them. PRSPERA gives you the street value — what the market would offer you today, based on how transferable, defensible, and scalable your business really is. You want a vanity metric, go to a broker. You want reality and a plan to raise it? You're in the right place.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "The platform is built for fast clarity and immediate action: Your Exit Richer Gap Report lands in <14 days. Your street value opinion comes within 30–90 days (M&A partner dependent). Top 10 actions to recover value → same week. Some members see valuation boosts in 60–90 days. Others spend the year playing chess while everyone else plays checkers.",
  },
  {
    question: "Will this work in my industry?",
    answer:
      "If your business has people, processes, customers, and profit — yes. We're industry-agnostic, because the fundamentals are the same: Value is built on systems, teams, defensibility, and structure. Whether you're SaaS, services, manufacturing, or tech-enabled — PRSPERA gives you the levers.",
  },
  {
    question:
      "How do I know who's advising me? Who built this?",
    answer:
      "You'll be backed by a vetted network of Ex-operators who exited 8- and 9-figure companies. M&A pros with $1B+ in closed deals. Tax and structuring experts who've saved founders millions. And the creators of PRSPERA — a platform built on real-world exit wins, not ivory tower theory. This isn't some guru course. This is execution infrastructure.",
  },
  {
    question: "Can I cancel or get a refund?",
    answer:
      "We don't offer refunds — we offer results. But if you show up, use the system, and don't get a clear valuation, de-risking strategy, and exit playbook within 90 days — we'll fix it or make it right. Simple as that.",
  },
];

export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<OpenItemsState>({});
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleItem = (index: number): void => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const questionTextStyle: CSSProperties = {
    fontSize: windowWidth < 640 ? "16px" : windowWidth < 768 ? "18px" : "20px",
    lineHeight: windowWidth < 640 ? "24px" : windowWidth < 768 ? "28px" : "32px",
    fontWeight: "600",
  };

  const answerTextStyle: CSSProperties = {
    fontSize: windowWidth < 640 ? "14px" : windowWidth < 768 ? "16px" : "18px",
    lineHeight: windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-16 px-2 sm:px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-12" />
        <h2
          className="text-center mb-4 sm:mb-6 md:mb-12"
          style={
            {
              fontFamily: "walbaum",
              color: "#9ca3af",
              fontSize:
                windowWidth < 480
                  ? "24px"
                  : windowWidth < 640
                  ? "28px"
                  : windowWidth < 768
                  ? "32px"
                  : windowWidth < 1024
                  ? "38px"
                  : windowWidth < 1280
                  ? "44px"
                  : "52px",
              lineHeight:
                windowWidth < 480
                  ? "28px"
                  : windowWidth < 640
                  ? "32px"
                  : windowWidth < 768
                  ? "36px"
                  : windowWidth < 1024
                  ? "42px"
                  : windowWidth < 1280
                  ? "48px"
                  : "56px",
              fontWeight: 300,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            } as CSSProperties
          }
        >
          Frequently Asked Questions
        </h2>

        <div className="py-8 sm:py-12 md:py-16">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-2 sm:p-3 md:p-4 cursor-pointer transition-all duration-300 border-b border-black"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                      {openItems[idx] ? <CloseIcon /> : <PlusIcon />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-gray-900 leading-relaxed break-words"
                      style={questionTextStyle}
                    >
                      {faq.question}
                    </p>
                    {openItems[idx] && (
                      <div className="mt-2 sm:mt-3 overflow-hidden transition-all duration-300">
                        <p
                          className="text-gray-600 leading-relaxed break-words"
                          style={answerTextStyle}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => (
  <div>
    <PricingPlan />
    <Footer />
  </div>
);

export default HomePage;
