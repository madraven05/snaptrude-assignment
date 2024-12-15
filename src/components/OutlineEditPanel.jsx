import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

/**
 * Outline Panel that provides the option to
 * control outline thickness, color and showing
 * the silhouette frame buffer texture 
 */
const OutlineEditPanel = ({
  outlineColor,
  setOutlineColor,
  outlineThickness,
  setOutlineThickness,
  setShowFBTexture,
}) => {
  return (
    <div className="absolute left-5 top-10 bottom-10 p-5 w-80 text-gray-800 rounded-md z-10 bg-white/70 backdrop-blur-md">
      <h2>Edit Outline</h2>
      <div className="mt-5">
        <div>
          <p>
            Outline Thickness: <b>{outlineThickness}</b>
          </p>
          <input
            value={outlineThickness}
            id="outlineThickness"
            type="range"
            max={5.0}
            min={0.0}
            step={0.05}
            onChange={(e) => setOutlineThickness(e.target.value)}
          ></input>
        </div>
        <div>
          <p>
            Outline Colour: <b>{outlineColor}</b>
          </p>
          <HexColorPicker
            style={{ height: "8rem" }}
            className="mt-2"
            color={outlineColor}
            onChange={setOutlineColor}
          />
        </div>
        <div className="mt-5 flex gap-2 justify-between items-center">
          <p>Show Silhouette Frame Buffer</p>
          <input
            type="checkbox"
            onChange={(e) => setShowFBTexture(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default OutlineEditPanel;
