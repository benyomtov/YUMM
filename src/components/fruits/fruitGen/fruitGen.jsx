import React, { useState, useEffect } from "react";
import "./fruitGen.css";
import Apple from "../apple/apple";
import Orange from "../orange/orange";
import Pear from "../pear/pear";

export default function FruitGen() {

    const fruitNames = ["Apple", "Orange", "Pear"];

  const fruitComponents = {
    Apple: { component: <Apple />, xPos: 0, yPos: 0 },
    Orange: { component: <Orange />, xPos: 0, yPos: 0 },
    Pear: { component: <Pear />, xPos: 0, yPos: 0 },
    };

  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFruitName = fruitNames[Math.floor(Math.random() * fruitNames.length)];
      const maxXPos = window.innerWidth - 200;
      const newFruit = {
        component: fruitComponents[newFruitName].component,
        xPos: Math.floor(Math.random() * maxXPos) + 50,
        yPos: 0,
      };
      setFruits((prevFruits) => [...prevFruits, newFruit]);
    }, 1000);
  
    const moveFruitsInterval = setInterval(() => {
      setFruits((prevFruits) =>
        prevFruits.map((fruit) => ({
          ...fruit,
          yPos: fruit.yPos + 2.5,
        })).filter((fruit) => fruit.yPos < window.innerHeight)
      );
    }, 50);
  
    return () => {
      clearInterval(interval);
      clearInterval(moveFruitsInterval);
    };
  }, [setFruits]);

  const styles = {
    fruitPosition: {
        position: "absolute",
    }
    };

    return (
        <div className="fruitGen-container">
            {fruits.map((fruit, index) => (
            <div key={index} style={{ ...styles.fruitPosition, left: fruit.xPos, top: fruit.yPos }}>
                {fruit.component}
            </div>
            ))}
        </div>
    );
}
