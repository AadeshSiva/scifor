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
    lineHeight:
      windowWidth < 640 ? "20px" : windowWidth < 768 ? "24px" : "28px",
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
    lineHeight:
      windowWidth < 640 ? "28px" : windowWidth < 768 ? "36px" : "44px",
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
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    WebkitBoxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e5e7eb",
        paddingTop:
          windowWidth < 640 ? "16px" : windowWidth < 768 ? "32px" : "64px",
        paddingBottom:
          windowWidth < 640 ? "16px" : windowWidth < 768 ? "32px" : "64px",
        paddingLeft: windowWidth < 640 ? "8px" : "16px",
        paddingRight: windowWidth < 640 ? "8px" : "16px",
      }}
    >
      <div style={{ maxWidth: "1536px", margin: "0 auto" }}>
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom:
              windowWidth < 640 ? "24px" : windowWidth < 768 ? "32px" : "64px",
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
                marginBottom:
                  windowWidth < 640
                    ? "16px"
                    : windowWidth < 768
                    ? "24px"
                    : "48px",
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
                    paddingTop:
                      windowWidth < 640
                        ? "12px"
                        : windowWidth < 768
                        ? "24px"
                        : "32px",
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    marginBottom:
                      windowWidth < 640
                        ? "16px"
                        : windowWidth < 768
                        ? "24px"
                        : "32px",
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
                    <span style={{ ...headerTextStyle, color: "#d1d5db" }}>
                      Guest
                    </span>
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
                        windowWidth < 640
                          ? "20px"
                          : windowWidth < 768
                          ? "28px"
                          : "32px",
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
                              windowWidth < 640
                                ? "12px"
                                : windowWidth < 768
                                ? "16px"
                                : "20px",
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
                      minHeight:
                        windowWidth < 640
                          ? "50px"
                          : windowWidth < 768
                          ? "60px"
                          : "70px",
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
                      width:
                        windowWidth < 640
                          ? "calc(100% + 8px)"
                          : "calc(100% + 16px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      WebkitTransition: "all 0.3s ease",
                      MozTransition: "all 0.3s ease",
                      msTransition: "all 0.3s ease",
                    } as CSSProperties
                  }
                  onClick={handleLearnMoreClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(244, 164, 96, 0.1)";
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
                    <span style={{ ...bottomBoxTextStyle, color: "#d1d5db" }}>
                      Guest
                    </span>
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
                    paddingTop:
                      windowWidth < 640
                        ? "12px"
                        : windowWidth < 768
                        ? "24px"
                        : "32px",
                  } as CSSProperties
                }
              >
                <div
                  style={{
                    marginBottom:
                      windowWidth < 640
                        ? "16px"
                        : windowWidth < 768
                        ? "24px"
                        : "32px",
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
                    <span style={{ ...headerTextStyle, color: "#4b5563" }}>
                      Member
                    </span>
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
                        windowWidth < 640
                          ? "20px"
                          : windowWidth < 768
                          ? "28px"
                          : "32px",
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
                              windowWidth < 640
                                ? "12px"
                                : windowWidth < 768
                                ? "16px"
                                : "20px",
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
                      minHeight:
                        windowWidth < 640
                          ? "50px"
                          : windowWidth < 768
                          ? "60px"
                          : "70px",
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
                      width:
                        windowWidth < 640
                          ? "calc(100% + 8px)"
                          : "calc(100% + 16px)",
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
                    <span style={{ ...bottomBoxTextStyle, color: "#d1d5db" }}>
                      Member
                    </span>
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

const HomePage: React.FC = () => (
  <div>
    <PricingPlan />
    {/* <FAQSection /> */}
    <Footer />
  </div>
);

export default HomePage;
