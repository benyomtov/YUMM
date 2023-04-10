import React, { useState, useEffect } from "react";
import "./game.css";

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  // Determine the max values for the left and bottom properties
  const maxLeft = window.innerWidth - 220; // 100 is the width of the red square

  // Limit the left and bottom values to prevent the red square from moving past the edges of the window
  const left = Math.min(Math.max(position.x - 110, 0), maxLeft);

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "99%",
        height: "99%",
      }}
    >

      <div
        className="mouth"
        style={{
          position: "absolute",
          left: left,
          right: "100vw" - left,
          bottom: "5rem",
          margin: 0,
        }}
      >

        <div className="eye-left">
            <div className="pupil" />
        </div>

        <div className="eye-right">
            <div className="pupil" />
        </div>

        <div className="teeth">
            <div className="tooth" />
            <div className="tooth" />
        </div>   

      </div>

      <div
        className="mouth-bottom"
        style={{
          position: "absolute",
          left: left,
          bottom: "5rem",
        }}
      >
        <div className="tongue" />
        </div>
    </div>
  );
}
