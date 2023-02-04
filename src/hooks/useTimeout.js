import { useCallback, useRef } from "react";

export default function useTimeout(callback, timeout, resetOnRender = false) {
    const callbackRef = useRef();
    const timeoutRef = useRef();

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    const reset = useCallback(() => {
        clear();
        timeoutRef.current = setTimeout(callback, timeout);
    }, []);

    if (!resetOnRender && callbackRef.current) return { clear, reset };

    callbackRef.current = callback;
    timeoutRef.current = setTimeout(callback, timeout);

    return { clear, reset };
}
