import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [color, setColor] = useState("pink");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+{}[]|:;'<>,.?/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: color }}
    >
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg p-6 text-orange-500 bg-gray-800">
          <h1 className="text-white text-xl sm:text-2xl text-center font-semibold mb-4 sm:mb-6">
            Password Generator
          </h1>

          <div className="flex items-center mb-4 sm:mb-6">
            <input
              type="text"
              value={password}
              className="outline-none py-2 sm:py-4 px-2 sm:px-4 text-black bg-slate-50 rounded-lg flex-1 mr-2 w-full text-sm sm:text-base"
              placeholder="Generate password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-blue-600 hover:bg-purple-700 text-white px-2 sm:px-4 py-2 rounded-r-lg text-sm sm:text-base"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col sm:flex-row text-xs sm:text-sm gap-y-2 sm:gap-y-0 sm:gap-x-4">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer w-full"
                onChange={(e) => {
                  setLength(parseInt(e.target.value, 10));
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 p-4">
        <button
          onClick={() => setColor("red")}
          className="outline-none px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white shadow-xl text-sm sm:text-base"
          style={{ backgroundColor: "red" }}
        >
          Red
        </button>
        <button
          onClick={() => setColor("blue")}
          className="outline-none px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white shadow-xl text-sm sm:text-base"
          style={{ backgroundColor: "blue" }}
        >
          Blue
        </button>
        <button
          onClick={() => setColor("green")}
          className="outline-none px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white shadow-xl text-sm sm:text-base"
          style={{ backgroundColor: "green" }}
        >
          Green
        </button>
        <button
          onClick={() => setColor("cyan")}
          className="outline-none px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white shadow-xl text-sm sm:text-base"
          style={{ backgroundColor: "cyan" }}
        >
          Cyan
        </button>
        <button
          onClick={() => setColor("brown")}
          className="outline-none px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white shadow-xl text-sm sm:text-base"
          style={{ backgroundColor: "brown" }}
        >
          Brown
        </button>
      </div>
    </div>
  );
}

export default App;
