import React, { useEffect, useRef } from "react";
import WebFont from 'webfontloader';

const TextAnimationWithBoard = ({ scene = { content: "", textBgColor: "#ffffff" } }) => {
  const { content = "", textFont = "Arial", textSize = "20px", textColor = "#ffffff", textBgColor } = scene;

  const textFontValue = useRef(textFont)

  useEffect(() => {
    if (textFont.startsWith('google:')) {
      const fontName = textFont.split('google:')[1];
      WebFont.load({
        google: {
          families: [fontName]
        }
      });
      //textFont = fontName;
      textFontValue.current = fontName;
    }
  }, [textFont]);

  return (
    <>
      <div className="content-text-wrapper overflow-hidden w-100 h-100">
        <div className="w-100 h-100" style={{ overflow: 'auto' }}>
          <div className="content-text-content-wrapper h-100 w-100" style={{ whiteSpace: 'pre-wrap', padding: '1em', wordBreak: 'break-word' }}>
            {content?.split("")?.map((char, i) => (
              <span key={`${i}-char`} className="board-text-animation" style={{ animationDelay: `${i * 6}ms`, backgroundColor: textBgColor, fontSize: textSize || '25.44px', fontFamily: textFontValue.current, color: textColor }}>
                {char === " " ? <>&nbsp;</> : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TextAnimationWithBoard);