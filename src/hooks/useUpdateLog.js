import { useEffect } from "react";

export default function useUpdateLog(value) {
    useEffect(() => {
        console.log(value);
    }, [value]);
}