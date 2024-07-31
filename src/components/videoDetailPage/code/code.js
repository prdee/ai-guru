import React, { useRef } from 'react';
import './code.css';

const CodeDisplay = ({ code, width, height }) => {
  //const [displayedCode, setDisplayedCode] = useState('');
  const codeContainerRef = useRef(null);

  // console.log("codevalue", code)

  // useEffect(() => {
  //   let currentIndex = 0;
  //   const interval = setInterval(() => {
  //     if (currentIndex <= code.length) {
  //       //setDisplayedCode(code.slice(0, currentIndex));
  //       currentIndex++;
  //       console.log("endedecontinue")
  //     } else {
  //       console.log("endede")
  //       clearInterval(interval);
  //       // if (codeContainerRef.current) {
  //       //   codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
  //       // }
  //     }
  //   }, 20);

  //   //return () => clearInterval(interval);
  // }, [code]);

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
   // overflow: 'hidden',
    //maxHeight: `${height}px`,
    //overflow: 'auto',
    position: 'relative',
    scrollbarWidth: 'thin'
  };

  const preStyle = {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Courier New, Courier, monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1em',
    borderRadius: '5px',
    // maxHeight: '100%',
  };

  return (
    <div className="code-display overflow-hidden" style={containerStyle}>
       <div style={{overflow: "auto"}}>
          <pre style={preStyle} ref={codeContainerRef}>
            <code>
              {code}
            </code>
          </pre>
      </div>
    </div>
  );
}

export default CodeDisplay;
