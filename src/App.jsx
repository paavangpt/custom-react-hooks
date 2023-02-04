import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import useUpdateLog from "./hooks/useUpdateLog";
import useTimeout from "./hooks/useTimeout";
import useDebounce from "./hooks/useDebounce";

function App() {
    const [val, setVal] = useLocalStorage("val", "");
    useUpdateLog(val);

    const { clear, reset } = useTimeout(() => {
        setVal("");
        console.log("Timeout Func!");
    }, 2000);

    useDebounce(
        () => {
            alert("Val is : " + val);
        },
        2000,
        [val]
    );

    return (
        <div className="App">
            <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
            <button onClick={clear}>Clear</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default App;
