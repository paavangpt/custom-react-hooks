import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(callback, dependencies = []) {
    const initialRef = useRef(true);
    
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const callbackMemoized = useCallback(() => {
        setIsLoading(true);
        callback()
            .then(setData)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [...dependencies]);

    useEffect(() => {
        if (initialRef.current) {
            initialRef.current = false;
            return;
        }
        callbackMemoized();
    }, [callbackMemoized]);

    return { isLoading, error, data };
}
