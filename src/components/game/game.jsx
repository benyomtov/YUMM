import React, { useState, useEffect } from "react";
import "./game.css";
import Apple from "../fruits/apple/apple";
import Orange from "../fruits/orange/orange";
import Pear from "../fruits/pear/pear";

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(16);

  const handleMove = (e) => {
    e.preventDefault(); // Prevent scrolling when touching the screen
    if (e.type === "touchmove") {
      const touch = e.touches[0]; // Get the first touch
      setPosition({ x: touch.clientX, y: touch.clientY });
    } else {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };



  useEffect(() => {

    const scrollDiv = document.getElementById("scrollDiv");

    if (scrollDiv) {
      scrollDiv.addEventListener("touchmove", handleMove);
      scrollDiv.addEventListener("mousemove", handleMove);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("touchmove", handleMove);
        scrollDiv.removeEventListener("mousemove", handleMove);
      }
    };
  }, []);

  const handleScreenResize = () => {

    let fontSize = 16;
  
    if (window.innerWidth < 400) {
        fontSize = 8;
      } else if (window.innerWidth < 576) {
        fontSize = 10;
      } else if (window.innerWidth < 768) {
        fontSize = 12;
      } else if (window.innerWidth < 992) {
        fontSize = 14;
      } else if (window.innerWidth < 1200) {
        fontSize = 16;
      } else {
        fontSize = 16;
      }
  
    setFontSize(fontSize);
  };

    useEffect(() => {
        handleScreenResize();
        window.addEventListener("resize", handleScreenResize);
        return () => {
            window.removeEventListener("resize", handleScreenResize);
        };
    }, [ fontSize ]);

    const calculatePosition = () => {
        const maxLeft = (window.innerWidth / fontSize - 13.75); /* convert to rem units */
        const left = Math.min(Math.max(position.x / fontSize - 6.875, 0), maxLeft);
        return { left, maxLeft };
    };
      
      const { left, maxLeft } = calculatePosition();

  return (
    <div
        id="scrollDiv"
    //   onTouchMove={ (e) => {
    //     e.preventDefault(); // Prevent scrolling when touching the screen
    //     handleMove(e);
    //   }}
      onMouseMove={handleMove}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "99%",
        height: "99%",
      }}
    >

      <Apple />
      <Orange />
      <Pear />

      <div
        className="mouth"
        style={{
          position: "absolute",
          left: `${left}rem`,
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
          left: `${left}rem`,
          bottom: "5rem",
        }}
      >
        <div className="tongue" />
        </div>
    </div>
  );
}
