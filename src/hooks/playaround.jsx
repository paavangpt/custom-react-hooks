import { useEffect, useRef } from "react";

export default function useMyCallback(callback, delay) {

    const callbackRef = useRef(callback);

    useEffect(() => {
        console.log("Callback Changed!");
    }, [callbackRef.current]);

    return { msg: "done" };
}