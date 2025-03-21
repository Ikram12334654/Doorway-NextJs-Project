import React from "react";

interface DefaultLogoProps {
  color?: string;
}

const DefaultLogo: React.FC<DefaultLogoProps> = ({ color = "#000000" }) => (
  <svg
    version="1.1"
    id="Layer_1"
    height="40"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    viewBox="0 0 429.6 687.2"
  >
    <path
      d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 54,
      }}
    ></path>
    <path
      fill={color}
      d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    ></path>
    <path
      fill={color}
      d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    ></path>
    <path
      fill={color}
      d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
    ></path>
  </svg>
);

export default DefaultLogo;
