import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface CardGradientProps {
  children: React.ReactNode;
  colorIdentity: string[];
}

export const CardGradient: React.FC<CardGradientProps> = ({ children, colorIdentity }) => {
  const colorsMap = {
    R: "rgba(191,48,31, 0.5)",
    G: "rgba(18,124,75,0.5)",
    U: "rgba(0,110,153,0.5)",
    W: "rgba(242,243,237,0.5)",
    B: "rgba(37,33,32,0.5)",
    N: "rgba(152,176,188,0.5)",
  };
  const possibleLocations = {
    "1": [0, 1],
    "2": [0, 1],
    "3": [0, 0.5, 1],
    "4": [0, 0.33, 0.66, 1],
    "5": [0, 0.25, 0.5, 0.75, 1],
  };
  const locations = possibleLocations[colorIdentity.length];
  let colors: string[];
  if (colorIdentity.length === 1) {
    colors = [colorsMap[colorIdentity[0]], colorsMap[colorIdentity[0]]];
  } else {
    colors = colorIdentity.map((color) => colorsMap[color]);
  }
  return (
    <LinearGradient
      colors={colors}
      start={[0, 1]}
      end={[1, 1]}
      locations={locations}
      style={{
        flex: 1,
        padding: 0,
        borderRadius: 10,
      }}
    >
      {children}
    </LinearGradient>
  );
};
