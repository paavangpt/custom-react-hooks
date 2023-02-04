import { useEffect, useState } from "react";

function getValueFromLocalStorage(key, initState) {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) return value;

    if (initState instanceof Function) return initState();
    return initState;
}

export default function useLocalStorage(key, initState) {
    const [value, setValue] = useState(() => getValueFromLocalStorage(key, initState));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue];
}
