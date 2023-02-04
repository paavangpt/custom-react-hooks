import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback, timeout) {

    const callbackRef = useRef(callback);
    const timeoutRef = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    const reset = useCallback(() => {
        clear();
        timeoutRef.current = setTimeout(callback, timeout);
    }, []);

    if (callbackRef.current) clear();
    timeoutRef.current = setTimeout(callback, timeout);

    return { clear, reset };
}
