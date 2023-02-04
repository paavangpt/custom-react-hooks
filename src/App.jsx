import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import useUpdateLog from "./hooks/useUpdateLog";
import useTimeout from "./hooks/useTimeout";
import useDebounce from "./hooks/useDebounce";
import { useAsync } from "./hooks/useAsync";
import useMyCallback from "./hooks/playaround";

function App() {
    const [val, setVal] = useLocalStorage("val", "");
    const [type, setType] = useState("");
    const [state, setState] = useState(false);
    const [valReflect, setValReflect] = useState("");
    const [something, setSomething] = useState("");

    const { data, error, isLoading } = useAsync(() => {
        return fetch("https://jsonplaceholder.typicode.com/" + type).then(
            (res) => res.json()
        );
    }, [type]);

    useUpdateLog(val);

    const { clear, reset } = useTimeout(() => {
        setVal("");
        console.log("Timeout Func!");
    }, 2000);

    const debounceHandler = () => {
        console.log("Debounce call");
        setValReflect(val);
    };

    useDebounce(debounceHandler, 500, [val]);

    return (
        <div className="App">
            <input
                type="text"
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                    setSomething(e.target.value);
                }}
            />
            <p>{valReflect}</p>
            <button onClick={clear}>Clear</button>
            <button onClick={reset}>Reset</button>
            <br />
            <button onClick={() => setType("users")}>Users</button>
            <button onClick={() => setType("posts")}>Posts</button>

            {isLoading && <p>Loading...</p>}
            {error && <p>Some error occured</p>}
            {data &&
                data.map((item) => {
                    return (
                        <div key={item.id}>
                            {JSON.stringify(item)}
                            <hr />
                        </div>
                    );
                })}

            <br />
            <br />
            <button onClick={() => setState((state) => !state)}>Toggle</button>
        </div>
    );
}

export default App;
