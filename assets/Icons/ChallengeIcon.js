import React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const ChallengeIcon = ({ color = "#000", size = 24, strokeWidth = 5 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Mountain base */}
      <Path d="M2 58 L22 26 L32 38 L42 22 L62 58 Z" fill="none" />
      {/* Flagpole */}
      <Path d="M42 22 V10" />
      {/* Flag */}
      <Path d="M42 10 L52 14 L42 18 Z" fill={color} />
    </Svg>
  );
};

export default ChallengeIcon;
