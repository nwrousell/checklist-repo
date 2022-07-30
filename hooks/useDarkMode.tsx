import { useEffect, useState } from "react";

export function useDarkMode() {
    const [initialLoad, setInitialLoad] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let preference = JSON.parse(localStorage.getItem('darkMode'));
        if (preference !== null){
            setDarkMode(preference);
        }else{
            // No setting saved yet -> check system preference
            window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                const colorScheme = event.matches ? "dark" : "light";
                console.log(colorScheme); // "dark" or "light"
                if(colorScheme == 'dark') setDarkMode(true)
                else setDarkMode(false)
            });
        }
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            setInitialLoad(true);
            return;
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return [darkMode, initialLoad, setDarkMode] as const
}
