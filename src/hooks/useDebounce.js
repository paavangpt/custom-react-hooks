import { useEffect } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(callback, delay, dependencies) {
    const { clear, reset } = useTimeout(callback, delay, true);
    useEffect(reset, [...dependencies]);
    useEffect(clear, []);
}
