import React, { useEffect, useRef, useState } from "react";

const TypingMaster = () => {
  const textToType = "The quick brown fox jumps over the lazy dog.";
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => {
    const inputText = e.target.value;
    setTypedText(inputText);
  };

  const getColorForChar = (char, index) => {
    if (typedText[index] === undefined) {
      return "black"; // not typed yet
    } else if (typedText[index] === char) {
      return "green"; // correct character
    } else {
      return "red"; // incorrect character
    }
  };
  console.log("typedText", typedText);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <input
        ref={inputRef}
        id="typeArea"
        type="text"
        value={typedText}
        onChange={handleChange}
        rows="4"
        cols="50"
        placeholder="Start typing here..."
        style={{ marginTop: "20px", fontSize: "18px", fontFamily: "monospace" }}
        className="opacity-0"
      />
      <label htmlFor="typeArea">
        <div style={{ fontSize: "24px", fontFamily: "monospace" }}>
          {textToType.split("").map((char, index) => (
            <span key={index} style={{ color: getColorForChar(char, index) }}>
              {char}
            </span>
          ))}
        </div>
      </label>
    </div>
  );
};

export default TypingMaster;
