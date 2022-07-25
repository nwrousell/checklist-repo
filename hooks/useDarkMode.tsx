import { useEffect, useState } from "react";

export function useDarkMode() {
    const [initialLoad, setInitialLoad] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let preference = JSON.parse(localStorage.getItem('darkMode'));
        if (preference !== null)
            setDarkMode(preference);
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            setInitialLoad(true);
            return;
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return [darkMode, setDarkMode] as const
}
